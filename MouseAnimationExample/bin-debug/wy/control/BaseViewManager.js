var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 页面管理器，如 切换页面 切换场景
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var BaseViewManager = (function () {
        function BaseViewManager() {
        }
        /**
         * 页面管理器初始化
         * @version 0.0.1
         * @platform egret3.0.2
         * */
        BaseViewManager.init = function () {
            this.getViewMustNew = true;
            this.panels = [];
            this.shape = new egret.Shape;
            this.shape.graphics.beginFill(0, 0.5);
            this.shape.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
            this.shape.graphics.endFill();
            this.shape.touchEnabled = true;
            this.viewshape = new egret.Shape;
            this.viewshape.graphics.beginFill(0, 0.5);
            this.viewshape.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
            this.viewshape.graphics.endFill();
            this.viewshape.touchEnabled = true;
        };
        /**
         * 获取指定类名的类：如果getViewMustNew为false，那么在panels里有就直接拿panels里的，没有就new，否则都是new出来
         * @version 0.0.1
         * @platform egret3.0.2
         * @return 类名对应的类实例
         * */
        BaseViewManager.getView = function (disClass) {
            var page;
            var className;
            if (!this.getViewMustNew) {
                if (typeof disClass == 'string') {
                    page = this.panels[disClass];
                }
                else {
                    className = egret.getQualifiedClassName(disClass);
                    page = this.panels[className];
                }
            }
            if (page == null || page == undefined) {
                if (typeof disClass == 'string') {
                    var clase = egret.getDefinitionByName(disClass);
                    page = new clase();
                    this.panels[disClass] = page;
                }
                else {
                    page = new disClass;
                    className = egret.getQualifiedClassName(disClass);
                    this.panels[className] = page;
                }
            }
            return page;
        };
        /** 在场景层切换一个场景：
         * @param disClass 要切换过去的场景
         * @param effect 切换的动效：PagePopType类选择
         * @param data 要传过去的数据
         * @param effectdata 缓动效果的可选参数数据
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.changeScene = function (disClass, effect, data, effectdata) {
            wy.Tween.switchPagePopType = effect;
            this.preScene = this.nowScene;
            var view = this.getView(disClass);
            view.show(data);
            wy.GameInterface.sceneContainer.addChild(view);
            this.nowScene = view;
            if (this.preScene == this.nowScene)
                this.preScene = null;
            if (this.preScene)
                this.preScene['hide']();
            if (effect) {
                this.play(this.nowScene, this.preScene, effect, effectdata);
            }
            else {
                if (this.preScene) {
                    wy.Tools.removeFromParent(this.preScene);
                }
            }
        };
        /** 隐藏当前场景层
         * @param effect 隐藏动效
         * @param effectdata? 缓动效果的可选参数数据
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.hideScene = function (effect, effectdata) {
            if (this.nowScene)
                this.nowScene['hide']();
            if (effect) {
                this.preScene = null;
                this.play(this.preScene, this.nowScene, effect, effectdata);
            }
            else {
                wy.Tools.removeFromParent(this.nowScene);
            }
        };
        /** 切换当前显示界面
         * @param disClass 要切换过去的界面类
         * @param effect 切换的动效：PagePopType类选择
         * @param data 要传过去的数据
         * @param effectdata? 缓动效果的可选参数数据
         * @param graybg 是否要显示灰色蒙层 true 显示 false 不显示
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.changeView = function (disClass, effect, data, effectdata, graybg) {
            if (graybg === void 0) { graybg = false; }
            wy.Tween.switchPagePopType = effect;
            this.preView = this.nowView;
            var view = this.getView(disClass);
            view.show(data);
            if (graybg)
                wy.GameInterface.viewContainer.addChild(this.viewshape);
            wy.GameInterface.viewContainer.addChild(view);
            this.nowView = view;
            if (this.preView == this.nowView)
                this.preView = null;
            if (this.preView)
                this.preView['hide']();
            if (effect) {
                this.play(this.nowView, this.preView, effect, effectdata);
            }
            else {
                if (this.preView) {
                    wy.Tools.removeFromParent(this.preView);
                }
            }
        };
        /** 切换当前显示的弹窗
         * @param disClass 要显示的弹窗类名
         * @param effect 切换的动效：PopType类选择
         * @param data 要传过去的数据
         * @param effectdata? 缓动效果的可选参数数据
         * @param graybg 是否要显示灰色蒙层 true 显示 false 不显示
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.openPopUpView = function (disClass, effect, data, effectdata, graybg) {
            if (graybg === void 0) { graybg = false; }
            wy.Tween.switchPagePopType = effect;
            this.prePopUpView = this.nowPopUpView;
            var view = this.getView(disClass);
            view.show(data);
            if (graybg)
                wy.GameInterface.PopUpContainer.addChild(this.shape);
            wy.GameInterface.PopUpContainer.addChild(view);
            this.nowPopUpView = view;
            if (this.prePopUpView == this.nowPopUpView)
                this.prePopUpView = null;
            if (this.prePopUpView)
                this.prePopUpView['hide']();
            if (effect) {
                this.play(this.nowPopUpView, this.prePopUpView, effect, effectdata);
            }
            else {
                if (this.prePopUpView) {
                    wy.Tools.removeFromParent(this.prePopUpView);
                }
            }
        };
        /** 隐藏当前界面层
         * @param 隐藏动效
         * @param effectdata? 缓动效果的可选参数数据
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.hideView = function (effect, effectdata) {
            wy.Tools.removeFromParent(this.viewshape);
            if (this.nowView)
                this.nowView['hide']();
            if (effect) {
                this.preView = null;
                this.play(this.preView, this.nowView, effect, effectdata);
            }
            else {
                wy.Tools.removeFromParent(this.nowView);
            }
        };
        /** 隐藏当前弹出层
         * @param 隐藏动效
         * @param effectdata? 缓动效果的可选参数数据
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.hidePopUpView = function (effect, effectdata) {
            wy.Tools.removeFromParent(this.shape);
            if (this.nowPopUpView)
                this.nowPopUpView['hide']();
            if (effect) {
                this.prePopUpView = null;
                this.play(this.prePopUpView, this.nowPopUpView, effect, effectdata);
            }
            else {
                wy.Tools.removeFromParent(this.nowPopUpView);
            }
        };
        /**
         * 执行切换效果
         *
         * @param nowView 要切换过去的页面
         * @param preView 当前页面
         * @param effect 切换效果
         * @param effectdata 切换效果的可选参数
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseViewManager.play = function (nowView, preView, effect, effectdata) {
            var clase = egret.getDefinitionByName(effect);
            var pageSwitch = new clase();
            if (pageSwitch) {
                pageSwitch.switching(nowView, preView, wy.Tools.removeFromParent, this, effectdata);
            }
        };
        return BaseViewManager;
    }());
    /**
     * 面板数组：所有打开过的面板类都存在这里
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.panels = null;
    /**
     * 场景层上次打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.preScene = null;
    /**
     * 场景层当前打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.nowScene = null;
    /**
     * 界面层上次打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.preView = null;
    /**
     * 界面层当前打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.nowView = null;
    /**
     * 弹出层上次打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.prePopUpView = null;
    /**
     * 弹出层当前打开的面板
     * @version 0.0.1
     * @platform egret3.0.2
     */
    BaseViewManager.nowPopUpView = null;
    /**
     * 弹出层灰色蒙版
     * @version 0.0.1
     * @platform egret3.0.2
     * */
    BaseViewManager.shape = null;
    /**
     * 界面层灰色蒙版
     * @version 0.0.1
     * @platform egret3.0.2
     * */
    BaseViewManager.viewshape = null;
    /**
     * 每次getView是否需要重新new：true 需要 false 不需要
     * @version 0.0.1
     * @platform egret3.0.2
     * */
    BaseViewManager.getViewMustNew = true;
    wy.BaseViewManager = BaseViewManager;
    __reflect(BaseViewManager.prototype, "wy.BaseViewManager");
    /** 在场景层切换一个场景：
     * @param disClass 要切换过去的场景
     * @param effect 切换的动效：PagePopType类选择
     * @param data 要传过去的数据
     * @param effectdata 缓动效果的可选参数数据
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function changeScene(disClass, effect, data, effectdata) {
        BaseViewManager.changeScene(disClass, effect, data, effectdata);
    }
    wy.changeScene = changeScene;
    /** 隐藏当前场景层
     * @param effect 隐藏动效
     * @param effectdata? 缓动效果的可选参数数据
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function hideScene(effect, effectdata) {
        BaseViewManager.hideScene(effect, effectdata);
    }
    wy.hideScene = hideScene;
    /** 切换当前显示界面
     * @param disClass 要切换过去的界面类
     * @param effect 切换的动效：PagePopType类选择
     * @param data 要传过去的数据
     * @param effectdata? 缓动效果的可选参数数据
     * @param graybg 是否要显示灰色蒙层 true 显示 false 不显示
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function changeView(disClass, effect, data, effectdata, graybg) {
        if (graybg === void 0) { graybg = false; }
        BaseViewManager.changeView(disClass, effect, data, effectdata, graybg);
    }
    wy.changeView = changeView;
    /** 隐藏当前界面层
     * @param 隐藏动效
     * @param effectdata? 缓动效果的可选参数数据
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function hideView(effect, effectdata) {
        BaseViewManager.hideView(effect, effectdata);
    }
    wy.hideView = hideView;
    /** 切换当前显示的弹窗
     * @param disClass 要显示的弹窗类名
     * @param effect 切换的动效：PopType类选择
     * @param data 要传过去的数据
     * @param effectdata? 缓动效果的可选参数数据
     * @param graybg 是否要显示灰色蒙层 true 显示 false 不显示
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function openPopUpView(disClass, effect, data, effectdata, graybg) {
        if (graybg === void 0) { graybg = false; }
        BaseViewManager.openPopUpView(disClass, effect, data, effectdata, graybg);
    }
    wy.openPopUpView = openPopUpView;
    /** 隐藏当前弹出层
     * @param 隐藏动效
     * @param effectdata? 缓动效果的可选参数数据
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function hidePopUpView(effect, effectdata) {
        BaseViewManager.hidePopUpView(effect, effectdata);
    }
    wy.hidePopUpView = hidePopUpView;
})(wy || (wy = {}));
//# sourceMappingURL=BaseViewManager.js.map