/**
 * 插值
 * 1. 不知插值是干什么的...
 * 
 * 
 * @author chenkai
 * @since 2017/6/23
 */
class Interpolation extends egret.Sprite{
	private world:p2.World;
	private ballBody:p2.Body;
	private ball2Body:p2.Body;
	private planeBody:p2.Body;

	public constructor() {
		super();

		//创建世界
		this.world = new p2.World();
		this.world.gravity = [0,10];

		//创建圆
		var ball:p2.Circle = new p2.Circle({radius:100});
		this.ballBody = new p2.Body({mass:1,position:[400,100]});
		this.ballBody.addShape(ball);
		this.world.addBody(this.ballBody);
		var ballSp = this.createCircle(0xff0000, 100);
		this.ballBody.displays = [ballSp];
		this.addChild(ballSp);

		var ball2:p2.Circle = new p2.Circle({radius:100});
		this.ball2Body = new p2.Body({mass:1,position:[200,100]});
		this.ball2Body.addShape(ball2);
		this.world.addBody(this.ball2Body);
		var ballSp2 = this.createCircle(0x00ff00, 100);
		this.ball2Body.displays = [ballSp2];
		this.addChild(ballSp2);

		//创建地板
		var plane:p2.Plane = new p2.Plane();
		this.planeBody = new p2.Body();
		this.planeBody.addShape(plane);
		this.world.addBody(this.planeBody);
		this.planeBody.position = [0, GameConst.stage.stageHeight];
		this.planeBody.angle = Math.PI;

		//监听
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		this.world.step(60/1000);

		var display = this.ballBody.displays[0];
		display.x = this.ballBody.position[0];
		display.y = this.ballBody.position[1];
		display.rotation = this.ballBody.angle * 180 / Math.PI;

		var display = this.ball2Body.displays[0];
		display.x = this.ball2Body.interpolatedPosition[0];   //插值始终是0，不知如何使用
		display.y = this.ball2Body.interpolatedPosition[1];
		display.rotation = this.ball2Body.angle * 180 / Math.PI;
	}

	private createCircle(color, radius){
		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.beginFill(color);
		sp.graphics.drawCircle(0,0,100);   //circle中心点在几何中心，rectangle中心点在左上角.所以circle不需要设置锚点
		sp.graphics.endFill();
		return sp;
	}
}