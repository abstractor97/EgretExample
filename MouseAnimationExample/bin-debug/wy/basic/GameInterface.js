var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     *
     * 游戏通用接口类
     *
     * 主要将游戏分成4层，然后初始化wy框架
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var GameInterface = (function () {
        function GameInterface() {
        }
        /**
         * wy框架初始化
         * @version 0.0.1
         * @platform egret3.0.2
         */
        GameInterface.init = function () {
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
            wy.BaseViewManager.init();
            wy.Data.init();
            wy.StageBtnUtils.init();
            wy.Slider.init();
            wy.InputUtils.init();
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                RES.registerVersionController(new wy.Wyh5VersionController());
            }
        };
        return GameInterface;
    }());
    /**
     *主舞台
     * @version 0.0.1
     * @platform egret3.0.2
     */
    GameInterface.stage = null;
    /**
     * 弹出层容器
     * @version 0.0.1
     * @platform egret3.0.2
     */
    GameInterface.PopUpContainer = null;
    /**
     * 消息层容器
     * @version 0.0.1
     * @platform egret3.0.2
     */
    GameInterface.MsgContainer = null;
    /**
     * 界面层容器
     * @version 0.0.1
     * @platform egret3.0.2
     */
    GameInterface.viewContainer = null;
    /**
     *场景层容器
     * @version 0.0.1
     * @platform egret3.0.2
     */
    GameInterface.sceneContainer = null;
    wy.GameInterface = GameInterface;
    __reflect(GameInterface.prototype, "wy.GameInterface");
    /**
     *	wy框架初始化入口
     * @example 在项目最开始的地方调用即可
     * <pre>
     *     wy.init();
     * </pre>
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function init() {
        GameInterface.init();
    }
    wy.init = init;
})(wy || (wy = {}));
//# sourceMappingURL=GameInterface.js.map