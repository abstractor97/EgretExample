module wy {

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
    export class ItemRenderer extends BaseSprite implements IItemRenderer {
        constructor() {
            super();
        }

        /**
         * 数据
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        protected _data: any;

        /**
         * 当前item是否被选择了
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public selected: boolean;
        /**
         * 当前item索引
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public itemIndex: number;

        /**
         * 设置当前item数据
         * 
         * @param value 新数据
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public set data(value:any) {
            this._data = value;
            this.dataChanged();
        }

        /**
         * 获取当前item数据
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public get data(): any {
            return this._data;
        }

        /**
         * 数据更新了 触发
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public dataChanged(): void {

        }
        /**
         * 清理事件
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public clear(): void {

        }
    }
}