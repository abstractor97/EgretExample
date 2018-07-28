/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/20
 * 
 * 实现可自行滚动的聊天文本框
 */
class HomeScene extends eui.Component{
	private chatLabel:eui.Label;          //聊天记录
	private inputLabel:eui.EditableText;  //输入文本
	private okBtn:eui.Rect;               //确定
	private chatScroller:eui.Scroller;    //聊天记录滚动容器

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
	}

	private onOkTouch(){
		//显示聊天记录
		if(this.chatLabel.text != ""){
			this.chatLabel.text +=  "\n" + this.inputLabel.text;
		}else{
			this.chatLabel.text +=  this.inputLabel.text;
		}
		
		//文本高度大于滚动容器高度时，将视口置于文本最后一行
		if(this.chatLabel.height > this.chatScroller.height){
			this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
		}

		//清空输入文本
		this.inputLabel.text = "";
	}
}