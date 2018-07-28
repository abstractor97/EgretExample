/**
 * 例子场景
 * @author chenkai
 * @since 2017/6/30
 */
class ExampleScene extends eui.Component{
	public constructor() {
		super();
		this.skinName = "ExampleSceneSkin";
	}

	public childrenCreated(){
		this.addChild(new BoxTest());
	}
}