module wy {
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
    export class List extends BaseSprite {

        /**
         * 垂直
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public static VERTICAL: string = "vertical";
        /**
         * 水平
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public static HORIZENTOL: string = "horizental";
        /**
         * 列表子item点击事件
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public static ITEM_CLICKED: string = "item_clicked";

        constructor() {
            super();
        }
        /**
         * 数据容器 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _dataProvider: any[];
        /**
         * 子item渲染类 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public itemRenderer: any;
        /**
         * 子item容器 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _itemRenderer: wy.IItemRenderer[];
        /**
         * 子item顶间距 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public top: number = 0;
        /**
         * 子item底间距 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public bottom: number = 0;
        /**
         * 子item左间距 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public left: number = 0;
        /**
         * 子item右间距 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public right: number = 0;
        /**
         * 列表列数 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public cols: number = 1;
        /**
         * 列表行数 
         * 
         * @version 0.0.3
         * @platform egret3.0.3*/
        public rows: number = 1;
        /**
         * 列表模式：vertical 竖形列表 horizontal 横性列表 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _layout: string = "vertical";
        /**
         * 背景防止滑动到空白区域无效 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private bgShape: egret.Shape;

        /**
         * 设置数据，自动更新  
         * 
         * @param value 新数据
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set dataProvider(value:any[]) {
            // this.removeChildren();
            if (this._itemRenderer) {
                var item: wy.BaseSprite;
                for (var i = 0; i < this._itemRenderer.length; ++i) {
                    item = this._itemRenderer[i];
                    item.hide();
                    if (item.parent) item.parent.removeChild(item);
                }
            }
            this._itemRenderer = [];
            this._dataProvider = value;
            var obj;
            var render: wy.IItemRenderer;
            if (!this.itemRenderer) {
                throw Error("没有设置渲染器");
            } else {
                for (var i = 0; i < this._dataProvider.length; ++i) {
                    obj = this._dataProvider[i];
                    render = <wy.IItemRenderer>new this.itemRenderer();
                    render.show();
                    render.itemIndex = i;
                    render.data = obj;
                    render.selected = false;
                    this.addChild(render);
                    this._itemRenderer.push(render);
                }
                this.updateDisplayList();
            }
        }
        /**
         * 设置显示模式 
         * 
         * @param value 显示模式
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set layout(value:string) {
            if (this._layout == value) return;
            this._layout = value;
            this.updateDisplayList();
        }
        /**
         * 更新列表 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         */
        public updateDisplayList(): void {
            if (!this._itemRenderer || this._itemRenderer.length <= 0) {
                return;
            }

            var index = 0;
            if (this._layout == List.VERTICAL) {//如果是垂直模式
                var item_w = this._itemRenderer[0].width;
                var item_h = this._itemRenderer[0].height;
                while (index < this._itemRenderer.length) {
                    for (var i = 0; i < this.cols && index < this._itemRenderer.length; ++i) {
                        this._itemRenderer[index].x = i * (item_w + this.left + this.right) + this.left + this._itemRenderer[index].anchorOffsetX;
                        this._itemRenderer[index].y = Math.floor(index / this.cols) * (item_h + this.top + this.bottom) + this.top + this._itemRenderer[index].anchorOffsetY;
                        ++index;
                    }
                }
            } else if (this._layout == List.HORIZENTOL) {//如果是水平模式
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

        }
        /**
         * 获取列表数据 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public get dataProvider(): any[] {
            return this._dataProvider;
        }
        /**
         * 更新指定item 
         * 
         * @param itemIndex
         * @param itemData
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public updateItem(itemIndex: number, itemData: any):void {
            if (itemIndex < 0 || !itemData || !this._itemRenderer || this._itemRenderer.length <= 0 || this._itemRenderer.length <= itemIndex) {
                return;
            }
            this._itemRenderer[itemIndex].data = itemData;
            this.updateDisplayList();
        }
        /**
         * 添加子item 
         * 
         * @param itemData
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public addItem(itemData: any):void {
            if (!itemData || !this._itemRenderer || this._itemRenderer.length <= 0 || !this.itemRenderer) {
                return;
            }
            var render: wy.IItemRenderer = <wy.IItemRenderer>new this.itemRenderer();
            render.show();
            render.data = itemData;
            render.itemIndex = this._itemRenderer.length;
            render.selected = false;
            this.addChild(render);
            this._itemRenderer.push(render);
            this.updateDisplayList();
        }
        /**
         * 获取list节点 
         * 
         * @param index
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public getItemByIndex(index: number): wy.IItemRenderer {
            if (index < this._itemRenderer.length) {
                return this._itemRenderer[index];
            }
            return null;
        }

        /**
         * 显示 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public show():void {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            for (var index = 0; index < this._itemRenderer.length; index++) {
                this._itemRenderer[index].show();
            }
        }
        /**
         * 隐藏 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public hide():void {
            this.touchEnabled = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            for (var index = 0; index < this._itemRenderer.length; index++) {
                this._itemRenderer[index].hide();
            }
        }
        /**
         * 点击事件 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private onTouchTap(e: egret.TouchEvent):void {
            if (!this._itemRenderer || this._itemRenderer.length <= 0) {
                return;
            }
            var item_w = this._itemRenderer[0].width;
            var item_h = this._itemRenderer[0].height;
            var col = Math.floor(e.localX / (item_w + this.left + this.right));
            var row = Math.floor(e.localY / (item_h + this.top + this.bottom));
            col++; row++;
            // console.log("col="+col);
            // console.log("row="+row);
            var clickIndex;
            if (this._layout == List.VERTICAL) {
                row = row - 1 >= 0 ? row - 1 : 0;
                // this._itemRenderer[row*2+col].selected = true;  
                // console.log("clicked v index="+(row*this.cols+col));
                clickIndex = row * this.cols + col;
            } else if (this._layout == List.HORIZENTOL) {
                col = col - 1 >= 0 ? col - 1 : 0;
                // console.log("clicked h index"+(col*this.rows+row));
                clickIndex = col * this.rows + row;
            }
            clickIndex--;
            // console.log("clickIndex="+clickIndex);
            // console.log(this._itemRenderer[clickIndex]);
            this.dispatchEventWith(List.ITEM_CLICKED, null, this._itemRenderer[clickIndex]);
        }
    }
}