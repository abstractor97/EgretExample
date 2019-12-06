var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    var PageScaleOut = (function () {
        function PageScaleOut() {
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
        PageScaleOut.prototype.switching = function (toPage, fromPage, callBack, thisObj, params) {
            if (toPage) {
            }
            if (fromPage) {
                // var ty = GameInterface.stage.stageHeight + fromPage.anchorOffsetY;
                this.doAnim(fromPage, callBack, thisObj);
            }
        };
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
        PageScaleOut.prototype.doAnim = function (obj, callBack, thisObj) {
            wy.Tools.stop(obj);
            var tw = egret.Tween.get(obj);
            if (wy.PageSwitch.easeOut) {
                tw.to({ scaleX: 0, scaleY: 0 }, wy.PageSwitch.durationOut, wy.PageSwitch.easeOut).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
            else {
                tw.to({ scaleX: 0, scaleY: 0 }, wy.PageSwitch.durationOut).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
        };
        return PageScaleOut;
    }());
    wy.PageScaleOut = PageScaleOut;
    __reflect(PageScaleOut.prototype, "wy.PageScaleOut", ["wy.IPageSwitch"]);
})(wy || (wy = {}));
//# sourceMappingURL=PageScaleOut.js.map