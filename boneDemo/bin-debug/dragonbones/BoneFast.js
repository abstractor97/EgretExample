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
 * 骨骼极速格式
 */
var BoneFast = (function (_super) {
    __extends(BoneFast, _super);
    function BoneFast() {
        var _this = _super.call(this) || this;
        dragonBones.addMovieGroup(RES.getRes("Dragon_ske_dbmv"), RES.getRes("Dragon_tex2_png")); // 添加动画数据和贴图
        _this.movie = dragonBones.buildMovie("Dragon"); // 创建 白鹭极速格式 的动画
        _this.movie.scaleX = 0.2;
        _this.movie.scaleY = 0.2;
        _this.movie.play("walk");
        _this.addChild(_this.movie);
        return _this;
    }
    BoneFast.prototype.destoryMe = function () {
        this.movie.stop();
        this.movie.dispose();
        this.movie.parent && this.movie.parent.removeChild(this.movie);
    };
    return BoneFast;
}(egret.DisplayObjectContainer));
__reflect(BoneFast.prototype, "BoneFast");
