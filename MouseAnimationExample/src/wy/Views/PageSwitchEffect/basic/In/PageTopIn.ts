module wy {
	/**
	 * 自顶入 切换效果类
	 * 目标页面从上方坠下，当前页面从下方移出
	 * 
	 * 可以传可选参数有
	 * ease 缓动方程
	 * duration 动画持续时间
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
	 */
	export class PageTopIn implements IPageSwitch {
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
				var ty = toPage.y + toPage.anchorOffsetY;
				toPage.y = -toPage.height + toPage.anchorOffsetY;

				this.doAnim(toPage, ty);
			}

			if (fromPage) {
				var ty = GameInterface.stage.stageHeight + fromPage.anchorOffsetY;

				this.doAnim(fromPage, ty, callBack, thisObj);
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
		private doAnim(obj, ty, callBack?, thisObj?): void {
			wy.Tools.stop(obj);
			var tw = egret.Tween.get(obj);
			if(wy.PageSwitch.easeIn) {
				tw.to({ y: ty }, wy.PageSwitch.durationIn,wy.PageSwitch.easeIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			} else {
				tw.to({ y: ty }, wy.PageSwitch.durationIn).call(function () { wy.Tools.stop(obj); if(callBack){if(thisObj){callBack.call(thisObj, obj);}else{callBack()}} });
			}
		}
	}
}