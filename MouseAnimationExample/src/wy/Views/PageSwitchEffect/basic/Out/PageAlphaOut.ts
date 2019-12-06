module wy {
    /**
     * 页面切换 淡出效果类
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
     */	
	export class PageAlphaOut implements IPageSwitch {
		public constructor() {
		}

		/**
		 *页面切换
		 * @param toPage 要切换过去的类
		 * @param fromPage? 当前类
		 * @param callBack? 切换完成回调
		 * @param thisObj? 回调this
		 * @param params? 切换效果可选参数
		 * 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public switching(toPage: egret.DisplayObject, fromPage?: egret.DisplayObject, callBack?: Function, thisObj?, params?: Object): void {
			if (toPage) {
				//目标坐标
			}

			if (fromPage) {
				var a = 0;

				this.doAnim(fromPage, a, callBack, thisObj);
			}
		}

		/**
		 * 执行动画
		 * @private
		 * 
		 * @param obj
		 * @param a
		 * @param callBack?
		 * @param thisObj?
		 * 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		private doAnim(obj, a, callBack?, thisObj?): void {
			wy.Tools.stop(obj);
			var tw = egret.Tween.get(obj);
			if(wy.PageSwitch.easeIn) {
				tw.to({ alpha: a }, wy.PageSwitch.durationIn,wy.PageSwitch.easeIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			} else {
				tw.to({ alpha: a }, wy.PageSwitch.durationIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			}
		}
	}
}