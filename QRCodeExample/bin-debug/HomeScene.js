var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/17
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        //透明图片test.png，测试用，用来观察img覆盖效果
        var htmlCode = new QRCode("resource/assets/test.png");
        //实际二维码图片
        //var htmlCode = new QRCode("resource/assets/code.jpg");
        htmlCode.setPosition(this.euiCode.x, this.euiCode.y, this.euiCode.width, this.euiCode.height);
        htmlCode.showHtmlCode();
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
