var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 *@author
 *
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        var load = document.getElementById('loading');
        if (load && load.parentNode) {
            load.parentNode.removeChild(load);
        }
        document.body.style.background = '#0E0E0E';
        return _this;
    }
    // private lineUp: egret.Shape;//黑线
    // private lineDown: egret.Shape;//白线
    LoadingUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.shape = wy.Tools.createMovieClip('load2');
        this.addChild(this.shape);
        this.shape.play(-1);
        // this.shape.scaleX =
        // this.shape.scaleY =
        // 0.7;
        wy.Tools.center(this.shape);
        this.shape.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.shape.y = egret.MainContext.instance.stage.stageHeight / 2 - this.textField.height / 2;
        // this.lineDown = new egret.Shape();
        // this.lineDown.graphics.lineStyle(0.5, 0xffffff, 0.5);
        // this.lineDown.graphics.moveTo(0, 0);
        // this.lineDown.graphics.lineTo(120, 0);
        // this.lineDown.graphics.endFill();
        // this.addChild(this.lineDown);
        // this.lineUp = new egret.Shape();
        // this.addChild(this.lineUp);
        // this.lineDown.x = this.width / 2 - this.lineDown.width / 2;
        // this.lineDown.y = 830;
        // this.lineUp.x = this.lineDown.x;
        // this.lineUp.y = this.lineDown.y;
        this.textField.text = '';
        //this.textField.size = 15;
        this.textField.y = this.shape.y + this.shape.anchorOffsetY + 10;
    };
    LoadingUI.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    LoadingUI.prototype.setProgress = function (cur, total) {
        var perc = Math.round(cur * 100 / total);
        this.textField.text = '' + perc + '%';
        //this.textField.y = this.shape.y+this.shape.anchorOffsetY+10;//this.height/2 - this.textField.textHeight/2;
        this.textField.x = this.width / 2 - this.textField.width / 2;
        // this.lineUp.graphics.clear();
        // this.lineUp.graphics.lineStyle(2, 0x000000, 1);
        // this.lineUp.graphics.moveTo(0, 0);
        // this.lineUp.graphics.lineTo(this.lineDown.width * perc / 100, 0);
    };
    return LoadingUI;
}(LoadingUIUI));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map