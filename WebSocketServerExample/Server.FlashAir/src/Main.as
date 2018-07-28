package
{
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.text.TextField;
	import net.WebSocket;
	
	
	//------------------测试代码功能如下----------------
	//1.  创建服务端，等待客户端连接
	//2.  握手并连接成功后，服务端开始等待接收数据
	//3.  服务端接收客户端发送的json数据，然后原样发送回去
	
	[SWF(width=500,height=500,backgroundColor=0xffffff,frameRate=60)]
	public class Main extends Sprite
	{
		//打印消息文本
		private var logText:TextField = new TextField();
		//websocket服务端
		private var webSocket:WebSocket = new WebSocket();
		
		public function Main()
		{
			createTextField();
			webSocket.setLogText(logText);
			webSocket.createServerSocket("127.0.0.1", 8900);

		}
		
		private function createTextField():void{
			logText.border = true;
			logText.width = 500;
			logText.height = 500;
			addChild(logText);
		}

	}
}