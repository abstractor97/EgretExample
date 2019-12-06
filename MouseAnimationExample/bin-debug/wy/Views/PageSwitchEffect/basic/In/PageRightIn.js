var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 页面从右方进入 效果类
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var PageRightIn = (function () {
        function PageRightIn() {
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
        PageRightIn.prototype.switching = function (toPage, fromPage, callBack, thisObj, params) {
            if (toPage) {
                //目标坐标
                var tx = toPage.x + toPage.anchorOffsetX;
                toPage.x = egret.MainContext.instance.stage.stageWidth + toPage.anchorOffsetX;
                this.doAnim(toPage, tx);
            }
            if (fromPage) {
                var tx = -fromPage.width + fromPage.anchorOffsetX;
                this.doAnim(fromPage, tx, callBack, thisObj);
            }
        };
        /**
         * 执行动画
         * @private
         *
         * @param obj
         * @param a
         * @param callBack?
         * @param thisObj?
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        PageRightIn.prototype.doAnim = function (obj, tx, callBack, thisObj) {
            wy.Tools.stop(obj);
            var tw = egret.Tween.get(obj);
            if (wy.PageSwitch.easeIn) {
                tw.to({ x: tx }, wy.PageSwitch.durationIn, wy.PageSwitch.easeIn).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
            else {
                tw.to({ x: tx }, wy.PageSwitch.durationIn).call(function () { wy.Tools.stop(obj); if (callBack) {
                    if (thisObj) {
                        callBack.call(thisObj, obj);
                    }
                    else {
                        callBack();
                    }
                } });
            }
        };
        return PageRightIn;
    }());
    wy.PageRightIn = PageRightIn;
    __reflect(PageRightIn.prototype, "wy.PageRightIn", ["wy.IPageSwitch"]);
})(wy || (wy = {}));
//# sourceMappingURL=PageRightIn.js.map