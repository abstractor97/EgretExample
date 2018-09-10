class scrollMove extends eui.Component{
	private moveScroll:eui.Scroller;
	private moveGroup:eui.Group;
	private moveListDate:any  = [];
	private needUp: boolean = false;
	private needDown: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/demoSkins/scrollSK.exml";
		this.addEventListener(egret.Event.COMPLETE, this.addToStage, this);
	}

	protected createChilden(){
		super.createChildren();
	}
	private addData(dataLists):void{
		this.moveGroup.removeChildren();
		for(let i = 0;i<dataLists.length;i++){
			this.moveGroup.addChild(dataLists[i]);
		}
		this.moveScroll.addEventListener(eui.UIEvent.CHANGE, this.moveHandler, this);
		this.moveScroll.addEventListener(eui.UIEvent.CHANGE_END, this.outHandler, this);
	}
	private addToStage():void{
		let dataArrylen = (this.moveListDate.length>0)?this.moveListDate.length:10;
		for(let i = 0;i<dataArrylen;i++){
			let dataList:eui.Group = new eui.Group();
			dataList.width = 600;
			dataList.height = 86;
			dataList.x = 0;
			dataList.y = (i*110);

			//list背景
			let itemImage = new eui.Image();
			itemImage.source = "sss_png";
			itemImage.x = 0;
			itemImage.y = 0;
			itemImage.width = 600;
			itemImage.height = 86;
			itemImage.fillMode = egret.BitmapFillMode.SCALE;//图片填充方式
			itemImage.touchEnabled = true;
			dataList.addChild(itemImage);
			this.moveListDate.push(dataList);
		}
		this.addData(this.moveListDate);
	}
	private moveHandler(evt: eui.UIEvent): void {
		//检测是否超过滚动底部
		// console.log(this.moveScroll.viewport.scrollV);
		// console.log(this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height);
		console.log(this.moveScroll.viewport.scrollV > this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height);
		if(this.moveScroll.viewport.scrollV > (this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height)+40){
			this.needUp = true;
		}
    }
	private outHandler(evt:eui.UIEvent):void{
		//停止滚动时判断needUp是否为true
		console.log(this.needUp);
		if(this.needUp){
			this.needUp = false;
			this.addToStage();
		}
	}
}