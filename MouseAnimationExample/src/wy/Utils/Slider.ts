module wy {
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
    export class Slider {
        /**
         * slider容器
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private static sliders: Slider[];
        /**
         * 注册页面
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private static pages: egret.DisplayObjectContainer[];

        /**
         * 初始化
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public static init(): void {
            this.sliders = [];
            this.pages = [];
        }

        /**
         * 注册为滑动页面
         * 
         * @param page 需要支持滑动的页面
         * 
         * @return Slider
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public static register(page: egret.DisplayObjectContainer): Slider {
            if (!this.pages || !this.sliders) {
                console.info('请先使用wy.Slider.init();初始化');
                return;
            }
            let index = this.pages.indexOf(page);
            let slider: Slider;
            if (index < 0) {
                slider = new Slider();
                this.sliders.push(slider);
                slider.bind(page);
                this.pages.push(page);
            } else {
                slider = this.sliders[index];
            }
            return slider;
        }
        /**
         * 取消滑动支持
         * 
         * @param page 需要取消滑动支持的页面
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public static unregister(page: egret.DisplayObjectContainer): void {
            let index = this.pages.indexOf(page);
            if (index >= 0) {
                this.pages.splice(index, 1);
                if (this.sliders.length > index) {
                    this.sliders[index].unbind(page);
                    this.sliders.splice(index, 1);
                }
            }
        }

        /**
         * 上下左右滑动成功时调用的函数集
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private funcObjs: any[];

        public constructor() {
            this.prep = new egret.Point();
            this.threshold = 50;
            this.funcObjs = [];
            for (let i = 0; i < 4; ++i) {
                this.funcObjs.push({ func: null, thisObj: null });
            }
        }

        /**
         * 滑动控制器绑定页面
         * 
         * @param page 滑动控制器要绑定的页面
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private bind(page: egret.DisplayObjectContainer): void {
            page.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouchbegin, this);
            page.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.ontouchmove, this);
            page.addEventListener(egret.TouchEvent.TOUCH_END, this.ontouchend, this);
            page.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchend, this);
        }
        /**
         * 取消绑定并清除数据
         * @param page
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private unbind(page: egret.DisplayObjectContainer): void {
            page.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouchbegin, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.ontouchmove, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_END, this.ontouchend, this);
            page.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchend, this);

            for (let i = 0; i < 4; ++i) {
                if (this.funcObjs[i]) {
                    this.funcObjs[i].func = null;
                    this.funcObjs[i].thisObj = null;
                }
                this.funcObjs[i] = null;
            }
            this.funcObjs = null;
            this.prep = null;
        }

        /**
         * 往右滑动成功时回调函数设置，例如往右滑 左页面 出现
         * 
         * @param func 往右滑成功时回调函数
         * @param thisObj 回调函数this引用
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public left(func: Function, thisObj: any): Slider {
            this.funcObjs[0].func = func;
            this.funcObjs[0].thisObj = thisObj;
            return this;
        }
        /**
         * 往左滑动成功时回调函数设置，例如往左滑 右页面 出现
         * 
         * @param func 往左滑成功时回调函数
         * @param thisObj 回调函数this引用
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public right(func: Function, thisObj: any): Slider {
            this.funcObjs[1].func = func;
            this.funcObjs[1].thisObj = thisObj;
            return this;
        }
        /**
         * 往下滑动成功时回调函数设置，例如往下滑 上页面 出现
         * 
         * @param func 往下滑成功时回调函数
         * @param thisObj 回调函数this引用
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public up(func: Function, thisObj: any): Slider {
            this.funcObjs[2].func = func;
            this.funcObjs[2].thisObj = thisObj;
            return this;
        }
        /**
         * 往上滑动成功时回调函数设置，例如往上滑 下页面 出现
         * 
         * @param func 往上滑成功时回调函数
         * @param thisObj 回调函数this引用
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public down(func: Function, thisObj: any): Slider {
            this.funcObjs[3].func = func;
            this.funcObjs[3].thisObj = thisObj;
            return this;
        }

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
        public nextleft(page: any, layer: number = 0, data?: any, grag?: boolean): Slider {
            return this.left(() => {
                this.next(page, layer, wy.PopType.LEFTIN);
            }, this);
        }
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
        public nextright(page: any, layer: number = 0, data?: any, grag?: boolean): Slider {
            return this.right(() => {
                this.next(page, layer, wy.PopType.RIGHTIN);
            }, this);
        }
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
        public nextup(page: any, layer: number = 0, data?: any, grag?: boolean): Slider {
            return this.up(() => {
                this.next(page, layer, wy.PopType.TOPIN);
            }, this);
        }
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
        public nextdown(page: any, layer: number = 0, data?: any, grag?: boolean): Slider {
            return this.down(() => {
                this.next(page, layer, wy.PopType.BOTTOMIN);
            }, this);
        }
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
        private next(page: any, layer: number = 0, effect?: string, data?: any, effectdata?: any, grag?: boolean): void {
            switch (layer) {
                case 0://场景层
                    wy.changeScene(page, effect, effectdata);
                    break;
                case 1://界面层
                    wy.changeView(page, effect, effectdata, grag);
                    break;
                case 2://弹出层
                    wy.openPopUpView(page, effect, effectdata, grag);
                    break;
                case 3://消息层,暂未用到

                    break;
            }
        }

        private prep: egret.Point;

        private _threshold: number;
        // public get threshold(): number {
        //     return this._threshold;
        // }
        /**
         * 设置滑动成功的阈值
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        public set threshold(value: number) {
            this.thresholdX = value;
            this.thresholdY = value;
        }
        private thresholdX: number;
        private thresholdY: number;

        /**
         * 开始按下
         * @param e
         */
        private ontouchbegin(e: egret.TouchEvent): void {
            this.prep.x = e.stageX;
            this.prep.y = e.stageY;
        }
        /**
         * 按住移动
         * @param e
         */
        private ontouchmove(e: egret.TouchEvent): void {
            // this.prep.x = e.stageX;
            // this.prep.y = e.stageY;
        }
        /**
         * 松手
         * @param e
         */
        private ontouchend(e: egret.TouchEvent): void {
            this.judge(e);
        }

        /**
         * 执行滑动成功判定
         * @param e
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private judge(e: egret.TouchEvent): void {
            if(!this.prep)return;
            let disx = e.stageX - this.prep.x;
            let disy = e.stageY - this.prep.y;
            let flagX = disx > 0 ? false : true;
            let flagY = disy > 0 ? false : true;

            if (flagX) {//向右滑
                if (Math.abs(disx) > this.thresholdX) {
                    this.callFunc(1);
                }
            } else {//向左滑
                if (Math.abs(disx) > this.thresholdX) {
                    this.callFunc(0);
                }
            }
            if (flagY) {//向下滑
                if (Math.abs(disy) > this.thresholdY) {
                    this.callFunc(3);
                }
            } else {//向上滑
                if (Math.abs(disy) > this.thresholdY) {
                    this.callFunc(2);
                }
            }
        }

        /**
         * 滑动成功执行回调
         * 
         * @param index 滑动成功的方向
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private callFunc(index: number): void {
            if (this.funcObjs && this.funcObjs.length > index && this.funcObjs[index]) {
                if (this.funcObjs[index].func) {
                    if (this.funcObjs[index].thisObj) {
                        this.funcObjs[index].func.call(this.funcObjs[index].thisObj);
                    } else {
                        this.funcObjs[index].func();
                    }
                }
            }
        }
    }
}