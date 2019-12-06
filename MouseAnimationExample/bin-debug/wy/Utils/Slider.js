var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 页面滑动控制器
     *
     * @example
     * <pre>
     *     wy.Slider.register(this).nextleft(LoadingUI).nextright(LoadingUI).nextup(LoadingUI);
     * </pre>
     * @version 0.0.5
     * @platform egret3.0.2
     */
    var Slider = (function () {
        function Slider() {
            this.prep = new egret.Point();
            this.threshold = 50;
            this.funcObjs = [];
            for (var i = 0; i < 4; ++i) {
                this.funcObjs.push({ func: null, thisObj: null });
            }
        }
        /**
         * 初始化
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.init = function () {
            this.sliders = [];
            this.pages = [];
        };
        /**
         * 注册为滑动页面
         *
         * @param page 需要支持滑动的页面
         *
         * @return Slider
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.register = function (page) {
            if (!this.pages || !this.sliders) {
                console.info('请先使用wy.Slider.init();初始化');
                return;
            }
            var index = this.pages.indexOf(page);
            var slider;
            if (index < 0) {
                slider = new Slider();
                this.sliders.push(slider);
                slider.bind(page);
                this.pages.push(page);
            }
            else {
                slider = this.sliders[index];
            }
            return slider;
        };
        /**
         * 取消滑动支持
         *
         * @param page 需要取消滑动支持的页面
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.unregister = function (page) {
            var index = this.pages.indexOf(page);
            if (index >= 0) {
                this.pages.splice(index, 1);
                if (this.sliders.length > index) {
                    this.sliders[index].unbind(page);
                    this.sliders.splice(index, 1);
                }
            }
        };
        /**
         * 滑动控制器绑定页面
         *
         * @param page 滑动控制器要绑定的页面
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.bind = function (page) {
            page.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouchbegin, this);
            page.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.ontouchmove, this);
            page.addEventListener(egret.TouchEvent.TOUCH_END, this.ontouchend, this);
            page.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchend, this);
        };
        /**
         * 取消绑定并清除数据
         * @param page
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.unbind = function (page) {
            page.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouchbegin, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.ontouchmove, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_END, this.ontouchend, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchend, this);
            for (var i = 0; i < 4; ++i) {
                if (this.funcObjs[i]) {
                    this.funcObjs[i].func = null;
                    this.funcObjs[i].thisObj = null;
                }
                this.funcObjs[i] = null;
            }
            this.funcObjs = null;
            this.prep = null;
        };
        /**
         * 往右滑动成功时回调函数设置，例如往右滑 左页面 出现
         *
         * @param func 往右滑成功时回调函数
         * @param thisObj 回调函数this引用
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.left = function (func, thisObj) {
            this.funcObjs[0].func = func;
            this.funcObjs[0].thisObj = thisObj;
            return this;
        };
        /**
         * 往左滑动成功时回调函数设置，例如往左滑 右页面 出现
         *
         * @param func 往左滑成功时回调函数
         * @param thisObj 回调函数this引用
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.right = function (func, thisObj) {
            this.funcObjs[1].func = func;
            this.funcObjs[1].thisObj = thisObj;
            return this;
        };
        /**
         * 往下滑动成功时回调函数设置，例如往下滑 上页面 出现
         *
         * @param func 往下滑成功时回调函数
         * @param thisObj 回调函数this引用
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.up = function (func, thisObj) {
            this.funcObjs[2].func = func;
            this.funcObjs[2].thisObj = thisObj;
            return this;
        };
        /**
         * 往上滑动成功时回调函数设置，例如往上滑 下页面 出现
         *
         * @param func 往上滑成功时回调函数
         * @param thisObj 回调函数this引用
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.down = function (func, thisObj) {
            this.funcObjs[3].func = func;
            this.funcObjs[3].thisObj = thisObj;
            return this;
        };
        /**
         * 右滑成功直接跳转左页面
         *
         * @param page 右滑成功跳转的左页面
         * @param layer 左页面出现的层级
         * @param data? 传递到左页面的数据
         * @param grag? 如果支持灰色蒙层，则其效果，效果为是否显示灰色蒙层
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.nextleft = function (page, layer, data, grag) {
            var _this = this;
            if (layer === void 0) { layer = 0; }
            return this.left(function () {
                _this.next(page, layer, wy.PopType.LEFTIN);
            }, this);
        };
        /**
         * 左滑成功直接跳转右页面
         *
         * @param page 左滑成功跳转的右页面
         * @param layer 右页面出现的层级
         * @param data? 传递到右页面的数据
         * @param grag? 如果支持灰色蒙层，则其效果，效果为是否显示灰色蒙层
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.nextright = function (page, layer, data, grag) {
            var _this = this;
            if (layer === void 0) { layer = 0; }
            return this.right(function () {
                _this.next(page, layer, wy.PopType.RIGHTIN);
            }, this);
        };
        /**
         * 下滑成功直接跳转上页面
         *
         * @param page 下滑成功跳转的上页面
         * @param layer 上页面出现的层级
         * @param data? 传递到上页面的数据
         * @param grag? 如果支持灰色蒙层，则其效果，效果为是否显示灰色蒙层
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.nextup = function (page, layer, data, grag) {
            var _this = this;
            if (layer === void 0) { layer = 0; }
            return this.up(function () {
                _this.next(page, layer, wy.PopType.TOPIN);
            }, this);
        };
        /**
         * 上滑成功直接跳转下页面
         *
         * @param page 上滑成功跳转的下页面
         * @param layer 下页面出现的层级
         * @param data? 传递到下页面的数据
         * @param grag? 如果支持灰色蒙层，则其效果，效果为是否显示灰色蒙层
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.nextdown = function (page, layer, data, grag) {
            var _this = this;
            if (layer === void 0) { layer = 0; }
            return this.down(function () {
                _this.next(page, layer, wy.PopType.BOTTOMIN);
            }, this);
        };
        /**
         * 执行页面跳转
         *
         * @param page 跳转的页面
         * @param layer 页面所处层级
         * @param effect? 切换页面的效果
         * @param data? 传递到跳转页面的数据
         * @param effectdata? 切换效果的数据
         * @param grag? 是否显示灰色蒙层
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.next = function (page, layer, effect, data, effectdata, grag) {
            if (layer === void 0) { layer = 0; }
            switch (layer) {
                case 0:
                    wy.changeScene(page, effect, effectdata);
                    break;
                case 1:
                    wy.changeView(page, effect, effectdata, grag);
                    break;
                case 2:
                    wy.openPopUpView(page, effect, effectdata, grag);
                    break;
                case 3:
                    break;
            }
        };
        Object.defineProperty(Slider.prototype, "threshold", {
            // public get threshold(): number {
            //     return this._threshold;
            // }
            /**
             * 设置滑动成功的阈值
             *
             * @version 0.0.5
             * @platform egret3.0.2
             */
            set: function (value) {
                this.thresholdX = value;
                this.thresholdY = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 开始按下
         * @param e
         */
        Slider.prototype.ontouchbegin = function (e) {
            this.prep.x = e.stageX;
            this.prep.y = e.stageY;
        };
        /**
         * 按住移动
         * @param e
         */
        Slider.prototype.ontouchmove = function (e) {
            // this.prep.x = e.stageX;
            // this.prep.y = e.stageY;
        };
        /**
         * 松手
         * @param e
         */
        Slider.prototype.ontouchend = function (e) {
            this.judge(e);
        };
        /**
         * 执行滑动成功判定
         * @param e
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.judge = function (e) {
            if (!this.prep)
                return;
            var disx = e.stageX - this.prep.x;
            var disy = e.stageY - this.prep.y;
            var flagX = disx > 0 ? false : true;
            var flagY = disy > 0 ? false : true;
            if (flagX) {
                if (Math.abs(disx) > this.thresholdX) {
                    this.callFunc(1);
                }
            }
            else {
                if (Math.abs(disx) > this.thresholdX) {
                    this.callFunc(0);
                }
            }
            if (flagY) {
                if (Math.abs(disy) > this.thresholdY) {
                    this.callFunc(3);
                }
            }
            else {
                if (Math.abs(disy) > this.thresholdY) {
                    this.callFunc(2);
                }
            }
        };
        /**
         * 滑动成功执行回调
         *
         * @param index 滑动成功的方向
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        Slider.prototype.callFunc = function (index) {
            if (this.funcObjs && this.funcObjs.length > index && this.funcObjs[index]) {
                if (this.funcObjs[index].func) {
                    if (this.funcObjs[index].thisObj) {
                        this.funcObjs[index].func.call(this.funcObjs[index].thisObj);
                    }
                    else {
                        this.funcObjs[index].func();
                    }
                }
            }
        };
        return Slider;
    }());
    wy.Slider = Slider;
    __reflect(Slider.prototype, "wy.Slider");
})(wy || (wy = {}));
//# sourceMappingURL=Slider.js.map