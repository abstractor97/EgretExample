var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 键盘监听
 * @author chenkai
 * @since 2017/6/27
 */
var KeyListener = (function (_super) {
    __extends(KeyListener, _super);
    function KeyListener() {
        var _this = _super.call(this) || this;
        _this.buttons = {};
        window["keyListener"] = _this;
        window.document.onkeydown = _this.onKeyDown;
        window.document.onkeyup = _this.onKeyUp;
        return _this;
    }
    //键盘按下
    KeyListener.prototype.onKeyDown = function (evt) {
        console.log(evt.keyCode);
        window["keyListener"].dispatchEventWith(KeyListener.EVENT_KEY_DOWN, false, evt.keyCode);
    };
    KeyListener.prototype.onKeyUp = function (evt) {
        window["keyListener"].dispatchEventWith(KeyListener.EVENT_KEY_UP, false, evt.keyCode);
    };
    return KeyListener;
}(egret.EventDispatcher));
KeyListener.EVENT_KEY_DOWN = "EVENT_KEY_DOWN";
KeyListener.EVENT_KEY_UP = "EVENT_KEY_UP";
KeyListener.Up = 38;
KeyListener.Left = 37;
KeyListener.Right = 39;
__reflect(KeyListener.prototype, "KeyListener");
//# sourceMappingURL=KeyListener.js.map