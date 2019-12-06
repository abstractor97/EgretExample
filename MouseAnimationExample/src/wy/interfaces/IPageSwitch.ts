module wy {
    /**
     * 页面切换效果接口类
	 * 
	 * @version 0.0.1
	 * @platform egret3.0.2
     */
	export interface IPageSwitch {
		/**
		 *切换页面
		 * @param toPage 要切换过去的页面
		 * @param fromPage? 当前页面
		 * @param callBack? 切换完成回调
		 * @param thisObj? 回调this
		 * @param params? 页面切换可选参数
		 *
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		switching(toPage: egret.DisplayObject, fromPage?: egret.DisplayObject, callBack?: Function, thisObj?, params?: Object): void
	}
}