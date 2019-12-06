var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     *freshNotifyManager 需要用到的string
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var FreshType = (function () {
        function FreshType() {
        }
        return FreshType;
    }());
    /**
     *消除事件
     */
    FreshType.REMOVE = 'remove_items';
    /**
     * 消除完毕
     */
    FreshType.REMOVE_OVER = 'remove_over';
    wy.FreshType = FreshType;
    __reflect(FreshType.prototype, "wy.FreshType");
})(wy || (wy = {}));
//# sourceMappingURL=FreshType.js.map