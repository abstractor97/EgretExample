/**
 * 主页场景
 */
class HomeScene extends eui.Component{

	public euiLabel:eui.Label; 


	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		this.removeChild(this.euiLabel);

		var htmlText:HTMLText = new HTMLText();
		htmlText.setValue("123456");
		htmlText.setPosition(0, this.euiLabel.y, this.euiLabel.width, this.euiLabel.height);
	}

}