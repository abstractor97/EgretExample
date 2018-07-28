var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 新手指引的遮罩
 * @author chenkai
 * @since 2017/7/4
 *
 * 在不需遮罩的矩形区域四周，创建4个半透明rect。
 *
 * example:
 * 在(100,100)位置，显示200x50的可点击区域
 * GuideMask.getInstance().show(100,100,200, 50, this);
 * GuideMask.getInstance().hide();
 */
var GuideMask = (function (_super) {
    __extends(GuideMask, _super);
    function GuideMask() {
        var _this = _super.call(this) || this;
        /**颜色 */
        _this.color = 0x000000;
        /**透明度 */
        _this.alpha = 0.5;
        return _this;
    }
    GuideMask.prototype.childrenCreated = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    GuideMask.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GuideMask();
        }
        return this.instance;
    };
    /**
     * 显示指引半透明遮罩
     * @x 不需遮罩的矩形区域x
     * @y 不需遮罩的矩形区域y
     * @w 不需遮罩的矩形区域宽度
     * @h 不需遮罩的矩形区域高度
     * @doc GuildMask显示的容器
     */
    GuideMask.prototype.show = function (x, y, w, h, doc) {
        var stage = egret.lifecycle.stage;
        //上部遮罩
        var rectTop = new eui.Rect(stage.stageWidth, y, this.color);
        rectTop.x = 0;
        rectTop.y = 0;
        this.addChild(rectTop);
        //下部遮罩
        var rectFoot = new eui.Rect(stage.stageWidth, stage.stageHeight - y - h, this.color);
        rectFoot.x = 0;
        rectFoot.y = h + y;
        this.addChild(rectFoot);
        //左边遮罩
        var rectLeft = new eui.Rect(x, h, this.color);
        rectLeft.x = 0;
        rectLeft.y = y;
        this.addChild(rectLeft);
        //右边遮罩
        var rectRight = new eui.Rect(stage.stageWidth - x - w, h, this.color);
        rectRight.x = x + w;
        rectRight.y = y;
        this.addChild(rectRight);
        doc.addChild(this);
    };
    /**
     * 隐藏
     */
    GuideMask.prototype.hide = function () {
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
    };
    return GuideMask;
}(eui.Group));
__reflect(GuideMask.prototype, "GuideMask");
//# sourceMappingURL=GuideMask.js.map