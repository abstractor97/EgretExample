module wy {
	/**
     * 页面从左方进入 效果类
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
     */	
	export class PageLeftIn implements IPageSwitch {
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
				var tx = toPage.x + toPage.anchorOffsetX;

				toPage.x = -toPage.width + toPage.anchorOffsetX;

				this.doAnim(toPage, tx);
			}

			if (fromPage) {
				var tx = egret.MainContext.instance.stage.stageWidth + toPage.anchorOffsetX;

				this.doAnim(fromPage, tx, callBack, thisObj);
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
		 */
		private doAnim(obj, tx, callBack?, thisObj?): void {
			wy.Tools.stop(obj);
			var tw = egret.Tween.get(obj);
			if (wy.PageSwitch.easeIn) {
				tw.to({ x: tx }, wy.PageSwitch.durationIn, wy.PageSwitch.easeIn).call(function () { wy.Tools.stop(obj); if (callBack) { if (thisObj) { callBack.call(thisObj, obj); } else { callBack() } } });
			} else {
				tw.to({ x: tx }, wy.PageSwitch.durationIn).call(function () { wy.Tools.stop(obj); if (callBack) { if (thisObj) { callBack.call(thisObj, obj); } else { callBack() } } });
			}
		}
	}
}