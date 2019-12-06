module wy {
    /**
     *页面基类
	 * @memberof wy
	 * @name public class BaseSprite
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
     */
	export class BaseSprite extends egret.DisplayObjectContainer {
		public constructor() {
			super();
		}

		protected _isHide: boolean = true;

		/**
		 * 显示页面
		 * 主要做添加操作： 例如 添加监听 显示对象添加到舞台
		 * @param data? 页面切换传过来的数据
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public show(data?): void {
			if (this._isHide) {
				this._isHide = false;
			}
		}

		/**
		 * 隐藏页面
		 * 主要做移除操作：例如 监听事件
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public hide(): void {
			if (!this._isHide) {
				this._isHide = true;
			}
		}

	}
}