module wy {
    /**
     * 头像图片显示类
	 * 可以设置显示圆形或者正方形
	 * 
	 * @example 
	 * <pre>
	 *     var img:wy.HeadImg = new wy.HeadImg();//构造函数可以传入半径，如果不是圆形，那传入的值则是正方形边长的一半
     *     img.source = 'http://wx.qlogo.cn/mmopen/JUvAvnJSpXADD7HxXhh8866bbibVAkabWP41MqsRZlUm1oePib2vVIhKbu4WWicGEPDKh4nbyGSuSjgMcJ756ANEHS023qPwmH5/132';
     *     img.x = wy.GameInterface.stage.stageWidth>>1;
     *     img.y = wy.GameInterface.stage.stageHeight>>1;
     *     this.addChild(img);
	 * </pre>
	 * 
	 * @version 0.0.3
	 * @platform egret3.0.3
	 * 
     */
	export class HeadImg extends egret.DisplayObjectContainer {
		/**
		 * 遮罩圆形
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		protected shpMask: egret.Shape;
		/**
		 * 头像图片
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		protected bmp: egret.Bitmap;

		/**
		 * 通用半径 默认50
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static RADIUS: number = 50;

		/**
		 * 图片加载方式
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		protected imgLoad: egret.ImageLoader;

		public constructor(radius?: number, isCircle: boolean = true) {
			super();
			var rad: number;
			if (radius) { rad = radius; }
			else { rad = HeadImg.RADIUS; }

			this.bmp = new egret.Bitmap();
			this.addChild(this.bmp);
			this.bmp.width = this.bmp.height = rad * 2;
			this.bmp.x = this.bmp.y = -rad;

			this.imgLoad = new egret.ImageLoader();
			this.imgLoad.crossOrigin = "anonymous";

			if (isCircle) {
				this.shpMask = new egret.Shape();
				this.shpMask.graphics.beginFill(0xffffff, 1);
				this.shpMask.graphics.drawCircle(0, 0, rad);
				this.shpMask.graphics.endFill();
				this.addChild(this.shpMask);
				this.bmp.mask = this.shpMask;
			}
		}

		/**
		 * 图片地址
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		protected _source: string;

		/**
		 * set 设置图片地址 并加载显示
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public set source(value: string) {
			this._source = value;
			// RES.getResByUrl(value, this.compFunc, this, RES.ResourceItem.TYPE_IMAGE);
			this.imgLoad.addEventListener(egret.Event.COMPLETE, this.compFunc, this);
			this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioError, this);
			this.imgLoad.load(value);
		}

		/**
		 * 获取图片地址
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public get source(): string {
			return this._source;
		}

		/**
		 * @private 
		 * 
		 * 图片加载完成
		 * 
		 * @param texture
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		private compFunc(e: egret.Event): void {
			if (this.bmp) {
				let texture = new egret.Texture();
				texture._setBitmapData(e.currentTarget.data);
				this.bmp.texture = texture;
			}
		}

		private ioError(e: egret.IOErrorEvent): void {
			console.warn("HeadImg source load fail");
		}

		/**
		 * 设置图片纹理
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public set texture(texure: egret.Texture) {
			if (this.bmp) {
				this.bmp.texture = texure;
			}
		}
		/**
		 * 获取图片纹理
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public get texture(): egret.Texture {
			if (this.bmp) {
				return this.bmp.texture;
			}
			return null;
		}
	}
}