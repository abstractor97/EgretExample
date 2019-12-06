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
     *     var dateMenu: wy.DateMenu = new wy.DateMenu(w=640,h=1036);
     *	   this.addChild(dateMenu);
     *     如果年月日是一个文本框
     *     dateMenu.textField = tx; 需要赋值的文本框
     *     dateMenu.format("yyyy-mm-dd" or "yyyy年mm月dd日");
     *	   如果年月日是分开的  就调用：
     *     dateMenu.textFields(yTx,mTx,dTx);
     *	   则不需要调用下面这个方法
     *	   dateMenu.show(); 显示菜单列表
     *	   dateMenu.hide(); 隐藏菜单列表
     * </pre>
     *
     * @version 0.0.1
     * @platform egret4.1.0
     */
    var DateMenu = (function (_super) {
        __extends(DateMenu, _super);
        function DateMenu(w, h) {
            if (w === void 0) { w = 640; }
            if (h === void 0) { h = 1036; }
            var _this = _super.call(this) || this;
            /**
             *是否选择.年
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            _this.isSelectYear = false;
            /**
             *是否选择.月
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            _this.isSelectMonth = false;
            /**
             *是否选择.日
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            _this.isSelectDay = false;
            /**
             *是否为多个文本
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            _this.isMulit = false;
            _this.width = w;
            _this.height = h;
            _this.createOk();
            return _this;
        }
        DateMenu.prototype.createOk = function () {
            this.mainContainer = new egret.DisplayObjectContainer();
            this.addChild(this.mainContainer);
            this.mainContainer.height = 400;
            this.mainContainer.y = this.height;
            this.yearTxArr = [];
            this.monthTxArr = [];
            this.dayTxArr = [];
            this._textField = [];
            this.yearDataArr = [];
            this.monthDataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            this.dayDataArr = [];
            this.date = new Date();
            var curYear = Number(this.date.getFullYear());
            //从当前年份到1900年
            for (var i = curYear; i >= 1900; i--) {
                this.yearDataArr.push(i);
            }
            this.dayLen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var curMonth = Number(this.date.getMonth());
            if (curMonth != 1) {
                for (var i = 1; i <= this.dayLen[curMonth]; i++) {
                    this.dayDataArr.push(i);
                }
            }
            else {
                if ((((curYear % 4) == 0) && ((curYear % 100) != 0)) || ((curYear % 400) == 0)) {
                    for (var i = 1; i <= 29; i++) {
                        this.dayDataArr.push(i);
                    }
                }
                else {
                    for (var i = 1; i <= 28; i++) {
                        this.dayDataArr.push(i);
                    }
                }
            }
            this.createTopBar();
            this.createBottomArea();
            this.initScrollView();
            this.setData();
            this.title = "选择年月日";
        };
        /**
         *创建顶部栏
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.createTopBar = function () {
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
         * @platform egret4.1.0
         */
        DateMenu.prototype.createBottomArea = function () {
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
         * @platform egret4.1.0
         */
        DateMenu.prototype.initScrollView = function () {
            this.yearContainer = new egret.DisplayObjectContainer();
            this.yearScroll = new egret.ScrollView();
            this.mainContainer.addChild(this.yearScroll);
            this.yearScroll.width = this.width / 3;
            this.yearScroll.height = this.mainContainer.height - this.confirmBtn.height;
            this.yearScroll.y = this.bottomShape.y;
            this.yearScroll.setContent(this.yearContainer);
            this.yearScroll.horizontalScrollPolicy = "off";
            this.monthContainer = new egret.DisplayObjectContainer();
            this.monthScroll = new egret.ScrollView();
            this.mainContainer.addChild(this.monthScroll);
            this.monthScroll.width = this.width / 3;
            this.monthScroll.height = this.mainContainer.height - this.confirmBtn.height;
            this.monthScroll.x = this.yearScroll.x + this.yearScroll.width;
            this.monthScroll.y = this.bottomShape.y;
            this.monthScroll.setContent(this.monthContainer);
            this.monthScroll.horizontalScrollPolicy = "off";
            this.dayContainer = new egret.DisplayObjectContainer();
            this.dayScroll = new egret.ScrollView();
            this.mainContainer.addChild(this.dayScroll);
            this.dayScroll.width = this.width / 3;
            this.dayScroll.height = this.mainContainer.height - this.confirmBtn.height;
            this.dayScroll.x = this.monthScroll.x + this.monthScroll.width;
            this.dayScroll.y = this.bottomShape.y;
            this.dayScroll.setContent(this.dayContainer);
            this.dayScroll.horizontalScrollPolicy = "off";
        };
        /**
         *菜单列表文本样式
         * @param tx 菜单文本
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.textStyle = function (tx) {
            tx.background = true;
            tx.backgroundColor = 0xffffff;
            tx.border = true;
            tx.borderColor = 0xd2d3d8;
            tx.fontFamily = "微软雅黑";
            tx.textColor = 0x000000;
            tx.width = 640 / 3;
            tx.height = 50;
            tx.size = 25;
            // tx.text = "aa";
            tx.verticalAlign = "middle";
            tx.textAlign = "center";
        };
        /**
         * 设置年月日文本数据
         * @param data  数据数组
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.setData = function () {
            this.yearTxArr = [];
            for (var i = 0; i < this.yearDataArr.length; i++) {
                this.yearTx = new egret.TextField();
                this.yearContainer.addChild(this.yearTx);
                this.textStyle(this.yearTx);
                this.yearTx.y = i * this.yearTx.height;
                this.yearTxArr.push(this.yearTx);
                this.yearTx.text = this.yearDataArr[i] + "";
                this.yearTxArr[i].touchEnabled = true;
                this.yearTxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchYearItem, this);
            }
            for (var i = 0; i < this.monthDataArr.length; i++) {
                this.monthTx = new egret.TextField();
                this.monthContainer.addChild(this.monthTx);
                this.textStyle(this.monthTx);
                this.monthTx.y = i * this.monthTx.height;
                this.monthTxArr.push(this.monthTx);
                if (this.monthDataArr[i] < 10) {
                    this.monthTx.text = "0" + this.monthDataArr[i];
                }
                else {
                    this.monthTx.text = this.monthDataArr[i] + "";
                }
                this.monthTxArr[i].touchEnabled = true;
                this.monthTxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMonthItem, this);
            }
            for (var i = 0; i < this.dayDataArr.length; i++) {
                this.dayTx = new egret.TextField();
                this.dayContainer.addChild(this.dayTx);
                this.textStyle(this.dayTx);
                this.dayTx.y = i * this.dayTx.height;
                this.dayTxArr.push(this.dayTx);
                if (this.dayDataArr[i] < 10) {
                    this.dayTx.text = "0" + this.dayDataArr[i];
                }
                else {
                    this.dayTx.text = this.dayDataArr[i] + "";
                }
                this.dayTxArr[i].touchEnabled = true;
                this.dayTxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDayItem, this);
            }
            this.monthTxLocation = (this.date.getMonth() - 1) * (this.monthContainer.height / this.monthDataArr.length);
            this.monthScroll.setScrollTop(this.monthTxLocation);
            this.dayTxLocation = (this.date.getDate() - 1) * (this.dayContainer.height / this.dayDataArr.length);
            this.dayScroll.setScrollTop(this.dayTxLocation);
        };
        /**
         * 更换日.文本数据
         * @param data  数据数组
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.updateDay = function () {
            this.isSelectDay = false;
            this.dayScroll.setScrollTop(0);
            this.dayContainer.removeChildren();
            this.dayTxArr = [];
            console.log("day " + this.dayDataArr);
            for (var i = 0; i < this.dayDataArr.length; i++) {
                this.dayTx = new egret.TextField();
                this.dayContainer.addChild(this.dayTx);
                this.textStyle(this.dayTx);
                this.dayTx.y = i * this.dayTx.height;
                this.dayTxArr.push(this.dayTx);
                if (this.dayDataArr[i] < 10) {
                    this.dayTx.text = "0" + this.dayDataArr[i];
                }
                else {
                    this.dayTx.text = this.dayDataArr[i] + "";
                }
                this.dayTxArr[i].touchEnabled = true;
                this.dayTxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDayItem, this);
            }
        };
        /**
         * 更换月.文本数据
         * @param data  数据数组
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.updateMonth = function () {
            this.isSelectMonth = false;
            this.monthScroll.setScrollTop(0);
            this.monthContainer.removeChildren();
            this.monthTxArr = [];
            for (var i = 0; i < this.monthDataArr.length; i++) {
                this.monthTx = new egret.TextField();
                this.monthContainer.addChild(this.monthTx);
                this.textStyle(this.monthTx);
                this.monthTx.y = i * this.monthTx.height;
                this.monthTxArr.push(this.monthTx);
                if (this.monthDataArr[i] < 10) {
                    this.monthTx.text = "0" + this.monthDataArr[i];
                }
                else {
                    this.monthTx.text = this.monthDataArr[i] + "";
                }
                this.monthTxArr[i].touchEnabled = true;
                this.monthTxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMonthItem, this);
            }
        };
        /**
         * 年item点击事件
         * @param event
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.onTouchYearItem = function (event) {
            for (var i = 0; i < this.yearTxArr.length; i++) {
                this.textStyle(this.yearTxArr[i]);
            }
            this.isSelectYear = true;
            event.target.backgroundColor = 0xd0cfcf;
            if (this.selectYearValue != event.target.text) {
                this.selectYearValue = event.target.text;
                this.dayDataArr = [];
                if (this.isSelectMonth) {
                    if (this.selectMonthValue == "2") {
                        var curYear = Number(this.selectYearValue);
                        if ((((curYear % 4) == 0) && ((curYear % 100) != 0)) || ((curYear % 400) == 0)) {
                            for (var i = 1; i <= 29; i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                        else {
                            for (var i = 1; i <= 28; i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                    }
                    else {
                        for (var i = 1; i <= this.dayLen[Number(this.selectMonthValue) - 1]; i++) {
                            this.dayDataArr.push(i);
                        }
                    }
                }
                else {
                    for (var i = 1; i <= this.dayLen[0]; i++) {
                        this.dayDataArr.push(i);
                    }
                }
                this.updateDay();
            }
            /*   如果选择的是今年  未到的日期则不显示    */
            if (Number(this.selectYearValue) == this.date.getFullYear()) {
                this.monthDataArr = [];
                for (var i = 1; i <= (this.date.getMonth() + 1); i++) {
                    this.monthDataArr.push(i);
                }
                this.updateMonth();
                this.dayDataArr = [];
                for (var i = 1; i <= this.date.getDate(); i++) {
                    this.dayDataArr.push(i);
                }
                this.updateDay();
                this.selectMonthValue = "";
                this.selectDayValue = "";
            }
            else {
                this.monthDataArr = [];
                for (var i = 1; i <= 12; i++) {
                    this.monthDataArr.push(i);
                }
                this.updateMonth();
            }
        };
        /**
         * 月item点击事件
         * @param event
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.onTouchMonthItem = function (event) {
            for (var i = 0; i < this.monthTxArr.length; i++) {
                this.textStyle(this.monthTxArr[i]);
            }
            this.isSelectMonth = true;
            event.target.backgroundColor = 0xd0cfcf;
            if (this.selectMonthValue != event.target.text) {
                this.selectMonthValue = event.target.text;
                this.dayDataArr = [];
                if (this.isSelectYear) {
                    if (this.selectMonthValue == "2") {
                        var curYear = Number(this.selectYearValue);
                        if ((((curYear % 4) == 0) && ((curYear % 100) != 0)) || ((curYear % 400) == 0)) {
                            for (var i = 1; i <= 29; i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                        else {
                            for (var i = 1; i <= 28; i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                    }
                    else {
                        if (Number(this.selectYearValue) == this.date.getFullYear() && Number(this.selectMonthValue) == this.date.getMonth() + 1) {
                            this.dayDataArr = [];
                            for (var i = 1; i <= this.date.getDate(); i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                        else {
                            for (var i = 1; i <= this.dayLen[Number(this.selectMonthValue) - 1]; i++) {
                                this.dayDataArr.push(i);
                            }
                        }
                    }
                }
                this.updateDay();
            }
        };
        /**
         * 日item点击事件
         * @param event
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.onTouchDayItem = function (event) {
            for (var i = 0; i < this.dayTxArr.length; i++) {
                this.textStyle(this.dayTxArr[i]);
            }
            this.isSelectDay = true;
            event.target.backgroundColor = 0xd0cfcf;
            this.selectDayValue = event.target.text;
        };
        Object.defineProperty(DateMenu.prototype, "textField", {
            /**
             *获取对应文本框
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            get: function () {
                return this._textField[0];
            },
            /**
             *设置需要赋值的文本框
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            set: function (textField) {
                this._textField[0] = textField;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *当年月日分开时调用，yTx:年文本，mTx:月文本，dTx:日文本
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.textFields = function (yTx, mTx, dTx) {
            this.isMulit = true;
            this._textField[0] = yTx;
            this._textField[1] = mTx;
            this._textField[2] = dTx;
        };
        /**
         *设置日期显示格式 如：yyyy-mm-dd 、yyyy年mm月mm日
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.format = function (value) {
            this._format = value;
        };
        Object.defineProperty(DateMenu.prototype, "title", {
            /**
             *获取title的值
             *
             * @version 0.0.1
             * @platform egret4.1.0
             */
            get: function () {
                return this._title;
            },
            /**
             *设置title
             *
             * @version 0.0.1
             * @platform egret4.1.0
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
         * @platform egret4.1.0
         */
        DateMenu.prototype.show = function () {
            this.mainContainer.visible = true;
            egret.Tween.get(this.mainContainer).to({ y: this.height - 400 }, 300, egret.Ease.backOut);
        };
        /**
         *隐藏
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.hide = function () {
            var _this = this;
            egret.Tween.get(this.mainContainer).to({ y: this.height }, 100).call(function () {
                _this.mainContainer.visible = false;
            }, this);
        };
        /**
         *取消
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.cancel = function () {
            this.hide();
        };
        /**
         *确定
         *
         * @version 0.0.1
         * @platform egret4.1.0
         */
        DateMenu.prototype.confirm = function () {
            if (this.isSelectYear && this.isSelectMonth && this.isSelectDay) {
                // this._textField.text = this.selectValue;、
                this.hide();
                if (this.isMulit) {
                    this._textField[0].text = this.selectYearValue;
                    this._textField[1].text = this.selectMonthValue;
                    this._textField[2].text = this.selectDayValue;
                }
                else {
                    if (this._format) {
                        var Y = this._format.substring(4, 5);
                        var M = this._format.substring(7, 8);
                        var D = this._format.substring(10, 11);
                        this._textField[0].text = this.selectYearValue + Y + this.selectMonthValue + M + this.selectDayValue + D;
                    }
                    else {
                        this._textField[0].text = this.selectYearValue + "" + this.selectMonthValue + "" + this.selectDayValue;
                    }
                }
            }
            else {
                wy.Toast.setContent("请选择");
            }
        };
        return DateMenu;
    }(egret.DisplayObjectContainer));
    wy.DateMenu = DateMenu;
    __reflect(DateMenu.prototype, "wy.DateMenu");
})(wy || (wy = {}));
//# sourceMappingURL=DateMenu.js.map