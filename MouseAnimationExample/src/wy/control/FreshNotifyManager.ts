module wy {
    /**
     *
     * 观察模式管理类，可注册任意事件，事件可在wy.FreshType定义
     *
     * @version 0.0.1
	 * @platform egret3.0.2
     */
    export class FreshNotifyManager {
        public constructor() {
        }

        private static instance: FreshNotifyManager;
        public static getInstance(): FreshNotifyManager {
            if (this.instance == null || this.instance == undefined) {
                this.instance = new FreshNotifyManager;
            }
            return this.instance;
        }

        private regis: Object = new Object;
        private freshStrs: Array<string> = [];

        /**
         * 添加观察函数
         * @param func 观察回调函数
         * @param freshStr 观察事件
         * @param thisObj func里的this对象
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public subscribeFunc(func: Function, freshStr: string, thisObj?: any): void {
            if (!this.regis[freshStr]) {
                this.regis[freshStr] = [];
            }
            var index = this.freshStrs.indexOf(freshStr);
            if (index < 0) {
                this.freshStrs.push(freshStr);
            }
            this.regis[freshStr].push({ "func": func, "this": thisObj });
        }

        /**
         * 取消观察函数
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public unsubscribeFunc(func: Function, freshStr: string, thisObj?: any): void {
            var arr = this.regis[freshStr];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].func == func && arr[i].this == thisObj) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        /**
         * 通知订阅的观察函数
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public notify(freshStr: string, ...args): void {
            var arr: Array<any>;
            var i: number;
            var j: number;
            for (i = 0; i < this.freshStrs.length; i++) {
                if (freshStr == this.freshStrs[i]) {
                    arr = this.regis[this.freshStrs[i]];
                    for (j = 0; j < arr.length; j++) {
                        if (arr[j].func instanceof Function) {
                            if (arr[j].this) {
                                var self = arr[j].this;
                                var func = arr[j].func;
                                func.apply(self, args);
                            } else {
                                arr[j].func(args);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * 添加观察函数
     * @param func 观察回调函数
     * @param freshStr 观察事件
     * @param thisObj func里的this对象
     * @version 0.0.1
	 * @platform egret3.0.2
     */
    export function on(func: Function, freshStr: string, thisObj?: any): void {
        FreshNotifyManager.getInstance().subscribeFunc(func, freshStr, thisObj);
    }

    /**
     * 取消观察函数
     * @version 0.0.1
	 * @platform egret3.0.2
     */
    export function off(func: Function, freshStr: string, thisObj?: any): void {
        FreshNotifyManager.getInstance().unsubscribeFunc(func, freshStr, thisObj);
    }

    /**
     * 通知订阅的观察函数
     * @version 0.0.1
	 * @platform egret3.0.2
     */
    export function notify(freshStr: string, ...args): void {
        FreshNotifyManager.getInstance().notify(freshStr,...args);
    }
}
