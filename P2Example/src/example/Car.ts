/**
 * 汽车
 * @author chenkai
 * @since 2017/6/29
 * 
 * 1. RevoluteConstraint 约束使用，合体小车
 * 2. force和velocity区别
 */
class Car extends egret.Sprite{
	private debugDraw:p2DebugDraw;
	private world:p2.World;

	private planeBody:p2.Body;
	private circleBody:p2.Body;
	private carBody:p2.Body;
	private wheelBody1:p2.Body;
	private wheelBody2:p2.Body;

	private PLANE:number = 0x01;
	private CIRCLE:number = 0x02;
	private CAR:number = 0x03;

	public constructor() {
		super();

		//测试类
		this.debugDraw = new p2DebugDraw();
		this.world = this.debugDraw.world;
		this.addChild(this.debugDraw);

		//设置世界默认材料的摩擦，防止小车打滑
		this.world.defaultContactMaterial.friction = 100;

		//创建地面
		this.planeBody = this.debugDraw.createPlane();
		this.planeBody.position = [0,500];
		this.planeBody.mass = 0;

		//创建一个大圆
		this.circleBody = this.debugDraw.createCircle(200);
		this.circleBody.position = [700, 500];
		var circleShape:p2.Shape = this.circleBody.shapes[0];
		circleShape.collisionMask = this.CAR;

		//创建车身
		this.carBody = this.debugDraw.createRect(100,50);
		this.carBody.position = [100,100];
		this.carBody.mass = 1;
		var carShape:p2.Shape = this.carBody.shapes[0];
		
		//创建轮子
		this.wheelBody1 = this.debugDraw.createCircle(30);
		this.wheelBody2 = this.debugDraw.createCircle(30);
		this.wheelBody1.mass = 1;
		this.wheelBody2.mass = 1;
		this.wheelBody1.position = [this.carBody.position[0], this.carBody.position[1] + 35];
		this.wheelBody2.position = [this.carBody.position[0] + 100, this.carBody.position[1] + 35];

		//增加轮子和车身的转动约束
		var revoluteBack = new p2.RevoluteConstraint(this.carBody, this.wheelBody1, {
			localPivotA: [-50, 25],  //约束点相对于bodyA质量中心的位置   小车中心点[0,0]，左车轮在小车坐下位置，坐车轮约束点相对于小车中心点的距离是[-50,25]
			localPivotB: [0, 0],     //约束点相对于bodyB质量中心的位置
			collideConnected: false
		});
		var revoluteFront = new p2.RevoluteConstraint(this.carBody, this.wheelBody2, {
			localPivotA: [50, 25],
			localPivotB: [0, 0],      
			collideConnected: false
		});
		this.world.addConstraint(revoluteBack);
		this.world.addConstraint(revoluteFront);
		

		//???
		revoluteBack.motorEnabled = true;   //电机？？
		//revoluteBack.setMotorSpeed(10);   //报错  error: Cannot set property 'relativeVelocity' of undefined

		//键盘操作小车
		var keyListener:KeyListener = new KeyListener();
		keyListener.addEventListener(KeyListener.EVENT_KEY_DOWN, this.onKeyDown ,this);
		keyListener.addEventListener(KeyListener.EVENT_KEY_UP, this.onKeyUp ,this);
	}


	//键盘按下，小车移动
	private onKeyDown(e:egret.Event){
		var keyCode = e.data;
		switch(keyCode){
			case KeyListener.Right:
				// this.carBody.velocity[0] = 100;        //velocity速度，直接改变速度，恒定
				// this.wheelBody1.velocity[0] = 100;
				// this.wheelBody2.velocity[0] = 100;
				this.carBody.force[0] = 100;        //force，添加力，速度会从0逐渐加快
				this.wheelBody1.force[0] = 100;
				this.wheelBody2.force[0] = 100;
			break;
			case KeyListener.Left:
				// this.carBody.velocity[0] = -100;
				// this.wheelBody1.velocity[0] = -100;
				// this.wheelBody2.velocity[0] = -100;
				this.carBody.force[0] = -100;
				this.wheelBody1.force[0] = -100;
				this.wheelBody2.force[0] = -100;
			break;
		}
	}

	//键盘释放，小车停止移动
	private onKeyUp(e:egret.Event){
		var keyCode = e.data;
		switch(keyCode){
			case KeyListener.Right:
				// this.carBody.velocity[0] = 0;
				// this.wheelBody1.velocity[0] = 0;
				// this.wheelBody2.velocity[0] = 0;
				this.carBody.force[0] = 0;
				this.wheelBody1.force[0] = 0;
				this.wheelBody2.force[0] = 0;
			break;
			case KeyListener.Left:
				// this.carBody.velocity[0] = 0;
				// this.wheelBody1.velocity[0] = 0;
				// this.wheelBody2.velocity[0] = 0;
				this.carBody.force[0] = 0;
				this.wheelBody1.force[0] = 0;
				this.wheelBody2.force[0] = 0;
			break;
		}
	}
}