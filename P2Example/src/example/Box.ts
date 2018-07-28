/**
 * 创建一个方块，自由落体
 * 
 * 1. 世界，矩形，地板的使用
 * 
 * @author chenkai
 * @since 2017/6/23
 */
class Box extends egret.Sprite{
	private world:p2.World;
	private boxBody:p2.Body;
	private planeBody:p2.Body;
	private ball:egret.Sprite;
	private plane:egret.Sprite;

	public constructor() {
		super();

		//创建world
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;
		this.world.gravity = [0,10];

		//创建box
		var box:p2.Box = new p2.Box({width:50, height:50});
		this.boxBody = new p2.Body({mass:1, angularVelocity:1, position:[100,100]});
		this.boxBody.addShape(box);
		this.world.addBody(this.boxBody);
		this.ball = this.createBox();
		this.boxBody.displays = [this.ball];
		this.addChild(this.ball);

		//创建plane  Plane shape class. The plane is facing in the Y direction.
		var plane:p2.Plane = new p2.Plane();
		this.planeBody = new p2.Body({position:[GameConst.stage.stageWidth/2, GameConst.stage.stageHeight - 100]});
		this.planeBody.angle =Math.PI;
		this.planeBody.addShape(plane);
		this.world.addBody(this.planeBody);
		this.plane = this.createPlane();
		this.planeBody.displays = [this.plane];

		//每帧更新
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		//更新物理世界
		this.world.step(60/1000);

		var len:number = this.world.bodies.length;
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            var display: egret.DisplayObject = body.displays[0];
            display.x = body.position[0];                      //同步刚体和egret显示对象的位置和旋转角度
            display.y = body.position[1];
            display.rotation = body.angle  * 180 / Math.PI;
        }

	}

	private createBox(){
		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.beginFill(0xff0000);
		sp.graphics.drawRect(0,0,50,50);
		sp.graphics.endFill();
		sp.anchorOffsetX = sp.width/2;
		sp.anchorOffsetY = sp.height/2;
		return sp;
	}

	private createPlane(){
		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.lineStyle(10, 0x00ff00);
		sp.graphics.moveTo(0, 0);
		sp.graphics.lineTo(GameConst.stage.stageWidth,0);
		sp.anchorOffsetX = sp.width/2;
		sp.anchorOffsetY = sp.height/2;
		this.addChild(sp);
		return sp;
	}
}