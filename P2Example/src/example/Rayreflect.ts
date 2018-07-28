/**
 * 射线反射
 * 1. p2.vec2.reflect 反射
 * @author chenkai
 * @since 2017/6/28
 */
class Rayreflect extends egret.Sprite{
	private debugDraw:p2DebugDraw;
	private world:p2.World;

	private boxBody:p2.Body;
	private lineBody:p2.Body;
	private ray:p2.Ray;

	public constructor() {
		super();

		//测试
		this.debugDraw = new p2DebugDraw();
		this.world = this.debugDraw.world;
		this.addChild(this.debugDraw);

		//创建一个方块
		this.boxBody = this.debugDraw.createRect(100,50);
		this.boxBody.mass = 0;
		this.boxBody.angularVelocity = 1;
		this.boxBody.angularDamping = 0;
		this.boxBody.position = [300,300];

		//创建一条线
		this.lineBody = this.debugDraw.createLine(400);
		this.lineBody.mass = 0;
		this.lineBody.angle = Math.PI/3;
		this.lineBody.position = [400,400];

		//绘制射线
		this.ray = new p2.Ray();
		this.ray.mode = p2.Ray.CLOSEST;
		this.ray.from = [10,10];
		this.ray.to = [500,600];
		this.ray.update();       //改变from和to后需要update，否则修改不生效

		//每帧更新
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		this.drawRay();
	}

	private raySp:egret.Sprite = new egret.Sprite();
	private result:p2.RaycastResult = new p2.RaycastResult();
	private hitPoint = p2.vec2.create();
	//绘制射线
	private drawRay(){
		//重置射线位置
		this.ray.from = [10,10];
		this.ray.to = [500,600];
		this.ray.update();
		this.raySp.graphics.clear();
		this.raySp.graphics.lineStyle(1, 0x00ff00);
		
		this.addChild(this.raySp);

		//循环获取碰撞结果，直到没有碰撞
		var hit = 0;
		while(this.world.raycast(this.result, this.ray) && (hit++)<10){      //检测射线是否碰撞到世界中的body
			this.result.getHitPoint(this.hitPoint, this.ray);  //获取碰撞点坐标

			//绘制射线起始点到碰撞点，并将起始点移动到碰撞点
			this.raySp.graphics.moveTo(this.ray.from[0], this.ray.from[1]);
			this.raySp.graphics.lineTo(this.hitPoint[0], this.hitPoint[1]);
			p2.vec2.copy(this.ray.from, this.hitPoint);
			this.ray.update();
		
			if(this.result.hasHit()){                          //如果有碰撞点，则在该点反射
				p2.vec2.reflect(this.ray.direction, this.ray.direction, this.result.normal);   //沿法线反射向量 (需要反射向量，反射结果向量，法线)

				//重置射线
				this.ray.from[0] += this.ray.direction[0] * 0.001;
				this.ray.from[1] += this.ray.direction[1] * 0.001;
				this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
				this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;

				this.ray.update();
				
				this.result.reset();


			}
			
		}
		this.raySp.graphics.moveTo(this.ray.from[0], this.ray.from[1]);
		this.raySp.graphics.lineTo(this.ray.to[0], this.ray.to[1]);
		
	}

}