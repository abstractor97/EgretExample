/**
 *
 *
 *
 *自动生成类
 *
 *请不要直接在此编码  重新生成会覆盖此类的
 *
 *如非必要请勿改动
 *
 *
 */
class LoadingUIUI extends wy.BaseSprite {
	constructor() {
		super();
		this.width = 640;
		this.height = 1036;
		this.createChildren();
	}

	public textField:egret.TextField;

	protected createChildren():void {
		this.textField = new egret.TextField();
		this.textField.text = "100%";
		this.textField.x = 245;
		this.textField.y = 498;
		this.textField.width = 150;
		this.textField.height = 40;
		this.textField.textAlign = "center";
		this.textField.textColor = 0xff0000;
		this.textField.size = 20;
		this.textField.fontFamily = "微软雅黑";
		this.addChild(this.textField);



		//动画
	}
}