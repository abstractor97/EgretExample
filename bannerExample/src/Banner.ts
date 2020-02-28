//热门大厅上面 广告组件
class Banner extends eui.Component {

	private radioGroup: eui.Group;
	private bannerScroller: eui.Scroller;
	private radioList: Array<eui.RadioButton> = [];
	/**
   * 数据显示列表
   */
	private bannerList: eui.List;
    /**
     * 列表绑定数据
     */
	private _dataProvider: eui.ArrayCollection;

	//当前滚动的 下标
	private _currentIndex: number = 0;

	private scrollDeriction: any = "right";

	private SCROLL_RIGHT = "right";
	private SCROLL_LEFT = "left"

	private _timeHandler: any = null;
	private isLoad: boolean = false;

	protected init(): void {
		egret.ImageLoader.crossOrigin = "anonymous";
		this.skinName = panels.BannerSkin;
	}

	createChildren() {
		super.createChildren();
		this.isLoad = false;
		this.bannerScroller.verticalScrollBar = null;
		this.bannerScroller.horizontalScrollBar = null;
		this.bannerList.dataProvider = this._dataProvider = new eui.ArrayCollection();
		this.bannerList.itemRenderer = IRBannerItem;

		this.addListener();

	}
	private onComplete(): void {
		console.log("onComplete");
	}

	addListener(): void {
		this.bannerScroller.addEventListener(egret.Event.CHANGE, this.onListRefresh, this)
		this.bannerScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollComplete, this)
		this.bannerList.addEventListener(egret.Event.CHANGE, this.onSelectItem, this);
		 
	}


	removeListener(): void {
		this.bannerList.removeEventListener(egret.Event.CHANGE, this.onSelectItem, this);
		 

	}
	refreshData() {
	 
	    if(!this.isLoad){
			this.clearTimeHandler(); 
			this.initData()
			this.isLoad = true; 
		 } 

	}
	private onScrollComplete(event: egret.Event): void {
		//滑动结束直接设置 下一一个
		let len = this._dataProvider.source.length;
		if (this.scrollDeriction == this.SCROLL_RIGHT) {
			this._currentIndex++;
			if (this._currentIndex >= len) {
				this._currentIndex = 0;
			}

		} else {
			this._currentIndex--;
			if (this._currentIndex <= 0) {
				this._currentIndex = 0;
			}
		}

		this.bannerScroller.viewport.scrollH = this._currentIndex * 750;
		//滑动结束回复定时器
		this.playAnimation();
		var radio = this.getRadio(this._currentIndex);

		if (radio) {
			radio.selected = true;
		}

	}
	private onListRefresh(event: egret.Event): void {
		//限制每次只滑动一屏的距离
		var scrollH = this.bannerScroller.viewport.scrollH;

		//区分左右滑动

		var currentH = this._currentIndex * 750;
		let len = this._dataProvider.source.length;

		if (this._currentIndex == 0) {//只能右滑动
			this.scrollDeriction = this.SCROLL_RIGHT
		} else if (this._currentIndex == len) {
			this.scrollDeriction = this.SCROLL_LEFT
		} else {
			if (scrollH > currentH) {
				this.scrollDeriction = this.SCROLL_RIGHT
			} else {
				this.scrollDeriction = this.SCROLL_LEFT
			}
		}
		if (this.scrollDeriction == this.SCROLL_RIGHT) {

			var nextIndex = this._currentIndex + 1;
			var scroolEndH = (nextIndex) * 750
			if (scrollH >= scroolEndH) {
				this.bannerScroller.viewport.scrollH = scroolEndH;
			}

		} else {
			nextIndex = this._currentIndex - 1;
			var scroolEndH = (nextIndex) * 750
			if (scrollH <= scroolEndH) {
				this.bannerScroller.viewport.scrollH = scroolEndH;
			}
		}
		var radio = this.getRadio(nextIndex);

		if (radio) {
			radio.selected = true;
		}
		//滑动时清空 定时
		this.clearTimeHandler();


	}
	/** 
	 * 点击列表Item
	*/
	private onSelectItem(event: egret.Event): void {
		let data: any = this.bannerList.selectedItem;

		egret.callLater(() => {
			this.bannerList.selectedIndex = -1;
		}, this);

	 

	}

	/**
	 * 初始化点击事件 zhu
	 */
	private _enableEvent(bEnable): void {
		let func = "addEventListener";
		if (!bEnable) {
			func = "removeEventListener";
		}

	}
	/**
		 * 初始化默认数据 zhu
		 */
	private _initDefault(): void {

	}
	/**
	 * 点击头像 zhu
	 */
	private _onTouchHead(): void {

	}
	private playAnimation() {
		let len = this._dataProvider.source.length;
		this._timeHandler = setInterval(() => {
			this._currentIndex++;
			if (this._currentIndex == len) {
				this._currentIndex = 0;
			}

			egret.Tween.get(this.bannerScroller.viewport).to({ scrollH: this._currentIndex * 750, ease: egret.Ease.quadOut }, 200);
			var radio = this.getRadio(this._currentIndex);
			if (radio) {
				radio.selected = true;
			}

		}, 5000)
	}
	//设置滚动效果
	private setAnimation() {
		this._currentIndex = 0;

		this.playAnimation();
	}
	private getRadio(index: number) {
		if (this.radioList.length > 0) {
			return this.radioList[index];
		} else {
			return null;
		}
	}

	initData() {

		let exml = `
		<e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" height="8" width="21">
				<e:Image source="point_gray_png" horizontalCenter="0" verticalCenter="0" width="100%" height="100%" alpha="0"/>
				<e:Image source="point_gray_png" source.down="point_white_png" horizontalCenter="0" verticalCenter="0"/>
		</e:Skin>`

		let hots = [{index:1},{index:2},{index:3},{index:4},{index:5},{index:6},{index:7},{index:8}]
		this._dataProvider.source = hots;

		this.bannerList.width = hots.length * 750;
		for (var i = 0; i < hots.length; i++) {
			var rdb: eui.RadioButton = new eui.RadioButton();
			rdb.skinName = exml;
			rdb.selected = true;//默认选项
			rdb.width = 21;
			rdb.height = 8;
			rdb.groupName = "radioGrp";
			rdb.name = "radio" + i;
			this.radioGroup.addChild(rdb);
			this.radioList.push(rdb)
		}

		this.setAnimation();
	}
	private clearTimeHandler() {
		if (this._timeHandler) {

			 clearInterval(this._timeHandler)
			this._timeHandler = null;
		}
	}
	private cleartBanner() {
		this.radioGroup.removeChildren();
		this._dataProvider.source = [];
		this.radioList = [];
	}
	public show() { 
	 
		  console.log("----banner show-------")
 
		  this.initData()
	      
	}


}
class IRBannerItem extends eui.ItemRenderer {
	private lbl:eui.Label;
	createChildren(): void {
		super.createChildren();
		// this["item"]["addClickListener"](this._onClickIdx, this);
	}

	private _onClickIdx(): void {
		let data = this.data;

	}

	protected dataChanged(): void {
		super.dataChanged();
		let data = this.data;
		this.lbl.text = data.index;
		 
	}
}