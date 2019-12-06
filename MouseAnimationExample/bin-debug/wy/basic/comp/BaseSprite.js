var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wy;
(function (wy) {
    /**
     *页面基类
     * @memberof wy
     * @name public class BaseSprite
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite() {
            var _this = _super.call(this) || this;
            _this._isHide = true;
            return _this;
        }
        /**
         * 显示页面
         * 主要做添加操作： 例如 添加监听 显示对象添加到舞台
         * @param data? 页面切换传过来的数据
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseSprite.prototype.show = function (data) {
            if (this._isHide) {
                this._isHide = false;
            }
        };
        /**
         * 隐藏页面
         * 主要做移除操作：例如 监听事件
         * @version 0.0.1
         * @platform egret3.0.2
         */
        BaseSprite.prototype.hide = function () {
            if (!this._isHide) {
                this._isHide = true;
            }
        };
        return BaseSprite;
    }(egret.DisplayObjectContainer));
    wy.BaseSprite = BaseSprite;
    __reflect(BaseSprite.prototype, "wy.BaseSprite");
})(wy || (wy = {}));
//# sourceMappingURL=BaseSprite.js.map