module wy {
    /**
     *通用工具类
	 *
	 * @version 0.0.1
	 * @platform egret3.0.2
     */
	export class Tools {
		public constructor() {
		}

		/** 
		 * 停止sp对象的所有动画 
		 * 
		 * @param sp 要停止所有动画的对象
		 * 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static stop(sp: any) {
			egret.Tween.removeTweens(sp);
		}

		/**
		 *从父级显示列表移除，如果父级存在
		 * @param displayObject 要从父级显示列表移除的显示对象
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
		 */
		public static removeFromParent(displayObject: egret.DisplayObject) {
			if (displayObject && displayObject.parent) displayObject.parent.removeChild(displayObject);
		}

		/**
		 * 创建设置了mcName名称资源的动画对象
		 * @param mcName
		 * @param type mc动画图片资源类型 png或者 jpg
		 * @return mcName对应的MovieClip
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
		 */
		public static createMovieClip(mcName: string, type: string = 'png'): egret.MovieClip {
			var resJs = RES.getRes(mcName + "_json");
			var resPng = RES.getRes(mcName + "_" + type);
			var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(resJs, resPng);
			var movieclipData = mcFactory.generateMovieClipData(mcName);
			var mc1: egret.MovieClip = new egret.MovieClip(movieclipData);
			return mc1;
		}

		/**
    	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
		 * @param name 纹理的名称
		 * @return 纹理是name的对应资源的bitmap对象
		 *
		 * @version 0.0.1
		 * @platform egret3.0.2
     	 */
		public static createBitmapByName(name: string): egret.Bitmap {
			var result: egret.Bitmap = new egret.Bitmap();
			var texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

		/**
     	 * 获取bfont对应的bitmaptext
		 *
		 * @param bfont 资源名
		 * @return bfont对应的BitmapText
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
     	 */
		public static createBitmapText(bfont: string): egret.BitmapText {
			var font = RES.getRes(bfont);
			var btxt = new egret.BitmapText;
			btxt.font = font;
			return btxt;
		}

		/**
		 * 创建粒子
		 * 
		 * @param particleName 粒子效果名
		 * @param type 粒子图片资源类型 png或者jpg
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 对应的粒子效果
		 */
		public static createParticle(particleName: string, type: string = 'png'): particle.GravityParticleSystem {
			var texture = RES.getRes(particleName + "_" + type);
			var config = RES.getRes(particleName + "_json");
			var sys: particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config);
			return sys;
		}

		/**
		 * 中英文字符长度统计（一个中文算两个字符）
		 */
		public static cnEnWordCount(str: string): number {
			return str.replace(/[^\x00-\xff]/g, "**").length;
		}

		/**
		 * 等待time毫秒后执行
		 * 
		 * @param time
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
		 */
		public static sleep(time: number): any {
			return new Promise(resolve => {
				egret.setTimeout(() => {
					resolve();
				}, this, time);
			});
		}

		/**
		 *将obj的锚点设置在中心点
		 * @param obj 要设置的对象
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
		 */
		public static center(obj: egret.DisplayObject): void {
			obj.x -= obj.anchorOffsetX;
			obj.y -= obj.anchorOffsetY;
			obj.anchorOffsetX = obj.width >> 1;
			obj.anchorOffsetY = obj.height >> 1;
			obj.x += obj.anchorOffsetX;
			obj.y += obj.anchorOffsetY;
		}

		/**
		 * 将图片缩放至可被指定长宽的矩形容纳
		 * 
		 * @param img 要缩放的图片
    	 * @param w 矩形宽
     	 * @param h 矩形高
	 	 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		public static scaleImg(img: egret.Bitmap, w: number, h: number): void {
			var texture = img.texture;

			var bi = texture.textureWidth / texture.textureHeight;
			if (texture.textureWidth > texture.textureHeight) {
				if (texture.textureWidth > w) {
					img.width = w;
					img.height = img.width / bi;
				} else {
					img.width = texture.textureWidth;
					img.height = texture.textureHeight;
				}
				if (img.height > h) {
					img.height = h;
					img.width = bi * img.height;
				}
			} else {
				if (texture.textureHeight > h) {
					img.height = h;
					img.width = bi * img.height;
				} else {
					img.width = texture.textureWidth;
					img.height = texture.textureHeight;
				}
				if (img.width > w) {
					img.width = w;
					img.height = img.width / bi;
				}
			}
		}

		/**
		 * 上传照片 获取服务端地址
		 * 
		 * @example 
		 * <pre>
		 *  private compFunc(e) {	
		    	var object = JSON.parse(e.target.data);
				if (Number(object.error) == 0) {
					if (object.hasOwnProperty('data')) {
						if (object.data.hasOwnProperty('url')) {
							object.data.url;//服务器图片地址链接
						}
					}
				}
			}
		 * </pre>
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		public static upload_base64(base64: string, compFunc: Function, thisObj: any): void {
			var str: string = "image=" + encodeURIComponent(base64);

			var urlloader = new egret.URLLoader();
			var urlreq: egret.URLRequest = new egret.URLRequest();
			urlreq.url = "http://wag.i-h5.cn/common/upload.php?a=upload_base64";
			var urlvariable: egret.URLVariables = new egret.URLVariables(str);
			urlreq.method = egret.URLRequestMethod.POST;
			urlreq.data = urlvariable;
			urlloader.addEventListener(egret.Event.COMPLETE, compFunc, thisObj);
			urlloader.load(urlreq);
		}

		/**
		 *GET 方式请求接口
		 *
		 * @param url  接口地址
		 * @param callBack 回调方法
		 * @param thisObj thi
		 *
		 * @version 0.0.1
		 * @platform egret3.0.3
		 */
		public static GET_Request(url: string, callBack: any, thisObj: any): void {
			var urlloader = new egret.URLLoader();
			var urlreq: egret.URLRequest = new egret.URLRequest();
			urlreq.url = url;//MyUtils.game_url + "api.php?a=isfans";
			urlreq.method = egret.URLRequestMethod.GET;
			urlloader.addEventListener(egret.Event.COMPLETE, callBack, thisObj);
			urlloader.load(urlreq);
		}

		/**
		 *
		 * 创建Sprite按钮(即  非图片按钮)
		 * 按钮的toucheEnabled默认为true
		 *
		 * @param x 
		 * @param y
		 * @param w
		 * @param h
		 * @param alpha
		 *
		 * @version 0.0.1
		 * @platform egret3.0.3
		 */
		public static createSprBtn(x: number, y: number, w: number, h: number, color: number = 0xffffff, alpha: number = 0): egret.Sprite {
			var btn: egret.Sprite = new egret.Sprite();
			btn.graphics.beginFill(color, alpha);
			btn.graphics.drawRect(0, 0, w, h);
			btn.graphics.endFill();
			btn.x = x;
			btn.y = y;
			btn.width = w;
			btn.height = h;
			btn.touchEnabled = true;
			return btn;
		}

		/**
		 * 创建静态文本框
		 *
		 * @param size
		 * @param x
		 * @param y
		 * @param w
		 * @param h
		 * @param fontFamily  字体类型 默认：微软雅黑
		 * @param mutil 是否可以换行 默认：false
		 *
		 * @version 0.0.1
		 * @platform egret3.0.3
		 */
		public static createTextField(size: number, x: number, y: number, w: number, h: number, fontFamily: string = "微软雅黑", mutil: boolean = false): egret.TextField {
			var txt: egret.TextField = new egret.TextField();
			txt.x = x;
			txt.y = y;
			txt.textAlign = egret.HorizontalAlign.CENTER;
			txt.verticalAlign = egret.VerticalAlign.MIDDLE;
			txt.fontFamily = fontFamily;
			txt.width = w;
			txt.height = h;
			txt.textColor = 0x000000;
			txt.multiline = mutil;
			txt.size = size;
			return txt;
		}

		/**
		 *文本滑动
		 * @param text 需要滑动的文本框
		 * @param speed 滑动速度
		 *
		 *@version 0.0.1
		 *@platform egret3.0.3
		 */
		public static createScolltext(text: egret.TextField, speed: number = 30) {
			if (!text.multiline) {
				text.multiline = true;
			}
			var shape = new egret.Shape();
			shape.graphics.beginFill(0, 0);
			shape.graphics.drawRect(0, 0, text.width, text.height);
			shape.graphics.endFill();
			shape.x = text.x;
			shape.y = text.y;
			var s: number = -1
			var juli: number = 0
			shape.touchEnabled = true;
			text.parent.addChildAt(shape, text.parent.getChildIndex(text));
			shape.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
				if (s == -1) { s = e.stageY } else {
					if (e.stageY > s) {
						juli += e.stageY - s
						if (juli >= speed) {
							juli = juli - speed;
							text.scrollV -= 1
							if (text.scrollV == 0) {
								text.scrollV = 1
							}
						}
					} else {
						juli += s - e.stageY
						console.log(juli);

						if (juli >= speed) {
							juli = juli - speed;
							if (text.scrollV == text.maxScrollV) {
							} else (text.scrollV += 1)
						}
					}
					s = e.stageY;
				}
			}, text.parent);
			shape.parent.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => {
				s = -1;
			}, text.parent)
		}


		/**
		 * 微信支付请求
		 * @param value  需要拼接在链接后面的参数  如："value = value && id = id"
		 * @param url    支付请求的地址
		 * @param callBack  支付成功回调函数   支付失败则alert()；
		 * @param thisObj   this；
		 * @version 0.0.1
		 * @platform egret3.0.3
		 */
		public static WX_PayHttp(value: any, url: string, callBack: Function, thisObj: any) {
			wy.LoadingData.open();
			var params
			var json_data;
			params = value;
			egret.log("parame:" + params);
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			//设置为 POST 请求
			request.open(url, egret.HttpMethod.POST);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(params);
			request.addEventListener(egret.Event.COMPLETE, (event: any) => {
				wy.LoadingData.close();
				var request = <egret.HttpRequest>event.currentTarget;
				var tempData = JSON.parse(request.response);
				egret.log("pay begin! error=" + tempData.error);
				egret.log(request.response);
				if (tempData.error == 0) {
					json_data = tempData.data
					window['WeixinJSBridge'].invoke(
						'getBrandWCPayRequest',
						json_data,
						function (res) {
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								// wy.notify("payOk", false);
								callBack();
							} else {
								alert("充值失败");
							}
						}
					);
				}
			}, thisObj);
		}

		/**
		 * 点击按钮复制文本调用
		 *
		 * @param value  需要复制的内容
		 * @version 0.0.1
		 * @platform egret3.0.3
		 */
		public static copyText(value) {
			var input = document.createElement("input");
			input.value = value;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length),
				document.execCommand('Copy');
			document.body.removeChild(input);
			wy.Toast.setContent("复制成功");
		}


		/**
		 * 获取wag服务器微信头像地址,如果不是wag，则要和后台商议具体请求域名
		 * 
		 * @example 
		 * <pre>
		 * 
		 * </pre>
		 * @param headimgurl
		 * @param compFunc
		 * @param thisObj
		 */
		// public static getHeadImg(headimgurl: string, compFunc: Function, thisObj: any): void {
		// 	var str: string = "image_url=" + encodeURIComponent(headimgurl);

		// 	var req = new egret.HttpRequest();
		// 	req.responseType = egret.HttpResponseType.TEXT;
		// 	req.open("http://wag.i-h5.cn/common/download.php", egret.HttpMethod.POST);
		// 	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// 	req.send(str);
		// 	req.addEventListener(egret.Event.COMPLETE, compFunc, thisObj);
		// }
	}
}