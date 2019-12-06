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
     * 滑动列表，自带滑动功能
     * @extends BaseSprite
     *
     * @example
     * <pre>
     *    var list:wy.ScrollerList = new wy.ScrollerList();
     *    list.itemRenderer = RankItem;
     *    list.width = 300;
     *    list.height = 300;
     *    list.dataProvider = [{scr:'http://wx.qlogo.cn/mmopen/JUvAvnJSpXADD7HxXhh8866bbibVAkabWP41MqsRZlUm1oePib2vVIhKbu4WWicGEPDKh4nbyGSuSjgMcJ756ANEHS023qPwmH5/132'},
     *    list.updateDisplayList();
     *    list.x = wy.GameInterface.stage.stageWidth*0.5 - list.width*0.5;
     *    list.y = wy.GameInterface.stage.stageHeight*0.5 - list.height*0.5;
     *    this.addChild(list);
     * </pre>
     *
     * @version 0.0.3
     * @platform egret3.0.3
     *
     */
    var ScrollerList = (function (_super) {
        __extends(ScrollerList, _super);
        function ScrollerList() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        /**
         * 列表初始化
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.init = function () {
            this._container = new egret.DisplayObjectContainer;
            this._scroller = new egret.ScrollView(this._container);
            this.addChild(this._scroller);
            this._list = new wy.List;
            this._container.addChild(this._list);
        };
        Object.defineProperty(ScrollerList.prototype, "scrollTop", {
            /**
             * 设置垂直滑动位置
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._scroller.scrollTop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "scrollLeft", {
            /**
             * 设置水平滑动位置
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._scroller.scrollLeft = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "verticalScrollPolicy", {
            /**
             * 设置垂直滚动模式 on off auto
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._scroller.verticalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "horizontalScrollPolicy", {
            /**
             * 设置水平滚动模式 on off auto
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._scroller.horizontalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "bounces", {
            /**
             * 设置列表回弹 true false
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._scroller.bounces = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "itemRenderer", {
            /**
             * 设置列表渲染器
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._list.itemRenderer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "width", {
            /**
             * 获取滚动窗口宽度
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            get: function () {
                return this._width;
            },
            /**
             * 设置滚动窗口宽度
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._width = value;
                this._scroller.width = this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "height", {
            /**
             * 获取滚动窗口高度
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            get: function () {
                return this._height;
            },
            /**
             * 设置滚动窗口高度
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._height = value;
                this._scroller.height = this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollerList.prototype, "dataProvider", {
            /**
             * 获取列表数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            get: function () {
                return this._list.dataProvider;
            },
            /**
             * 获取列表数据
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (data) {
                this._list.dataProvider = data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新显示列表
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.updateDisplayList = function () {
            this._list.updateDisplayList();
        };
        Object.defineProperty(ScrollerList.prototype, "layout", {
            /**
             * 设置列表横竖模式
             *
             * @version 0.0.3
             * @platform egret3.0.3
             * */
            set: function (value) {
                this._list.layout = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新指定子item
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.updateItem = function (itemIndex, itemData) {
            this._list.updateItem(itemIndex, itemData);
        };
        /**
         * 添加子item
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.addItem = function (itemData) {
            this._list.addItem(itemData);
        };
        /**
         * 显示 即开启点击事件监听
         * 监听List.ITEM_CLICK 事件即可
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.show = function () {
            this._list.show();
        };
        /**
         * 隐藏 即关闭点击事件监听
         *
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        ScrollerList.prototype.hide = function () {
            this._list.hide();
        };
        return ScrollerList;
    }(wy.BaseSprite));
    wy.ScrollerList = ScrollerList;
    __reflect(ScrollerList.prototype, "wy.ScrollerList");
})(wy || (wy = {}));
//# sourceMappingURL=ScrollerList.js.map