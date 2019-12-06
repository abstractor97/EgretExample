module wy {
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
    export class ScrollerList extends BaseSprite {
        constructor() {
            super();
            this.init();
        }
        /**
         * 显示列表 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _list: List;
        /**
         * 滑动窗口 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _scroller: egret.ScrollView;
        /**
         * 滑动列表容器 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _container: egret.DisplayObjectContainer;
        /**
         * 列表宽度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _width: number;
        /**
         * 列表高度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private _height: number;
        /**
         * 列表初始化 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        private init():void {
            this._container = new egret.DisplayObjectContainer;
            this._scroller = new egret.ScrollView(this._container);
            this.addChild(this._scroller);
            this._list = new List;

            this._container.addChild(this._list);
        }
        /**
         * 设置垂直滑动位置 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set scrollTop(value:number) {
            this._scroller.scrollTop = value;
        }
        /**
         * 设置水平滑动位置 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set scrollLeft(value:number) {
            this._scroller.scrollLeft = value;
        }

        /**
         * 设置垂直滚动模式 on off auto 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set verticalScrollPolicy(value:string) {
            this._scroller.verticalScrollPolicy = value;
        }
        /**
         * 设置水平滚动模式 on off auto 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set horizontalScrollPolicy(value:string) {
            this._scroller.horizontalScrollPolicy = value;
        }
        /**
         * 设置列表回弹 true false 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set bounces(value:boolean) {
            this._scroller.bounces = value;
        }
        /**
         * 设置列表渲染器 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set itemRenderer(value:any) {
            this._list.itemRenderer = value;
        }
        /**
         * 设置滚动窗口宽度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set width(value:number) {
            this._width = value;
            this._scroller.width = this._width;
        }
        /**
         * 获取滚动窗口宽度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public get width(): number {
            return this._width;
        }
        /**
         * 设置滚动窗口高度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set height(value:number) {
            this._height = value;
            this._scroller.height = this._height;
        }
        /**
         * 获取滚动窗口高度 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public get height(): number {
            return this._height;
        }
        /**
         * 获取列表数据
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set dataProvider(data:any[]) {
            this._list.dataProvider = data;
        }
        /**
         * 更新显示列表 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public updateDisplayList(): void {
            this._list.updateDisplayList();
        }
        /**
         * 设置列表横竖模式 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public set layout(value:string) {
            this._list.layout = value;
        }
        /**
         * 获取列表数据 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public get dataProvider(): any[] {
            return this._list.dataProvider;
        }

        /**
         * 更新指定子item 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public updateItem(itemIndex: number, itemData: any):void {
            this._list.updateItem(itemIndex, itemData);
        }
        /**
         * 添加子item 
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public addItem(itemData: any):void {
            this._list.addItem(itemData);
        }
        /**
         * 显示 即开启点击事件监听
         * 监听List.ITEM_CLICK 事件即可
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public show() :void{
            this._list.show();
        }
        /**
         * 隐藏 即关闭点击事件监听
         * 
         * @version 0.0.3
         * @platform egret3.0.3
         * */
        public hide():void {
            this._list.hide();
        }

    }
}