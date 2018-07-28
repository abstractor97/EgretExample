/**
 * 二进制
 */
class BoneBin extends egret.DisplayObjectContainer{
	public armatureDisplay:dragonBones.EgretArmatureDisplay;

	public constructor() {
		super();

		let factory = dragonBones.EgretFactory.factory;
		factory.parseDragonBonesData(RES.getRes("NewDragon_ske_bin"));
		factory.parseTextureAtlasData(RES.getRes("NewDragon_tex2_json"), RES.getRes("NewDragon_tex3_png"));
		
		this.armatureDisplay = factory.buildArmatureDisplay("armatureName");
		this.armatureDisplay.animation.play("stand",0);

		this.addChild(this.armatureDisplay);
	}

	public destoryMe(){
		this.parent && this.parent.removeChild(this);
		this.armatureDisplay.animation.reset();
		this.armatureDisplay.dispose();

		let factory = dragonBones.EgretFactory.factory;
		factory.clear(true);
	}
}