var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     *
     * 观察模式管理类，可注册任意事件，事件可在wy.FreshType定义
     *
     * @version 0.0.1
     * @platform egret3.0.2
     */
    var FreshNotifyManager = (function () {
        function FreshNotifyManager() {
            this.regis = new Object;
            this.freshStrs = [];
        }
        FreshNotifyManager.getInstance = function () {
            if (this.instance == null || this.instance == undefined) {
                this.instance = new FreshNotifyManager;
            }
            return this.instance;
        };
        /**
         * 添加观察函数
         * @param func 观察回调函数
         * @param freshStr 观察事件
         * @param thisObj func里的this对象
         * @version 0.0.1
         * @platform egret3.0.2
         */
        FreshNotifyManager.prototype.subscribeFunc = function (func, freshStr, thisObj) {
            if (!this.regis[freshStr]) {
                this.regis[freshStr] = [];
            }
            var index = this.freshStrs.indexOf(freshStr);
            if (index < 0) {
                this.freshStrs.push(freshStr);
            }
            this.regis[freshStr].push({ "func": func, "this": thisObj });
        };
        /**
         * 取消观察函数
         * @version 0.0.1
         * @platform egret3.0.2
         */
        FreshNotifyManager.prototype.unsubscribeFunc = function (func, freshStr, thisObj) {
            var arr = this.regis[freshStr];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].func == func && arr[i].this == thisObj) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * 通知订阅的观察函数
         * @version 0.0.1
         * @platform egret3.0.2
         */
        FreshNotifyManager.prototype.notify = function (freshStr) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var arr;
            var i;
            var j;
            for (i = 0; i < this.freshStrs.length; i++) {
                if (freshStr == this.freshStrs[i]) {
                    arr = this.regis[this.freshStrs[i]];
                    for (j = 0; j < arr.length; j++) {
                        if (arr[j].func instanceof Function) {
                            if (arr[j].this) {
                                var self = arr[j].this;
                                var func = arr[j].func;
                                func.apply(self, args);
                            }
                            else {
                                arr[j].func(args);
                            }
                        }
                    }
                }
            }
        };
        return FreshNotifyManager;
    }());
    wy.FreshNotifyManager = FreshNotifyManager;
    __reflect(FreshNotifyManager.prototype, "wy.FreshNotifyManager");
    /**
     * 添加观察函数
     * @param func 观察回调函数
     * @param freshStr 观察事件
     * @param thisObj func里的this对象
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function on(func, freshStr, thisObj) {
        FreshNotifyManager.getInstance().subscribeFunc(func, freshStr, thisObj);
    }
    wy.on = on;
    /**
     * 取消观察函数
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function off(func, freshStr, thisObj) {
        FreshNotifyManager.getInstance().unsubscribeFunc(func, freshStr, thisObj);
    }
    wy.off = off;
    /**
     * 通知订阅的观察函数
     * @version 0.0.1
     * @platform egret3.0.2
     */
    function notify(freshStr) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = FreshNotifyManager.getInstance()).notify.apply(_a, [freshStr].concat(args));
        var _a;
    }
    wy.notify = notify;
})(wy || (wy = {}));
//# sourceMappingURL=FreshNotifyManager.js.map