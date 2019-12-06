module wy {
	export class PageScaleIn implements IPageSwitch {
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
				wy.Tools.center(toPage);
				toPage.scaleX = toPage.scaleY = 0.5;

				// var ty = toPage.y + toPage.anchorOffsetY;
				// toPage.y = -toPage.height + toPage.anchorOffsetY;

				this.doAnim(toPage);
			}

			if (fromPage) {
				// var ty = GameInterface.stage.stageHeight + fromPage.anchorOffsetY;

				this.doAnim(fromPage, callBack, thisObj);

			}
		}

		/**
		 * 执行动画
		 * @private
		 * 
		 * @param obj
		 * @param ty
		 * @param callBack?
		 * @param thisObj?
		 * 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		private doAnim(obj,  callBack?, thisObj?): void {
			wy.Tools.stop(obj);
			var tw = egret.Tween.get(obj);
			if(wy.PageSwitch.easeIn) {
				tw.to({ scaleX: 1, scaleY: 1 }, wy.PageSwitch.durationIn,wy.PageSwitch.easeIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			} else {
				tw.to({ scaleX: 1, scaleY: 1 }, wy.PageSwitch.durationIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			}
		}
	}
}