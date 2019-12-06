var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 正则验证方法类
     *
     * @version 0.0.4
     * @platform egret3.0.2
     */
    var RegUtils = (function () {
        function RegUtils() {
        }
        /**
         * 检查输入手机号码是否正确
         *
         * @param strMobile 手机号码字符串
         * @return 如果通过验证返回true,否则返回false
         *
         * @version 0.0.4
         * @platform egret3.0.2
         */
        RegUtils.checkMobile = function (strMobile) {
            var regu = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
            if (regu.test(strMobile)) {
                return true;
            }
            else {
                return false;
            }
        };
        return RegUtils;
    }());
    wy.RegUtils = RegUtils;
    __reflect(RegUtils.prototype, "wy.RegUtils");
})(wy || (wy = {}));
//# sourceMappingURL=RegUtils.js.map