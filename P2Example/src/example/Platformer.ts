/**
 * 控制人物在斜面平台行走
 * 1. collisionGroup和collisionMask碰撞组的用法
 * 
 * @author chenkai
 * @since 2017/6/27
 */
class Platformer extends egret.Sprite{
	private debugDraw:p2DebugDraw;
	private world:p2.World;

	private SCENERY_GROUP = 0x01;    //碰撞检测组
    private PLAYER_GROUP = 0x02;

	private characterBody:p2.Body;   //人物
	

	public constructor() {
		super();

		//创建测试
		this.debugDraw = new p2DebugDraw();
		this.world = this.debugDraw.world;
		this.addChild(this.debugDraw);

		//增加静止的矩形和圆形
		this.addStaticCircle(100, 500, 100, 200);
        this.addStaticBox(400, 500, -Math.PI / 4, 100, 300);
        this.addStaticBox(600, 600, 0, 300, 100);
        

		//增加人物
		this.characterBody = this.debugDraw.createRect(50,100);
		this.characterBody.mass = 1;
		this.characterBody.position = [500, 300];
		this.characterBody.fixedRotation = true;
		this.characterBody.damping = 0;
		var characterShape = this.characterBody.shapes[0];
		characterShape.collisionGroup = this.PLAYER_GROUP;    //collisionGroup隶属于的碰撞组bit mask。 作用：相同碰撞组可以碰撞，不同碰撞组不能碰撞
		characterShape.collisionMask = this.SCENERY_GROUP;    //collisionMask指定可以与其他哪些碰撞组碰撞。 这里可以和场景碰撞，但是不能和PLAYER碰撞。即使collisionGroup都是PLAYER。
		//characterShape.collisionMask = this.PLAYER_GROUP | this.SCENERY_GROUP;  //可以和SCENERY和PLAYER两个碰撞组碰撞。
		
		//增加另一个人物
		var characterBody2 = this.debugDraw.createRect(50,100);
		characterBody2.mass = 1;
		characterBody2.position = [600, 300];
		characterBody2.fixedRotation = true;
		characterBody2.damping = 0;
		var characterShape2 = characterBody2.shapes[0];
		characterShape2.collisionGroup = this.PLAYER_GROUP;
		characterShape2.collisionMask = this.SCENERY_GROUP;
		
		console.log("角色1:", characterShape.collisionGroup, characterShape.collisionMask);
		console.log("角色2:", characterShape2.collisionGroup, characterShape2.collisionMask);

		//鼠标事件
		var keyListener:KeyListener = new KeyListener();
		keyListener.addEventListener(KeyListener.EVENT_KEY_DOWN, this.onKeyDown, this);
	}

	private onKeyDown(e:egret.Event){
		var keyCode = e.data;
		switch(keyCode){
			case KeyListener.Left:
				this.characterBody.velocity[0] = -100;
			break;
			case KeyListener.Right:
				this.characterBody.velocity[0] = 100;
			break;
		}
	}


	//增加静止的矩形
	 private addStaticBox(x, y, angle, width, height){
		var boxBody = this.debugDraw.createRect(width, height);
		boxBody.position = [x,y];
		boxBody.angle = angle;
		boxBody.mass = 0;
		boxBody.type = p2.Body.KINEMATIC;

		var shape:p2.Shape = boxBody.shapes[0];
		shape.collisionGroup = this.SCENERY_GROUP;
		shape.collisionMask = this.PLAYER_GROUP;
		
		console.log("矩形:", shape.collisionGroup, shape.collisionMask);
      }

	  //增加静止的圆形
	  private addStaticCircle(x, y, angle, radius){
        var boxBody = this.debugDraw.createCircle(radius);
		boxBody.position = [x,y];
		boxBody.angle = angle;
		boxBody.mass = 0;
		boxBody.type = p2.Body.KINEMATIC;

		var shape:p2.Shape = boxBody.shapes[0];
		shape.collisionGroup = this.SCENERY_GROUP;
		shape.collisionMask = this.PLAYER_GROUP;
      }
}