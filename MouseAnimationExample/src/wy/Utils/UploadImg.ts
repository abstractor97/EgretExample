module wy {

    /**
     * 从相册选图 
	 * 
	 * @example 
	 * 非微信方式
	 * <pre>
	 *      wy.UploadImg.upload(this.compFunc,this);
	 * </pre>
	 * 微信选图
	 * <pre>
	 *      wy.UploadImg.upload(this.compFunc,this,1);
	 * </pre>
	 * 默认非微信方式
	 * 
	 * @version 0.0.3
	 * @platform egret3.0.3
     */
	export class UploadImg {
		public constructor() {
		}

		private static func: Function;
		private static thisObj: any;

		/**
		 * 加载图片
		 * @param compFunc 加载完成图片回调 
		 * @param thisObj 回调this
		 * @param type 加载方式 0是非微信选图 selectImage  1是微信选图 selectImageWX
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static upload(compFunc: Function, thisObj?: any, type: number = 0): void {
			this.func = compFunc;
			this.thisObj = thisObj;
			if (type == 0) {
				selectImage(this.selectHandler, this);
			} else {
				selectImageWX(this.selectHandler, this);
			}
		}

		/**
		 * @private
		 * 
		 * 获取到了选择的图片的地址 通过getResByUrl去获取图片纹理
		 *  
		 * @param thisRef 
		 * @param imgURL
		 * @param file
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		private static selectHandler(thisRef: any, imgURL: string, file: Blob): void {
			RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
		}

		/**
		 * @private
		 * 
		 * @param texture 选择的图片的纹理数据
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		private static compFunc(texture): void {
			if (this.thisObj) {
				if (this.func) {
					this.func.call(this.thisObj, texture);
				}
			} else {
				if (this.func) {
					this.func(texture);
				}
			}
		}
	}
}