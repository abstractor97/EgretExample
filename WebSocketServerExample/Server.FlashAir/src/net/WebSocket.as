package net
{
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.ServerSocket;
	import flash.net.Socket;
	import flash.text.TextField;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.Endian;
	
	import json.JSON;
	
	
	public class WebSocket
	{
		private var serverSocket:ServerSocket = new ServerSocket();
		private var txt:TextField;
		private var clientDict:Dictionary = new Dictionary();
		private var bHandShake:Boolean = false;
		
		public function WebSocket()
		{
			
		}
		
		//创建服务端
		public function createServerSocket(IP:String, port:int):void
		{ 
			serverSocket = new ServerSocket();
			serverSocket.bind(port,IP);
			serverSocket.addEventListener(ServerSocketConnectEvent.CONNECT, onConnect );
			serverSocket.addEventListener(IOErrorEvent.IO_ERROR, onError);
			serverSocket.listen();
			log(" wait connect...");
		}
		
		//连接成功
		private function onConnect( event:ServerSocketConnectEvent ):void
		{
			if(event.socket.remotePort!=0)
			{
				var clientSocket:Socket=registerClient(event.socket).socket;
				clientSocket.addEventListener( ProgressEvent.SOCKET_DATA, onSocketData );
				clientSocket.addEventListener(Event.CLOSE,onSocketClose);
				log("new client join ...");
			}
		}
		
		//连接错误
		private function onError(e:IOErrorEvent):void{
			log("connect error..." + e.toString());
		}
		
		//连接关闭
		protected function onSocketClose(event:Event):void
		{
			var clientSocket:Socket=event.currentTarget as Socket;
			clientSocket.removeEventListener( ProgressEvent.SOCKET_DATA, onSocketData);
			clientSocket.removeEventListener(Event.CLOSE,onSocketClose);
			log("socket close...");
		}
		
		//接收数据
		protected function onSocketData(e:ProgressEvent):void{
			var socket:Socket=e.target as Socket;
			var clientEntry:ClientEntry=getClientEntryBySocket(socket);
			if(clientEntry.handshakeDone){
				var msg:String = readMessage(socket);

				log("rev:" + msg);
				try{
					var json:Object = json.JSON.decode(msg);
				}catch(e:Event){
					log("rev json is 无效");
					return;
				}
				sendMessage(socket,msg);
			}else{
				log("开始握手");
				doHandShake(socket, clientEntry);
				bHandShake = true;
			}
		}
		
		//读取数据
		private function readMessage(clientSocket:Socket):String
		{
			var buffer:ByteArray = new ByteArray();
			var outBuffer:ByteArray=new ByteArray();
			var mask:ByteArray=new ByteArray();
			var typeByte:int=clientSocket.readByte();
			
			var byteTwo:int=clientSocket.readByte() & 127;
			
			var sizeArray:ByteArray=new ByteArray();
			
			if(byteTwo==126)
			{
				clientSocket.readBytes(sizeArray,0,2);
			}else if(byteTwo==127)
			{
				clientSocket.readBytes(sizeArray,0,8);
			}
			clientSocket.readBytes(mask,0,4);
			
			clientSocket.readBytes(buffer,0,clientSocket.bytesAvailable);
			buffer.position=0;
			var len:uint=buffer.bytesAvailable;
			for(var j:uint=0;j<len;j++)
			{
				outBuffer.writeByte(applyMask(mask,buffer.readByte(),j));
			}
			outBuffer.position=0;
			return outBuffer.readUTFBytes(outBuffer.bytesAvailable);
		}
		
		private function applyMask(mask:ByteArray,byte:int,index:uint):int
		{
			mask.position=index % 4;
			var maskByte:int=mask.readByte();
			
			return byte ^ maskByte;
		}
		
		//握手
		private function doHandShake(clientSocket:Socket, clientEntry:ClientEntry):void
		{
			var socketBytes:ByteArray = new ByteArray();
			clientSocket.readBytes(socketBytes,0,clientSocket.bytesAvailable);
			var message:String = socketBytes.readUTFBytes(socketBytes.bytesAvailable);
			clientEntry.handshakeDone=true;
			var i:uint = 0;
			if(message.indexOf("GET ") == 0)
			{
				var messageLines:Array = message.split("\n");
				var fields:Object = {};
				var requestedURL:String = "";
				for(i = 0; i < messageLines.length; i++)
				{
					var line:String = messageLines[i];
					if(i == 0)
					{
						var getSplit:Array = line.split(" ");
						if(getSplit.length > 1)
						{
							requestedURL = getSplit[1];
						}
					}
					else
					{
						var index:int = line.indexOf(":");
						if(index > -1)
						{
							var key:String = line.substr(0, index);
							fields[key] = line.substr(index + 1).replace( /^([\s|\t|\n]+)?(.*)([\s|\t|\n]+)?$/gm, "$2" );
						}
					}
				}
				
				if(fields["Sec-WebSocket-Key"] != null)
				{
					
					var joinedKey:String=fields["Sec-WebSocket-Key"]+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
					var base64hash:String = SHA1.hashToBase64(joinedKey);
					var response:String = "HTTP/1.1 101 Switching Protocols\r\n" +
						"Upgrade: webSocket\r\n" +
						"Connection: Upgrade\r\n" +
						"Sec-WebSocket-Accept: "+base64hash+"\r\n"+
						"Sec-WebSocket-Origin: " + fields["Origin"] + "\r\n" +
						"Sec-WebSocket-Location: ws://" + fields["Host"] + requestedURL + "\r\n" +
						"\r\n";
					var responseBytes:ByteArray = new ByteArray();
					responseBytes.writeUTFBytes(response);
					responseBytes.position = 0;
					clientSocket.writeBytes(responseBytes);
					clientSocket.flush();
					socketBytes.clear();
				}
			}
		}
		
		/**
		 * 发送消息
		 * @param clientSocket  接收消息的socket
		 * @param json 发送的数据
		 * @param  
		 */
		public function sendMessage(clientSocket:Socket, json:Object, continuation:Boolean=false):void
		{
			if( clientSocket != null && clientSocket.connected )
			{
				var msg:String =  json.JSON.encode(json);
				var rawData:ByteArray=new ByteArray()
				var indexStartRawData:uint;
				rawData.writeUTFBytes( msg );
				rawData.position=0;
				var bytesFormatted:Array=[];
				
				if(continuation)
				{
					bytesFormatted[0] = 128;
				}else{
					bytesFormatted[0] = 129; 
				}
				
				if (rawData.length <= 125)
				{
					bytesFormatted[1] = rawData.length;
				}else if(rawData.length >= 126 && rawData.length <= 65535){
					
					
					bytesFormatted[1] = 126
					bytesFormatted[2] = ( rawData.length >> 8 ) & 255
					bytesFormatted[3] = ( rawData.length) & 255
				}else{
					bytesFormatted[1] = 127
					bytesFormatted[2] = ( rawData.length >> 56 ) & 255
					bytesFormatted[3] = ( rawData.length >> 48 ) & 255
					bytesFormatted[4] = ( rawData.length >> 40 ) & 255
					bytesFormatted[5] = ( rawData.length >> 32 ) & 255
					bytesFormatted[6] = ( rawData.length >> 24 ) & 255
					bytesFormatted[7] = ( rawData.length >> 16 ) & 255
					bytesFormatted[8] = ( rawData.length >>  8 ) & 255
					bytesFormatted[9] = ( rawData.length       ) & 255
				}
				var dataOut:ByteArray=new ByteArray();
				
				for(var i:uint=0;i<bytesFormatted.length;i++)
				{
					dataOut.writeByte(bytesFormatted[i]);
				}
				
				dataOut.writeBytes(rawData);
				dataOut.position=0;
				clientSocket.writeBytes(dataOut);
				clientSocket.flush(); 
				log("send:" + msg);
			}else{
				
			}
		}

		public function sendBinary(clientSocket:Socket, byteArray:ByteArray):void
		{
			var sendBytes:ByteArray = new ByteArray();
			
			var msgBytes:ByteArray = new ByteArray();
			msgBytes.writeBytes(byteArray);
			msgBytes.position = 0;
			
			sendBytes.writeByte(0x82);
			var len:int = msgBytes.bytesAvailable;
			
			if(len < 126)
			{
				sendBytes.writeByte(len);
			}
			else if(len > 125 && len <= 0x10000)
			{
				sendBytes.writeByte(0x7E);
				sendBytes.writeShort(len);
			}
			else if(len > 0x10000)
			{
				sendBytes.writeByte(0x7F);
				sendBytes.writeDouble(len);
			}
			sendBytes.writeBytes(msgBytes,0,msgBytes.bytesAvailable);
			sendBytes.position = 0;
			
			sendBytes.position = 0;
			
			clientSocket.writeBytes(sendBytes);
			clientSocket.flush();
		}
		
		
		
		//广播消息
		public function sendALL(json:Object):void
		{
			for(var key:* in clientDict)
			{
				if(key is String)
				{
					try{
						var clientSocket:Socket=(clientDict[key] as ClientEntry).socket;
						sendMessage(clientSocket,json);
					}
					catch ( error:Error )
					{
						log("send all error");
					}
				}
			}
		}
		
		//关闭服务端
		private function shutdown():void
		{
			closeAllClientSockets();
			if(serverSocket)
			{
				serverSocket.close();
			}
		}
		
		//关闭所有客户端Socket
		private function closeAllClientSockets():void
		{
			for each(var ce:ClientEntry in clientDict)
			{
				var clientSocket:Socket=ce.socket;
				
				if(clientSocket)
				{
					clientSocket.close();
				}
			}
		}
		
		//注册Socket
		private function registerClient(socket:Socket):ClientEntry
		{
			var key:String=getClientKeyBySocket(socket);
			var client:ClientEntry;
			if(clientDict[key])
			{
				client=clientDict[key];
			}else{
				client=new ClientEntry(key,socket);
				clientDict[getClientKeyBySocket(socket)]=client;
				clientDict[client.socket]=client;
			}
			return client;
		}
		
		//取消注册
		private function unregisterClient(clientSocket:Socket):String
		{
			var location:String;
			if(clientDict[clientSocket]){
				var ce:ClientEntry=clientDict[clientSocket] as ClientEntry;
				location=ce.key;
				ce.dispose();
				clientDict[clientSocket]=null;
				delete clientDict[clientSocket];
				clientDict[location]=null;
				delete clientDict[location];
			}
			return location;
		}
		
		//获取Socket实例
		private function getClientEntryBySocket(socket:Socket):ClientEntry
		{
			return clientDict[getClientKeyBySocket(socket)];
		}
		
		//获取socket的key，由IP和port组成
		public function getClientKeyBySocket(socket:Socket):String
		{
			return socket.remoteAddress+":"+socket.remotePort;
		}
		
		//打印消息
		public function log(msg:String):void{
			txt.appendText(msg + "\n");
			txt.scrollV = txt.maxScrollV;
		}
		
		//设置打印消息文本
		public function  setLogText(logTxt:TextField):void{
			txt = logTxt;
		}
	}
}