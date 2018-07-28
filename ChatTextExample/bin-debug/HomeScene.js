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
 * @since 2017/4/20
 *
 * 实现可自行滚动的聊天文本框
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
    };
    HomeScene.prototype.onOkTouch = function () {
        //显示聊天记录
        if (this.chatLabel.text != "") {
            this.chatLabel.text += "\n" + this.inputLabel.text;
        }
        else {
            this.chatLabel.text += this.inputLabel.text;
        }
        //文本高度大于滚动容器高度时，将视口置于文本最后一行
        if (this.chatLabel.height > this.chatScroller.height) {
            this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
        }
        //清空输入文本
        this.inputLabel.text = "";
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
