/**
 * 测试
 * @author
 * @date 2017/11/14
 */
class HomeScene extends eui.Component{
	private bone1:eui.Button;
	private bone10:eui.Button;
	private bone100:eui.Button;
	private clearBone:eui.Button;
	private boneList = [];
	private boneLabel:eui.Label;
	private boneGroup:eui.Group;

	private mc1:eui.Button;
	private mc10:eui.Button;
	private mc100:eui.Button;
	private clearMC:eui.Button;
	private mcList = [];
	private mcLabel:eui.Label;

	private fast1:eui.Button;
	private fast10:eui.Button;
	private fast100:eui.Button;
	private fastLabel:eui.Label;
	private clearFast:eui.Button;
	private fastList = [];

	private bin1:eui.Button;
	private bin10:eui.Button;
	private bin100:eui.Button;
	private binLabel:eui.Label;
	private clearBin:eui.Button;
	private binList = [];

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	public childrenCreated(){
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boneTouch, this);
	}


	//创建骨骼
	private boneTouch(e:egret.TouchEvent){
		switch(e.target){
			case this.bone1:
				this.createBone(1);
			break;
			case this.bone10:	
				this.createBone(10);
			break;
			case this.clearBone:
				this.clearBones();
			break;
			case this.mc1:
				this.createMC(1);
			break;
			case this.mc10:
				this.createMC(10);
			break;
			case this.clearMC:
				this.clearMCs();
			break;
			case this.bone100:
				this.createBone(100);
			break;
			case this.mc100:
				this.createMC(100);
			break;
			case this.fast1:
				this.createFast(1);
			break;
			case this.fast10:
				this.createFast(10);
			break;
			case this.fast100:
				this.createFast(100);
			break;
			case this.clearFast:
				this.clearFasts();
			break;
			case this.bin1:
				this.createBin(1);
			break;
			case this.bin10:
				this.createBin(10);
			break;
			case this.bin100:
				this.createBin(100);
			break;
			case this.clearBin:
				this.clearBins();
			break;
		}
	}

	//创建一个骨骼
	private createBone(num:number){
		for(let i=0;i<num;i++){
			let db:BoneJson = new BoneJson();
			db.x = 200 + Math.random()*800;
			db.y = 300 + Math.random()*200;
			this.boneGroup.addChild(db);
			this.boneList.push(db);
		}
		this.boneLabel.text =  "骨骼数量:" + this.boneList.length;
	}

	//清理骨骼
	private clearBones(){
		let len = this.boneList.length;
		for(let i=0;i<len;i++){
			let bone:BoneJson = this.boneList[i];
			bone.destoryMe();
		}
		this.boneList.length = 0;
		this.boneLabel.text =  "骨骼数量:" + this.boneList.length;

		dragonBones.EgretFactory.factory.clear(true);
	}

	//创建一个MC
	private createMC(num:number){
		for(let i=0;i<num;i++){
			let mc:BoneMC = new BoneMC();
			mc.x = Math.random()*1000;
			mc.y = 500 + Math.random()*200;
			mc.play(-1);
			this.boneGroup.addChild(mc);
			this.mcList.push(mc);
		}
		this.mcLabel.text =  "动画数量:" + this.mcList.length;
	}

	//清理动画
	private clearMCs(){
		let len = this.mcList.length;
		for(let i=0;i<len;i++){
			let mc:BoneMC = this.mcList[i];
			mc.stop();
			mc.parent && mc.parent.removeChild(mc);
		}
		this.mcList.length = 0;
		this.mcLabel.text =  "动画数量:" + this.mcList.length;
	}

	//创建极速骨骼
	private createFast(num:number){
		for(let i=0;i<num;i++){
			let movie:BoneFast = new BoneFast();
			this.addChild(movie); // 添加 Movie 到显示列表
			movie.x = 100 + Math.random()*1000;
			movie.y = 300 + Math.random()*300;
			this.boneGroup.addChild(movie); // 添加 Movie 到显示列表
			this.fastList.push(movie);
		}
		this.fastLabel.text = "极速数量:" + this.fastList.length;
	}

	//清理极速
	private clearFasts(){
		let len = this.fastList.length;
		for(let i=0;i<len;i++){
			let fast:BoneFast = this.fastList[i];
			fast.destoryMe();
		}
		this.fastList.length = 0;
		this.fastLabel.text =  "动画数量:" + this.fastList.length;
	}

	//创建二进制骨骼
	private createBin(num:number){
		for(let i=0;i<num;i++){
			let bone:BoneBin = new BoneBin();
			this.addChild(bone); // 添加 Movie 到显示列表
			bone.x = 100 + Math.random()*1000;
			bone.y = 300 + Math.random()*300;
			this.boneGroup.addChild(bone); // 添加 Movie 到显示列表
			this.binList.push(bone);
		}
		this.binLabel.text = "二进数量:" + this.binList.length;
	}

	//清理二进制骨骼
	private clearBins(){
		let len = this.binList.length;
		for(let i=0;i<len;i++){
			let bone:BoneBin = this.binList[i];
			bone.destoryMe();
		}
		this.binList.length = 0;
		this.binLabel.text =  "动画数量:" + this.binList.length;
	}

}

