/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/17
 */
class HomeScene extends eui.Component{
	private euiCode:eui.Image;  //exml二维码图片

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		//透明图片test.png，测试用，用来观察img覆盖效果
		var htmlCode = new QRCode("resource/assets/test.png");
		
		//实际二维码图片
		//var htmlCode = new QRCode("resource/assets/code.jpg");

		htmlCode.setPosition(this.euiCode.x, this.euiCode.y, this.euiCode.width, this.euiCode.height);
		htmlCode.showHtmlCode();
	}
}