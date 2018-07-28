/**
 * 主页场景
 * @author chenkai
 * @since 2017/6/14
 */
class HomeScene extends eui.Component{
	private popupMenu:UIPopupMenu;
	private msgLabel:eui.Label;

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}	

	public childrenCreated(){

		this.popupMenu.setListSkin("ListItemSkin");
		this.popupMenu.addItem("A");
		this.popupMenu.addItem("B");
		this.popupMenu.addItem("C");
		this.popupMenu.addEventListener(egret.TouchEvent.CHANGE, this.onChange, this);
	}

	private onChange(e:egret.TouchEvent){
		var selectedIndex = e.data.selectedIndex;
		var itemValue = e.data.itemValue;

		this.msgLabel.text = "选中第" + selectedIndex + "项, 值:" + itemValue;
	}
}

