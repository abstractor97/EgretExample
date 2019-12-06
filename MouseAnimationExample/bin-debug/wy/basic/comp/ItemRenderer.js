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
     * 渲染器基类
     *
     * @example 自定义的渲染器只需继承此类即可
     * <pre>
     *     class RankItem extends wy.ItemRenderer {
     *         constructor() {
     *             super();
     *             this.width = 300;
     *             this.height = 300;
     *         }
     *
     *         public show():void {
     *             //初始化实例
     *         }
     *
     *         public dataChanged():void {
     *             super.dataChanged();
     *             //数据改变了，对item进行更新
     *         }
     *
     *         public clear():void {
     *             super.clear();
     *             //移除了要清理
     *         }
     *     }
     * </pre>
     *
     * @version 0.0.3
     * @platform egret3.0.3
     *
     */
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemRenderer.prototype, "data", {
            /**
             * 获取当前item数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            get: function () {
                return this._data;
            },
            /**
             * 设置当前item数据
             *
             * @param value 新数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            set: function (value) {
                this._data = value;
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 数据更新了 触发
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        ItemRenderer.prototype.dataChanged = function () {
        };
        /**
         * 清理事件
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        ItemRenderer.prototype.clear = function () {
        };
        return ItemRenderer;
    }(wy.BaseSprite));
    wy.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "wy.ItemRenderer", ["wy.IItemRenderer"]);
})(wy || (wy = {}));
//# sourceMappingURL=ItemRenderer.js.map