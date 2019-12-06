var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     *页面切换 默认参数配置类
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var PageSwitch = (function () {
        function PageSwitch() {
        }
        return PageSwitch;
    }());
    /**
     * 默认切入缓动持续时间
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PageSwitch.durationIn = 300;
    /**
     * 默认切入缓动方程
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PageSwitch.easeIn = null;
    /**
     * 默认切出缓动持续时间
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PageSwitch.durationOut = 300;
    /**
     * 默认切出缓动方程
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PageSwitch.easeOut = null;
    wy.PageSwitch = PageSwitch;
    __reflect(PageSwitch.prototype, "wy.PageSwitch");
})(wy || (wy = {}));
//# sourceMappingURL=PageSwitch.js.map