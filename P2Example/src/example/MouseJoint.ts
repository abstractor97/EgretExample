/**
 * 鼠标拖拽物体移动
 * 
 * 1. 刚体约束的使用 
 * 2. 原理是向两个刚体添加约束点。一个是拖拽的刚体，一个不可见的刚体。好比躯干+手臂，在躯干和手臂之间，增加一个骨骼点。
 * 3. 鼠标触摸移动时，移动不可见的刚体，这时可见的刚体由于约束，会跟随不可见刚体移动并旋转。旋转点 = 触摸点 = 两刚体约束点。
 * 
 * @author chenkai
 * @since  2017/6/23
 */
class MouseJoint extends egret.Sprite{
	private debugDraw: p2DebugDraw;
	private mouseBody:p2.Body;
	private boxBody:p2.Body;
	private mouseConstraint;

	public constructor() {
		super();

		//测试模块
		this.debugDraw = new p2DebugDraw(); 
		this.addChild(this.debugDraw);

		//创建矩形
		this.boxBody = this.debugDraw.createRect(200,100);
		this.boxBody.position = [300,0];

		//创建地板
		var plane = this.debugDraw.createPlane();

		//创建鼠标body
		this.mouseBody = new p2.Body();
		this.debugDraw.world.addBody(this.mouseBody);

		//监听触摸
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	//触摸开始，在触摸矩形的位置，添加矩形和一个不可见刚体的约束
	private onTouchBegin(e:egret.TouchEvent){
		console.log("begin");
		var position = [e.stageX, e.stageY];
		var hitBodies = this.debugDraw.world.hitTest(position, [this.boxBody],1);     //测试世界点是否重叠物体
		console.log("触摸坐标:",e.stageX, e.stageY, "重叠物体数量:", hitBodies.length);
		if(hitBodies.length){
			this.mouseBody.position[0] = position[0];
			this.mouseBody.position[1] = position[1];
			this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody, this.boxBody, {   //在给定的偏移点上连接两个物体，让它们在这一点上相对旋转
				worldPivot: position,    //世界坐标系支点
				collideConnected:false   //连接物体是否碰撞
			});
			this.debugDraw.world.addConstraint(this.mouseConstraint);   //添加约束
		  }
	}	

	//触摸移动，移动不可见刚体，利用约束，让矩形跟随移动和旋转
	private onTouchMove(e:egret.TouchEvent){
		var position = [e.stageX, e.stageY];
        this.mouseBody.position[0] = position[0];
        this.mouseBody.position[1] = position[1];
	}

	//触摸停止，移除约束，矩形自由下落
	private onTouchEnd(e:egret.TouchEvent){
		console.log("end");
		this.debugDraw.world.removeConstraint(this.mouseConstraint);
        this.mouseConstraint = null;
	}
}