/**
 * 主页场景
 * @author chenkai
 * @since 2017/7/4
 */
class HomeScene extends eui.Component{
	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		GuideMask.getInstance().show(560, 900, 80, 100, this);
	}
}