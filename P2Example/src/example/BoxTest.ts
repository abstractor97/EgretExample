/**
 * Box测试
 * @author chenkai
 * @since 2017/6/30
 */
class BoxTest extends egret.Sprite{
	private world:p2.World;   //世界

	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(){
		//创建物理世界
		this.world = new p2.World();   
		this.world.gravity = [0,-500];

		//创建地面
		var planeSp:egret.Sprite = new egret.Sprite();
		for(var i=0;i<20;i++){
			var bm:egret.Bitmap = new egret.Bitmap(RES.getRes("tile0_png"));
			bm.x = i*60;
			bm.y = 0;
			planeSp.addChild(bm);
		}

		var planeShape:p2.Plane = new p2.Plane();
		var planeBody:p2.Body = new p2.Body();
		planeBody.position = [0,60];
		planeBody.addShape(planeShape);
		planeBody.displays = [planeSp];
		this.world.addBody(planeBody);
		this.addChild(planeSp);

		//创建Box
		var player:p2.Box = new p2.Box({width:95, height:104});
		var playerBody = new p2.Body({mass:1,position:[300,300]});
		playerBody.addShape(player);
		this.world.addBody(playerBody);

		var playerBm:egret.Bitmap = new egret.Bitmap(RES.getRes("player0_png"));
		playerBm.anchorOffsetX = playerBm.width/2;
		playerBm.anchorOffsetY = playerBm.height/2;
		playerBody.displays = [playerBm];
		this.addChild(playerBm);
		
		//每帧更新
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		this.world.step(16/1000);

		var len:number = this.world.bodies.length;
		for(var i: number = 0;i < len;i++) {
			var body: p2.Body = this.world.bodies[i];
			var display: egret.DisplayObject = body.displays[0];
			 display.x = body.position[0];
			 display.y = this.stage.stageHeight - body.position[1];
			 display.rotation = 360 - body.angle * 180 / Math.PI;
		}
	}
}