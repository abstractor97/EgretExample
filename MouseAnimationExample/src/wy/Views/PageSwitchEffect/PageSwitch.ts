module wy {
    /**
     *页面切换 默认参数配置类
	 *
	 * @version 0.0.1
	 * @platform egret3.0.2
     */	
	export class PageSwitch {
		public constructor() {
		}

		/** 
		 * 默认切入缓动持续时间 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static durationIn:number = 300;
		/** 
		 * 默认切入缓动方程 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static easeIn:Function = null;
		/** 
		 * 默认切出缓动持续时间 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static durationOut:number = 300;
		/** 
		 * 默认切出缓动方程 
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static easeOut:Function = null;

	}
}