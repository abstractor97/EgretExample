module wy {
	/**
	 * 按钮效果触发类：当在舞台上被点击的对象的名称是btn时，会触发此缩放效果(会自动将锚点居中哦)
	 * 
	 * @example
	 * 如下设置即可，任意显示对象都可以
	 * <pre>
	 *   var btn:egret.Shape = new egret.Shape();
	 *   btn.name = wy.StageBtnUtils.TYPE_BUTTON;
	 * </pre>
	 * 
	 * @version 0.0.4
	 * @platform egret3.0.2
	 */
	export class StageBtnUtils {

		public static TYPE_BUTTON:string = 'btn';

		private static _showTouchEffects: boolean = false;
		public static get showTouchEffects(): boolean {
			return this._showTouchEffects;
		}
		public static set showTouchEffects(value: boolean) {
			this._showTouchEffects = value;
			if (value) {
				wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			} else {
				wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			}
		}

		private static _showBtnEffects: boolean = true;
		public static get showBtnEffects(): boolean {
			return this._showBtnEffects;
		}
		public static set showBtnEffects(value: boolean) {
			this._showBtnEffects = value;

			if (value) {
				wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
				wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
				wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			} else {
				wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
				wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
				wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			}
		}


		/**
		 * 初始化
		 */
		public static init(): void {
			this.showBtnEffects = true;
			this.showTouchEffects = false;
		}

		private static onTouchTap(e: egret.TouchEvent): void {
			TouchEffects.do(e.stageX, e.stageY);
		}

		private static onTouchBegin(e: egret.TouchEvent): void {
			if (e.target.name == 'btn') {
				wy.Tools.center(e.target);
				e.target.scaleX = e.target.scaleY = 0.95;
			}
		}
		private static onTouchRelease(e: egret.TouchEvent): void {
			if (e.target.name == 'btn') {
				e.target.scaleX = e.target.scaleY = 1;
			}
			if(this._showTouchEffects)TouchEffects.do(e.stageX, e.stageY);
		}
		private static onTouchEnd(e: egret.TouchEvent): void {
			if (e.target.name == 'btn') {
				e.target.scaleX = e.target.scaleY = 1;
			}
		}
	}
}