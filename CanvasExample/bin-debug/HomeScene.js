var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主页
 * @author chenkai
 * @since 2017/5/23
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.panColor = 0; //当前选择的画笔颜色
        _this.panLineSize = 5; //画笔大小
        _this.eraserSize = 20; //橡皮擦大小
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.changeState(DrawState.Free);
        this.initCanvas();
        this.configListeners();
    };
    //改变状态
    HomeScene.prototype.changeState = function (state, data) {
        if (data === void 0) { data = null; }
        this.curState = state;
        switch (state) {
            case DrawState.Free:
                break;
            case DrawState.Pan:
                console.log("选择画笔");
                break;
            case DrawState.Eraser:
                console.log("选择橡皮擦");
                break;
        }
    };
    //初始化画布
    HomeScene.prototype.initCanvas = function () {
        this.canvasSp = new egret.Sprite();
        this.canvas = this.canvasSp.graphics;
        this.canvas.beginFill(0xffffff);
        this.canvas.drawRect(0, 0, this.canvasGroup.width, this.canvasGroup.height);
        this.canvas.endFill();
        this.canvasSp.touchEnabled = true;
        this.canvasGroup.addChild(this.canvasSp);
        this.panColorRect.fillColor = this.panColor;
    };
    //监听触摸事件
    HomeScene.prototype.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.canvasSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.canvasSp.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.colorGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onColorSelect, this);
    };
    //触摸屏幕
    HomeScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.pan:
                this.changeState(DrawState.Pan, e);
                break;
            case this.eraser:
                this.changeState(DrawState.Eraser, e);
                break;
            case this.resetBtn:
                this.reset();
                break;
        }
    };
    //开始触摸画布
    HomeScene.prototype.onTouchBegin = function (e) {
        if (e.target != this.canvasSp) {
            return;
        }
        switch (this.curState) {
            case DrawState.Pan:
                this.onPanBegin(e);
                break;
            case DrawState.Eraser:
                this.onEraserBegin(e);
                break;
        }
    };
    //移动
    HomeScene.prototype.onTouchMove = function (e) {
        if (e.target != this.canvasSp) {
            return;
        }
        switch (this.curState) {
            case DrawState.Pan:
                this.onPanMove(e);
                break;
            case DrawState.Eraser:
                this.onEraserMove(e);
                break;
        }
    };
    //选择颜色
    HomeScene.prototype.onColorSelect = function (e) {
        if (e.target instanceof eui.Rect) {
            var colorRect = e.target;
            this.panColor = colorRect.fillColor;
            this.panColorRect.fillColor = this.panColor;
        }
    };
    //画笔开始在画布上绘制，设置线条，并移动绘制起始点到触摸位置
    HomeScene.prototype.onPanBegin = function (e) {
        console.log("开始绘制线条");
        this.canvas.lineStyle(this.panLineSize, this.panColor, 1, false, "normal", egret.CapsStyle.ROUND, egret.JointStyle.ROUND, 3);
        this.canvas.moveTo(e.localX, e.localY);
    };
    //画笔在画布上移动
    HomeScene.prototype.onPanMove = function (e) {
        this.canvas.lineTo(e.localX, e.localY);
    };
    //橡皮擦
    HomeScene.prototype.onEraserBegin = function (e) {
        console.log("开始擦除");
        this.canvas.lineStyle(this.eraserSize, 0xffffff, 1, false, "normal", egret.CapsStyle.ROUND, egret.JointStyle.ROUND, 3);
        this.canvas.moveTo(e.localX, e.localY);
    };
    //橡皮擦移动
    HomeScene.prototype.onEraserMove = function (e) {
        this.canvas.lineTo(e.localX, e.localY);
    };
    //重置画布
    HomeScene.prototype.reset = function () {
        console.log("重置画布");
        this.canvas.clear();
        this.canvas.beginFill(0xffffff);
        this.canvas.drawRect(0, 0, this.canvasGroup.width, this.canvasGroup.height);
        this.canvas.endFill();
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//绘画状态
var DrawState;
(function (DrawState) {
    DrawState[DrawState["Free"] = 0] = "Free";
    DrawState[DrawState["Pan"] = 1] = "Pan";
    DrawState[DrawState["Eraser"] = 2] = "Eraser";
})(DrawState || (DrawState = {}));
//# sourceMappingURL=HomeScene.js.map