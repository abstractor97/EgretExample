/**
 * Json格式骨骼
 */
class BoneJson extends egret.DisplayObjectContainer{
	public armatureDisplay:dragonBones.EgretArmatureDisplay;

	public constructor() {
		super();
		let factory = dragonBones.EgretFactory.factory;
		let dragonbonesData = RES.getRes("NewDragon_ske_json");
		let textureData = RES.getRes("NewDragon_tex_json");
		let texture = RES.getRes("NewDragon_tex2_png");
		factory.parseDragonBonesData(dragonbonesData);
		factory.parseTextureAtlasData(textureData, texture);


		this.armatureDisplay = factory.buildArmatureDisplay("armatureName");
		this.armatureDisplay.animation.play("stand", 0);
        this.addChild(this.armatureDisplay);
	}

	public destoryMe(){
		this.armatureDisplay.animation.stop();
		this.armatureDisplay.animation.reset();
		this.armatureDisplay.dispose();
		this.armatureDisplay = null;
		this.parent && this.parent.removeChild(this);
	}
}