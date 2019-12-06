module wy {
	/**
	 *
	 * 游戏通用接口类
	 * 
	 * 主要将游戏分成4层，然后初始化wy框架
	 *  
	 * @version 0.0.1
	 * @platform egret3.0.2
	 */
	export class GameInterface {
		public constructor() {
		}
		/**
		 *主舞台
		 * @version 0.0.1
	  	 * @platform egret3.0.2
		 */
		public static stage: egret.Stage = null;
		/**
		 * 弹出层容器
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static PopUpContainer: egret.DisplayObjectContainer = null;
		/**
		 * 消息层容器
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static MsgContainer: egret.DisplayObjectContainer = null;
		/**
		 * 界面层容器
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static viewContainer: egret.DisplayObjectContainer = null;
		/**
		 *场景层容器
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static sceneContainer: egret.DisplayObjectContainer = null;
		/**
		 * wy框架初始化
		 * @version 0.0.1
	 	 * @platform egret3.0.2
		 */
		public static init(): void {
			this.stage = egret.MainContext.instance.stage;

			this.sceneContainer = new egret.DisplayObjectContainer;
			this.stage.addChild(this.sceneContainer);

			this.viewContainer = new egret.DisplayObjectContainer;
			this.stage.addChild(this.viewContainer);

			this.PopUpContainer = new egret.DisplayObjectContainer;
			this.stage.addChild(this.PopUpContainer);

			this.MsgContainer = new egret.DisplayObjectContainer;
			this.stage.addChild(this.MsgContainer);

			//
			BaseViewManager.init();

			Data.init();

			StageBtnUtils.init();

			Slider.init();

			InputUtils.init();

			if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
				RES.registerVersionController(new wy.Wyh5VersionController());
			}
		}
	}

    /**
     *	wy框架初始化入口
	 * @example 在项目最开始的地方调用即可
	 * <pre>
     *     wy.init();
     * </pre>
	 * @version 0.0.1
	 * @platform egret3.0.2
     */
	export function init(): void {
		GameInterface.init();
	}
}
