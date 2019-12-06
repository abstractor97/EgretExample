
module wy {
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

	export class MenuUtils extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.width = 640;
			this.height = 1036;
			this.createOk();
		}
		/**
		 *主容器
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private mainContainer: egret.DisplayObjectContainer;
		/**
		 *顶部条shape
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private topShape: egret.Shape;
		/**
		 *底部shape
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private bottomShape: egret.Shape;
		/**
		 *顶部栏标题文本框
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private titleText: egret.TextField;
		/**
		 *标题值
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private _title: string;
		/**
		 *确定按钮
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private confirmBtn: egret.TextField;
		/**
		 *取消按钮
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private cancelBtn: egret.TextField;
		/**
		 *菜单列表容器
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private listContainer: egret.DisplayObjectContainer;
		/**
		 *菜单滑动控件
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private menuScroll: egret.ScrollView;
		/**
		 *菜单文本框数组
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private txArr: egret.TextField[];
		/**
		 *菜单列表值数组
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private listValueArr: string[];
		/**
		 *列表文本框
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private tx: egret.TextField;
		/**
		 *是否选择 默认：false
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private isSelect: boolean = false;
		/**
		 *选择的值
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private selectValue: string;
		/**
		 *传入的文本框
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private _textField: egret.TextField;

		private createOk(): void {
			this.mainContainer = new egret.DisplayObjectContainer();
			this.addChild(this.mainContainer);
			this.mainContainer.height = 400;
			this.mainContainer.y = this.height;

			this.txArr = [];
			this.listValueArr = [];

			this.createTopBar();
			this.createBottomArea();
			this.initScrollView();

		}

		/**
		 *创建顶部栏
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private createTopBar() {
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
		}

		/**
		 *创建底部区域
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private createBottomArea() {
			this.bottomShape = new egret.Shape();
			this.bottomShape.graphics.beginFill(0xd2d3d8, 1);
			this.bottomShape.graphics.drawRect(0, 0, 640, 340);
			this.bottomShape.graphics.endFill();
			this.bottomShape.y = this.topShape.y + this.topShape.height;
			this.mainContainer.addChild(this.bottomShape);

		}

		/**
		 *初始化滑动区域
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private initScrollView() {
			this.listContainer = new egret.DisplayObjectContainer();
			this.menuScroll = new egret.ScrollView();
			this.mainContainer.addChild(this.menuScroll);
			this.menuScroll.width = this.width;
			this.menuScroll.height = this.mainContainer.height - this.confirmBtn.height;
			this.menuScroll.y = this.bottomShape.y;
			this.menuScroll.setContent(this.listContainer);
			this.menuScroll.horizontalScrollPolicy = "off";
		}

		/**
		 *菜单列表文本样式
		 * @param tx 菜单文本
		 * 
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private textStyle(tx: egret.TextField) {
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
		}

		/**
		 * 设置列表文本数据
		 * @param data  数据数组
		 * 
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public setData(data: any[]) {
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
			} else {
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

		}

		/**
		 * 列表item点击事件
		 * @param event
		 * 
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		private onTouchItem(event: egret.TouchEvent): void {

			for (var i = 0; i < this.txArr.length; i++) {
				this.textStyle(this.txArr[i]);
			}
			console.log("tap " + event.target.text);
			this.isSelect = true;
			event.target.backgroundColor = 0xd0cfcf;
			this.selectValue = event.target.text;
		}

		/**
		 *设置需要赋值的文本框
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public set textField(textField: egret.TextField) {
			this._textField = textField;
		}

		/**
		 *获取对应文本框
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public get textField() {
			return this._textField;
		}

		/**
		 *设置title
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public set title(title: string) {
			this._title = title;
			this.titleText.text = title;
		}

		/**
		 *获取title的值
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public get title() {
			return this._title;
		}

		/**
		 *显示
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public show() {
			egret.Tween.get(this.mainContainer).to({ y: this.height - 400 }, 300, egret.Ease.backOut);
		}

		/**
		 *隐藏
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public hide() {
			egret.Tween.get(this.mainContainer).to({ y: this.height }, 100);
		}

		/**
		 *取消
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public cancel() {
			this.hide();
		}

		/**
		 *确定
		 *
		 * @version 0.0.1
	     * @platform egret3.0.2 
		 */
		public confirm() {
			if (this.isSelect) {
				this._textField.text = this.selectValue;
			}
			this.hide();
		}
	}
}



