module wy {
	/**
     * 页面从左方出去 切换效果类
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
     */
	export class PageLeftOut implements IPageSwitch {
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
				//不处理 此处toPage应该是没有的
			}

			if (fromPage) {
				var tx = -fromPage.width + fromPage.anchorOffsetY;

				this.doAnim(fromPage, tx, callBack, thisObj);
			}
		}
		/**
		 * 执行动画
		 * @private
		 *
		 * @param obj
		 * @param tx
		 * @param callBack?
		 * @param thisObj?
		 * 
		 * @version 0.0.1
		 * @platform egret3.0.2
		 */
		private doAnim(obj, tx, callBack?, thisObj?): void {
			wy.Tools.stop(obj);
			var tw = egret.Tween.get(obj);
			if(wy.PageSwitch.easeOut) {
				tw.to({ x: tx }, wy.PageSwitch.durationOut,wy.PageSwitch.easeOut).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			} else {
				tw.to({ x: tx }, wy.PageSwitch.durationOut).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			}
		}
	}
}