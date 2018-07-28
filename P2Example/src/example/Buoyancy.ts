/**
 * 浮力
 * @author chenkai
 * @since 2017/6/28
 */
class Buoyancy extends egret.Sprite{
	private debugDraw:p2DebugDraw;
	private world:p2.World;

	private planeBody:p2.Body;
	private circleBody:p2.Body;
	private boxBody:p2.Body;

	public constructor() {
		super();

		//测试
		this.debugDraw = new p2DebugDraw();
		this.world = this.debugDraw.world;
		this.addChild(this.debugDraw);

		//创建水平面
		this.planeBody = this.debugDraw.createPlane();
		this.planeBody.collisionResponse = false;   //触发碰撞事件，但是不会发生碰撞
		this.planeBody.position = [0,500];

		//创建圆形
		this.circleBody = this.debugDraw.createCircle(50);
		this.circleBody.mass = 1;
		this.circleBody.position = [100,100];

		//创建矩形
		this.boxBody = this.debugDraw.createRect(50,100);
		this.boxBody.mass = 1;
		this.boxBody.position = [300,100];
		this.boxBody.angularVelocity = 0.5;
		
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		this.applyAABBBuoyancyForces(this.boxBody, this.planeBody.position, this.k, this.c);
		//this.applyAABBBuoyancyForces(this.circleBody, this.planeBody.position, this.k, this.c);
	}

	private shapePosition = [0,0];     //shape的世界坐标点
	private centerOfBouyancy = [0,0];  //浮力中心
	private liftForce = [0,0];         //向上举起的力
	private viscousForce = [0,0];      //粘性力
	private shapeAngle = 0;            //shape的世界角度
	private k = 100;                   //水淹没量，计算浮力的系数
	private c = 0.8;                   //粘性力系数
	private v = [0,0];                 //物体某一点的速度
	private aabb = new p2.AABB();      //轴对齐包围盒也被称作矩形盒

	//浮力计算
	private applyAABBBuoyancyForces(body:p2.Body, planePosition, k, c){
		for (var i = 0; i < body.shapes.length; i++) {
			var shape = body.shapes[i];

			//获取shape的世界坐标和角度
			body.vectorToWorldFrame(this.shapePosition, shape.position);         //将本地坐标点转换为世界坐标点   (世界坐标点， 本地坐标点)
			p2.vec2.add(this.shapePosition, this.shapePosition, body.position);  //向量相加？
			this.shapeAngle = shape.angle + body.angle;                          //?

			//根据shape世界坐标和角度，获取aabb(矩形包围盒)
			shape.computeAABB(this.aabb, this.shapePosition, this.shapeAngle);

			//console.log(this.aabb.upperBound, this.aabb.lowerBound);  
			//由于egret和p2的坐标系不一样，导致边界不一样，upperBound(右下点) = [325, 150.72000122070312]  lowerBound(左上点) = [275, 50.720001220703125]

			//获取物体在水里的面积和浮力中心点
			var areaUnderWater;   //在水里的面积
			//全部下沉在水里
			if(this.aabb.lowerBound[1] > planePosition[1]){  
				// Fully submerged
				p2.vec2.copy(this.centerOfBouyancy,this.shapePosition);
				areaUnderWater = shape.area;   //area = width*height = 50*100 = 5000
			//部分在水里
			} else if(this.aabb.upperBound[1] > planePosition[1]){  
				// Partially submerged
				var width = this.aabb.upperBound[0] - this.aabb.lowerBound[0];     //物体宽度
				var height = this.aabb.upperBound[1] - this.planeBody.position[1]; //物体在水下的高度
				areaUnderWater = width * height;
				p2.vec2.set(this.centerOfBouyancy, this.aabb.upperBound[0] - width / 2, this.aabb.upperBound[1] - height / 2);
			} else {
				continue;
			}

			//根据侵入水里的面积，计算浮力
			p2.vec2.subtract(this.liftForce, planePosition, this.centerOfBouyancy);
			p2.vec2.scale(this.liftForce, this.liftForce, areaUnderWater * 0.005);  //areaUnderWater*k  由于k系数太大，这里自调
			this.liftForce[0] = 0;

			//计算浮力发生的中心点(中心点世界坐标，转成本地坐标)
			p2.vec2.subtract(this.centerOfBouyancy,this.centerOfBouyancy,body.position);

			//获取粘性力，将中心点的力按系数c=0.8衰减 (有掉入水中并弹起，逐渐稳定的过程)
			body.getVelocityAtPoint(this.v, this.centerOfBouyancy);   //获取物体某一点速度
			p2.vec2.scale(this.viscousForce, this.v, -c);

			//添加粘性力和浮力
			body.applyForce(this.viscousForce, this.centerOfBouyancy);
			body.applyForce(this.liftForce, this.centerOfBouyancy);
		}
	}
}