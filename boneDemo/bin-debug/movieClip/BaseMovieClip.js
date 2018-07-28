var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 影片剪辑基类
 * @author chenkai
 * @since 2017/10/16
 */
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    function BaseMovieClip() {
        return _super.call(this) || this;
    }
    /**
     * @param dataKey json配置文件
     * @param textureKey png纹理集
     * @param movieClipName 影片剪辑名
     */
    BaseMovieClip.prototype.config = function (dataKey, textureKey, movieClipName) {
        var data = RES.getRes(dataKey);
        var texture = RES.getRes(textureKey);
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcDataFactory.generateMovieClipData(movieClipName);
    };
    /**隐藏 */
    BaseMovieClip.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁 */
    BaseMovieClip.prototype.destoryMe = function () {
        this.stop();
        this.hide();
    };
    return BaseMovieClip;
}(egret.MovieClip));
__reflect(BaseMovieClip.prototype, "BaseMovieClip");
