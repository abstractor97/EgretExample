var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 舞台工具类
 * @author rikimaru
 * @since 2017/3/15
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 初始化
     * @param stage 传入的stage
     */
    StageUtils.prototype.init = function (stage) {
        this.stage = stage;
    };
    Object.defineProperty(StageUtils.prototype, "stageWidth", {
        /**舞台宽度*/
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "stageHeight", {
        /**舞台高度 */
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    return StageUtils;
}(SingleClass));
__reflect(StageUtils.prototype, "StageUtils");
