/**
 * 主页场景
 * @author chenkai
 * @since 2017/8/1
 */
class HomeScene extends eui.Component{
	private msgLabel:eui.Label;
	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		this.msgLabel.text = "openid:" + egret.getOption("openid") + "\n" + "nickname:" + decodeURI(egret.getOption("nickname"));
	}
}