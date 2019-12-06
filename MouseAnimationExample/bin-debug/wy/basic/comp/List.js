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
     * 列表list
     *
     * @extends BaseSprite
     *
     * @example
     * <pre>
     *     var list:List = new List();
     *     list.itemRenderer = RankItem;
     *     list.width = 300;
     *     list.height = 300;
     *     list.dataProvider = [];
     *     list.updateDisplayList();
     *     this.addChild(list);
     * </pre>
     *
     * @version 0.0.3
     * @platform egret3.0.3
     *
     */
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var _this = _super.call(this) || this;
            /**
             * 子item顶间距
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this.top = 0;
            /**
             * 子item底间距
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this.bottom = 0;
            /**
             * 子item左间距
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this.left = 0;
            /**
             * 子item右间距
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this.right = 0;
            /**
             * 列表列数
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this.cols = 1;
            /**
             * 列表行数
             *
             * @version 0.0.3
             * @platform egret3.0.3*/
            _this.rows = 1;
            /**
             * 列表模式：vertical 竖形列表 horizontal 横性列表
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            _this._layout = "vertical";
            return _this;
        }
        Object.defineProperty(List.prototype, "dataProvider", {
            /**
             * 获取列表数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            get: function () {
                return this._dataProvider;
            },
            /**
             * 设置数据，自动更新
             *
             * @param value 新数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                // this.removeChildren();
                if (this._itemRenderer) {
                    var item;
                    for (var i = 0; i < this._itemRenderer.length; ++i) {
                        item = this._itemRenderer[i];
                        item.hide();
                        if (item.parent)
                            item.parent.removeChild(item);
                    }
                }
                this._itemRenderer = [];
                this._dataProvider = value;
                var obj;
                var render;
                if (!this.itemRenderer) {
                    throw Error("没有设置渲染器");
                }
                else {
                    for (var i = 0; i < this._dataProvider.length; ++i) {
                        obj = this._dataProvider[i];
                        render = new this.itemRenderer();
                        render.show();
                        render.itemIndex = i;
                        render.data = obj;
                        render.selected = false;
                        this.addChild(render);
                        this._itemRenderer.push(render);
                    }
                    this.updateDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "layout", {
            /**
             * 设置显示模式
             *
             * @param value 显示模式
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                if (this._layout == value)
                    return;
                this._layout = value;
                this.updateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新列表
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        List.prototype.updateDisplayList = function () {
            if (!this._itemRenderer || this._itemRenderer.length <= 0) {
                return;
            }
            var index = 0;
            if (this._layout == List.VERTICAL) {
                var item_w = this._itemRenderer[0].width;
                var item_h = this._itemRenderer[0].height;
                while (index < this._itemRenderer.length) {
                    for (var i = 0; i < this.cols && index < this._itemRenderer.length; ++i) {
                        this._itemRenderer[index].x = i * (item_w + this.left + this.right) + this.left + this._itemRenderer[index].anchorOffsetX;
                        this._itemRenderer[index].y = Math.floor(index / this.cols) * (item_h + this.top + this.bottom) + this.top + this._itemRenderer[index].anchorOffsetY;
                        ++index;
                    }
                }
            }
            else if (this._layout == List.HORIZENTOL) {
                var item_w = this._itemRenderer[0].width;
                var item_h = this._itemRenderer[0].height;
                while (index < this._itemRenderer.length) {
                    for (var i = 0; i < this.rows && index < this._itemRenderer.length; ++i) {
                        this._itemRenderer[index].x = Math.floor(index / this.rows) * (item_w + this.left + this.right) + this.left + this._itemRenderer[index].anchorOffsetX;
                        this._itemRenderer[index].y = i * (item_h + this.top + this.bottom) + this.top + this._itemRenderer[index].anchorOffsetY;
                        ++index;
                    }
                }
            }
            if (!this.bgShape) {
                this.bgShape = new egret.Shape;
                this.addChildAt(this.bgShape, 0);
            }
            this.bgShape.graphics.clear();
            this.bgShape.graphics.beginFill(0, 0.01);
            this.bgShape.graphics.drawRect(0, 0, this.width, this.height);
            this.bgShape.graphics.endFill();
        };
        /**
         * 更新指定item
         *
         * @param itemIndex
         * @param itemData
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.updateItem = function (itemIndex, itemData) {
            if (itemIndex < 0 || !itemData || !this._itemRenderer || this._itemRenderer.length <= 0 || this._itemRenderer.length <= itemIndex) {
                return;
            }
            this._itemRenderer[itemIndex].data = itemData;
            this.updateDisplayList();
        };
        /**
         * 添加子item
         *
         * @param itemData
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.addItem = function (itemData) {
            if (!itemData || !this._itemRenderer || this._itemRenderer.length <= 0 || !this.itemRenderer) {
                return;
            }
            var render = new this.itemRenderer();
            render.show();
            render.data = itemData;
            render.itemIndex = this._itemRenderer.length;
            render.selected = false;
            this.addChild(render);
            this._itemRenderer.push(render);
            this.updateDisplayList();
        };
        /**
         * 获取list节点
         *
         * @param index
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.getItemByIndex = function (index) {
            if (index < this._itemRenderer.length) {
                return this._itemRenderer[index];
            }
            return null;
        };
        /**
         * 显示
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.show = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            for (var index = 0; index < this._itemRenderer.length; index++) {
                this._itemRenderer[index].show();
            }
        };
        /**
         * 隐藏
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.hide = function () {
            this.touchEnabled = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            for (var index = 0; index < this._itemRenderer.length; index++) {
                this._itemRenderer[index].hide();
            }
        };
        /**
         * 点击事件
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        List.prototype.onTouchTap = function (e) {
            if (!this._itemRenderer || this._itemRenderer.length <= 0) {
                return;
            }
            var item_w = this._itemRenderer[0].width;
            var item_h = this._itemRenderer[0].height;
            var col = Math.floor(e.localX / (item_w + this.left + this.right));
            var row = Math.floor(e.localY / (item_h + this.top + this.bottom));
            col++;
            row++;
            // console.log("col="+col);
            // console.log("row="+row);
            var clickIndex;
            if (this._layout == List.VERTICAL) {
                row = row - 1 >= 0 ? row - 1 : 0;
                // this._itemRenderer[row*2+col].selected = true;  
                // console.log("clicked v index="+(row*this.cols+col));
                clickIndex = row * this.cols + col;
            }
            else if (this._layout == List.HORIZENTOL) {
                col = col - 1 >= 0 ? col - 1 : 0;
                // console.log("clicked h index"+(col*this.rows+row));
                clickIndex = col * this.rows + row;
            }
            clickIndex--;
            // console.log("clickIndex="+clickIndex);
            // console.log(this._itemRenderer[clickIndex]);
            this.dispatchEventWith(List.ITEM_CLICKED, null, this._itemRenderer[clickIndex]);
        };
        return List;
    }(wy.BaseSprite));
    /**
     * 垂直
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    List.VERTICAL = "vertical";
    /**
     * 水平
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    List.HORIZENTOL = "horizental";
    /**
     * 列表子item点击事件
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    List.ITEM_CLICKED = "item_clicked";
    wy.List = List;
    __reflect(List.prototype, "wy.List");
})(wy || (wy = {}));
//# sourceMappingURL=List.js.map