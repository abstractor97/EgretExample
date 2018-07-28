var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Base64
 * @author chenkai
 * @since 2017/4/18
 */
var Base64 = (function () {
    function Base64() {
    }
    /**
     * 编码
     */
    Base64.encode = function (data) {
        return window["Base64"].encode(data);
    };
    /**
     * 解码
     */
    Base64.decode = function (data) {
        return window["Base64"].decode(data);
    };
    return Base64;
}());
__reflect(Base64.prototype, "Base64");
//# sourceMappingURL=Base64.js.map