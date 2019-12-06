module wy {
	/**
	 * 显示在egret中的文本  
	 * 其实就是<p>标签显示在canvas之上，用于长按复制文本中的内容。比如优惠码等。
	 * @author sc
	 * @since  2017/4/24
	 * @example 
	 * <pre>
	 *      首先在index中定义一个<div>标签，id自定义
	 *		wy.StageMain.StageUtils.init(this.stage); 初始化 
	 *		var htmlText: wy.HTMLText = new wy.HTMLText();  新建p标签
	 *		htmlText.fontSize=20; 设置字体大小
	 *		htmlText.id="gameID" ; 设置自定义<div>标签的ID
	 *		htmlText.setValue("value");  设置p文本内容
	 *		htmlText.setPosition(0, 500, 640, 118); 设置p在canvas上位置和高宽
	 * </pre>
	 * @version 0.0.1
	 * @platform egret3.0.3 
	 */
	export class HTMLText {
		/**p标签 */
		private p: HTMLParagraphElement;
		/**字体大小*/
		private _fontSize: number = 20;
		private _id: string = "gameID";
		//...其他属性自行扩展
		public constructor() {
			//在egret的div下创建<p>
			var gameDiv = document.getElementById(this._id);
			this.p = document.createElement("p");
			gameDiv.appendChild(this.p);
			//设置<p>属性
			this.p.style.border = "0px";
			this.p.style.backgroundColor = "transparent";
			this.p.style.position = "absolute";
			this.p.style.fontSize = this.fontSize + "px";
			this.p.style.display = "none";
			this.p.style.color = "#036eb8";
			this.p.style.textAlign = "center";
		}
		/**
		 *设置字体大小
		 */
		public set fontSize(value: number) {
			this._fontSize = value;
			this.p.style.fontSize = this._fontSize + "px";
		}
		/**
		 *获得字体大小
		 */
		public get fontSize() {
			return this._fontSize;
		}

		/**
		 *设置index中的div id
		 */
		public set id(value: string) {
			this._id = value;
		}
		/**
		 *获得index中的div id
		 */
		public get id() {
			return this._id;
		}

		/**
		 * 设置文本内容
		 * @param value 内容
		 */
		public setValue(value: string): void {
			this.p.style.display = "inline";
			this.p.innerHTML = value;
		}
		/**
		 * 根据canvas中的位置和高宽，来设置<p>位置和高宽
		 * @param xPos egret中 x坐标
		 * @param yPos y坐标
		 * @param width 宽度
		 * @param height 高度
		 *
		 * @version 0.0.1
		 * @platform egret3.0.3 
		 */
		public setPosition(xPos: number, yPos: number, width: number, height: number) {
			//计算stage和浏览器的比例
			var wScale = document.body.clientWidth / wy.StageMain.StageUtils.stageWidth;
			var hScale = document.body.clientHeight / wy.StageMain.StageUtils.stageHeight;
			//根据比例设置<p>的位置和高宽
			this.p.style.left = xPos * wScale + "px";
			this.p.style.top = yPos * hScale - this.fontSize + "px";
			this.p.style.width = width * wScale + "px";
			this.p.style.height = height * hScale + "px";
			this.p.style.display = "inline";
		}
		/**显示 */
		public show() {
			this.p && (this.p.style.display = "inline");
		}
		/**隐藏*/
		public hide() {
			this.p && (this.p.style.display = "none");
		}
	}
} 