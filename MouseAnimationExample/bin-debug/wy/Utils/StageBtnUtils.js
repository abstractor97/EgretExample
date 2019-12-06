var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
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
    var StageBtnUtils = (function () {
        function StageBtnUtils() {
        }
        Object.defineProperty(StageBtnUtils, "showTouchEffects", {
            get: function () {
                return this._showTouchEffects;
            },
            set: function (value) {
                this._showTouchEffects = value;
                if (value) {
                    wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                }
                else {
                    wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageBtnUtils, "showBtnEffects", {
            get: function () {
                return this._showBtnEffects;
            },
            set: function (value) {
                this._showBtnEffects = value;
                if (value) {
                    wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
                    wy.GameInterface.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                }
                else {
                    wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
                    wy.GameInterface.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        StageBtnUtils.init = function () {
            this.showBtnEffects = true;
            this.showTouchEffects = false;
        };
        StageBtnUtils.onTouchTap = function (e) {
            wy.TouchEffects.do(e.stageX, e.stageY);
        };
        StageBtnUtils.onTouchBegin = function (e) {
            if (e.target.name == 'btn') {
                wy.Tools.center(e.target);
                e.target.scaleX = e.target.scaleY = 0.95;
            }
        };
        StageBtnUtils.onTouchRelease = function (e) {
            if (e.target.name == 'btn') {
                e.target.scaleX = e.target.scaleY = 1;
            }
            if (this._showTouchEffects)
                wy.TouchEffects.do(e.stageX, e.stageY);
        };
        StageBtnUtils.onTouchEnd = function (e) {
            if (e.target.name == 'btn') {
                e.target.scaleX = e.target.scaleY = 1;
            }
        };
        return StageBtnUtils;
    }());
    StageBtnUtils.TYPE_BUTTON = 'btn';
    StageBtnUtils._showTouchEffects = false;
    StageBtnUtils._showBtnEffects = true;
    wy.StageBtnUtils = StageBtnUtils;
    __reflect(StageBtnUtils.prototype, "wy.StageBtnUtils");
})(wy || (wy = {}));
//# sourceMappingURL=StageBtnUtils.js.map