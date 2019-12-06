var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     *页面切换效果索引string
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var PopType = (function () {
        // /** 放大消失 **/
        // public static DOWNOUT = "downout";
        function PopType() {
        }
        return PopType;
    }());
    /**
     * 左边飞入
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.LEFTIN = "wy.PageLeftIn";
    /**
     * 右边飞入
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.RIGHTIN = "wy.PageRightIn";
    /**
     * 从上飞入
     * @version 0.0.1
     * @platform egret3.0.2
     **/
    PopType.TOPIN = "wy.PageTopIn";
    /**
     * 从下飞入
     * @version 0.0.1
     * @platform egret3.0.2
     **/
    PopType.BOTTOMIN = "wy.PageBottomIn";
    /**
     * 淡入
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.ALPHAIN = "wy.PageAlphaIn";
    /** 弹出来 **/
    PopType.EJECTIN = "wy.PageScaleIn";
    // /** 砸下去 **/
    // public static DOWNIN = "downin";
    /**
     * 左边飞出
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.LEFTOUT = "wy.PageLeftOut";
    /**
     * 右边飞出
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.RIGHTOUT = "wy.PageRightOut";
    /**
     * 从上飞出
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.TOPOUT = "wy.PageTopOut";
    /**
     * 从下飞出
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.BOTTOMOUT = "wy.PageBottomOut";
    /**
     * 淡出
     * @version 0.0.1
     * @platform egret3.0.2
     */
    PopType.ALPHAOUT = "wy.PageAlphaOut";
    /** 缩回去 **/
    PopType.EJECTOUT = "wy.PageScaleOut";
    wy.PopType = PopType;
    __reflect(PopType.prototype, "wy.PopType");
})(wy || (wy = {}));
//# sourceMappingURL=PopType.js.map