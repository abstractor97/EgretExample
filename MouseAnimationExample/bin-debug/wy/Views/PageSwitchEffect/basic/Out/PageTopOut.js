var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 页面从上方出去 切换效果类
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var PageTopOut = (function () {
        function PageTopOut() {
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
        PageTopOut.prototype.switching = function (toPage, fromPage, callBack, thisObj, params) {
            if (toPage) {
                //目标坐标
                var ty = -toPage.height + toPage.anchorOffsetY;
                this.doAnim(toPage, ty);
            }
            if (fromPage) {
                var ty = -fromPage.height + fromPage.anchorOffsetY;
                this.doAnim(fromPage, ty, callBack, thisObj);
            }
        };
        /**
         * 执行动画
         * @private
         *
         * @param obj
         * @param tx
         * @param callBack?
         * @param thisObj?
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        PageTopOut.prototype.doAnim = function (obj, ty, callBack, thisObj) {
            wy.Tools.stop(obj);
            var tw = egret.Tween.get(obj);
            if (wy.PageSwitch.easeOut) {
                tw.to({ y: ty }, wy.PageSwitch.durationOut, wy.PageSwitch.easeOut).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
            else {
                tw.to({ y: ty }, wy.PageSwitch.durationOut).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
        };
        return PageTopOut;
    }());
    wy.PageTopOut = PageTopOut;
    __reflect(PageTopOut.prototype, "wy.PageTopOut", ["wy.IPageSwitch"]);
})(wy || (wy = {}));
//# sourceMappingURL=PageTopOut.js.map