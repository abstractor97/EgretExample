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
     * 滑动菜单列表
     *
     * @example
     * <pre>
     *     var menu: wy.MenuUtils = new wy.MenuUtils();
     *	   this.addChild(menu);
     *     menu.textField = tx; 需要赋值的文本框
     *     menu.title = "--选择省份--"; 列表标题  默认为：空
     *	   menu.setData(date[]); 列表需要显示的数组
     *	   menu.show(); 显示菜单列表
     *	   menu.hide(); 隐藏菜单列表
     * </pre>
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var MenuUtils = (function (_super) {
        __extends(MenuUtils, _super);
        function MenuUtils() {
            var _this = _super.call(this) || this;
            /**
             *是否选择 默认：false
             *
             * @version 0.0.1
             * @platform egret3.0.2
             */
            _this.isSelect = false;
            _this.width = 640;
            _this.height = 1036;
            _this.createOk();
            return _this;
        }
        MenuUtils.prototype.createOk = function () {
            this.mainContainer = new egret.DisplayObjectContainer();
            this.addChild(this.mainContainer);
            this.mainContainer.height = 400;
            this.mainContainer.y = this.height;
            this.txArr = [];
            this.listValueArr = [];
            this.createTopBar();
            this.createBottomArea();
            this.initScrollView();
        };
        /**
         *创建顶部栏
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.createTopBar = function () {
            this.topShape = new egret.Shape();
            this.topShape.graphics.beginFill(0xefefef, 1);
            this.topShape.graphics.drawRect(0, 0, 640, 60);
            this.topShape.graphics.endFill();
            this.mainContainer.addChild(this.topShape);
            this.confirmBtn = new egret.TextField();
            this.mainContainer.addChild(this.confirmBtn);
            this.confirmBtn.width = 100;
            this.confirmBtn.height = 60;
            this.confirmBtn.fontFamily = "微软雅黑";
            this.confirmBtn.x = 640 - this.confirmBtn.width;
            this.confirmBtn.textColor = 0x23c349;
            this.confirmBtn.size = 25;
            this.confirmBtn.textAlign = "center";
            this.confirmBtn.verticalAlign = "middle";
            this.confirmBtn.text = "确定";
            this.confirmBtn.name = "btn";
            this.confirmBtn.touchEnabled = true;
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
            this.cancelBtn = new egret.TextField();
            this.mainContainer.addChild(this.cancelBtn);
            this.cancelBtn.width = 100;
            this.cancelBtn.height = 60;
            this.cancelBtn.fontFamily = "微软雅黑";
            this.cancelBtn.x = 0;
            this.cancelBtn.textColor = 0x3ebafa;
            this.cancelBtn.size = 25;
            this.cancelBtn.textAlign = "center";
            this.cancelBtn.verticalAlign = "middle";
            this.cancelBtn.text = "取消";
            this.cancelBtn.name = "btn";
            this.cancelBtn.touchEnabled = true;
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancel, this);
            this.titleText = new egret.TextField();
            this.mainContainer.addChild(this.titleText);
            this.titleText.width = (this.width - (this.cancelBtn.width + this.confirmBtn.width)) - 20;
            this.titleText.height = 60;
            this.titleText.fontFamily = "黑体";
            this.titleText.x = this.confirmBtn.width + 10;
            this.titleText.textColor = 0x000000;
            this.titleText.size = 23;
            this.titleText.textAlign = "center";
            this.titleText.verticalAlign = "middle";
            this.titleText.text = "";
        };
        /**
         *创建底部区域
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.createBottomArea = function () {
            this.bottomShape = new egret.Shape();
            this.bottomShape.graphics.beginFill(0xd2d3d8, 1);
            this.bottomShape.graphics.drawRect(0, 0, 640, 340);
            this.bottomShape.graphics.endFill();
            this.bottomShape.y = this.topShape.y + this.topShape.height;
            this.mainContainer.addChild(this.bottomShape);
        };
        /**
         *初始化滑动区域
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.initScrollView = function () {
            this.listContainer = new egret.DisplayObjectContainer();
            this.menuScroll = new egret.ScrollView();
            this.mainContainer.addChild(this.menuScroll);
            this.menuScroll.width = this.width;
            this.menuScroll.height = this.mainContainer.height - this.confirmBtn.height;
            this.menuScroll.y = this.bottomShape.y;
            this.menuScroll.setContent(this.listContainer);
            this.menuScroll.horizontalScrollPolicy = "off";
        };
        /**
         *菜单列表文本样式
         * @param tx 菜单文本
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.textStyle = function (tx) {
            tx.background = true;
            tx.backgroundColor = 0xffffff;
            tx.border = true;
            tx.borderColor = 0xd2d3d8;
            tx.fontFamily = "微软雅黑";
            tx.textColor = 0x000000;
            tx.width = 640;
            tx.height = 50;
            tx.size = 25;
            // tx.text = "aa";
            tx.verticalAlign = "middle";
            tx.textAlign = "center";
        };
        /**
         * 设置列表文本数据
         * @param data  数据数组
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.setData = function (data) {
            if (data == null || data.length == 0) {
                return;
            }
            var arr = this.listValueArr;
            //如果传入的数据与之前的数据相同，则不做处理
            if (this.listValueArr) {
                var arrs = [];
                for (var i = 0; i < data.length; i++) {
                    arrs[i] = data[i];
                }
                if (arrs.sort().toString() == arr.sort().toString()) {
                    return;
                }
            }
            if (this.txArr.length == data.length) {
                for (var i = 0; i < data.length; i++) {
                    this.txArr[i].text = data[i];
                }
            }
            else {
                this.txArr = [];
                this.listValueArr = [];
                this.listContainer.removeChildren();
                for (var i = 0; i < data.length; i++) {
                    this.tx = new egret.TextField();
                    this.listContainer.addChild(this.tx);
                    this.textStyle(this.tx);
                    this.tx.y = i * this.tx.height;
                    this.txArr.push(this.tx);
                    this.tx.text = data[i];
                    this.txArr[i].touchEnabled = true;
                    this.txArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
                    this.listValueArr[i] = data[i];
                    this.menuScroll.setScrollTop(0);
                }
            }
        };
        /**
         * 列表item点击事件
         * @param event
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.onTouchItem = function (event) {
            for (var i = 0; i < this.txArr.length; i++) {
                this.textStyle(this.txArr[i]);
            }
            console.log("tap " + event.target.text);
            this.isSelect = true;
            event.target.backgroundColor = 0xd0cfcf;
            this.selectValue = event.target.text;
        };
        Object.defineProperty(MenuUtils.prototype, "textField", {
            /**
             *获取对应文本框
             *
             * @version 0.0.1
             * @platform egret3.0.2
             */
            get: function () {
                return this._textField;
            },
            /**
             *设置需要赋值的文本框
             *
             * @version 0.0.1
             * @platform egret3.0.2
             */
            set: function (textField) {
                this._textField = textField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MenuUtils.prototype, "title", {
            /**
             *获取title的值
             *
             * @version 0.0.1
             * @platform egret3.0.2
             */
            get: function () {
                return this._title;
            },
            /**
             *设置title
             *
             * @version 0.0.1
             * @platform egret3.0.2
             */
            set: function (title) {
                this._title = title;
                this.titleText.text = title;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *显示
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.show = function () {
            egret.Tween.get(this.mainContainer).to({ y: this.height - 400 }, 300, egret.Ease.backOut);
        };
        /**
         *隐藏
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.hide = function () {
            egret.Tween.get(this.mainContainer).to({ y: this.height }, 100);
        };
        /**
         *取消
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.cancel = function () {
            this.hide();
        };
        /**
         *确定
         *
         * @version 0.0.1
         * @platform egret3.0.2
         */
        MenuUtils.prototype.confirm = function () {
            if (this.isSelect) {
                this._textField.text = this.selectValue;
            }
            this.hide();
        };
        return MenuUtils;
    }(egret.DisplayObjectContainer));
    wy.MenuUtils = MenuUtils;
    __reflect(MenuUtils.prototype, "wy.MenuUtils");
})(wy || (wy = {}));
//# sourceMappingURL=MenuUtils.js.map