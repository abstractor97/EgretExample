/**
 * 射线
 * @author chenkai
 * @since 2017/6/27
 */
class RaycastingD extends egret.Sprite{
	public debugDraw:p2DebugDraw;
	public world:p2.World;

	public result:p2.RaycastResult = new p2.RaycastResult();
    public hitPoint = p2.vec2.create();

	public boxBody:p2.Body;
	public circleBody:p2.Body;
	public planeBody:p2.Body;
	public capsuleBody:p2.Body;
	public convexBody:p2.Body;

	public rayClosest:p2.Ray;
	public rayAll:p2.Ray;
	public rayAny:p2.Ray;

	public rayClosestSp:egret.Sprite = new egret.Sprite();

	public constructor() {
		super();

		//创建测试
		this.debugDraw = new p2DebugDraw();
		this.world = this.debugDraw.world;
		this.addChild(this.debugDraw);

		//创建射线
		this.rayClosest = new p2.Ray({
			mode: p2.Ray.CLOSEST,    //这光线投射模式将通过所有的交叉点和只返回最接近的一个
			from:[300,300],
			to:[100,100]
		});

		//创建box
		this.boxBody = this.debugDraw.createRect(200,100);
		this.boxBody.mass = 0;
		this.boxBody.position = [100,200];
		this.boxBody.angularVelocity = 1;   //角速度
		this.boxBody.angularDamping = 0;    //角阻尼

		//创建circle
        this.circleBody = this.debugDraw.createCircle(50);
		this.circleBody.mass = 0;
		this.circleBody.position = [100,400];
		this.circleBody.angularVelocity = 1;
		this.circleBody.angularDamping = 0;

		//创建capsule 胶囊
        this.capsuleBody = this.debugDraw.createCapsule(10, 100);
		this.capsuleBody.mass = 0;
		this.capsuleBody.position = [200,500];
		this.capsuleBody.angularVelocity = 1;
		this.capsuleBody.angularDamping = 0;

		//创建地板
        this.planeBody = this.debugDraw.createPlane();
		this.planeBody.position = [300,0];
		this.planeBody.angle = Math.PI/3;

        //创建Convex 凸面
		this.convexBody = this.debugDraw.createConvex();
		this.convexBody.mass = 0;
		this.convexBody.position = [350,500];
		this.convexBody.angularVelocity = 1;
		this.convexBody.angularDamping = 0;

		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(){
		this.drawRays();
	}

	//绘制射线
	private drawRays(){
		//获取射线碰撞结果
		var result = new p2.RaycastResult();
        this.world.raycast(result, this.rayClosest);
		//绘制射线
		this.rayClosestSp.graphics.clear();
		this.rayClosestSp.graphics.lineStyle(2,0x00ff00);
		this.rayClosestSp.graphics.moveTo(this.rayClosest.from[0], this.rayClosest.from[1]);
		this.rayClosestSp.graphics.lineTo(this.rayClosest.to[0], this.rayClosest.to[1]);
		this.addChild(this.rayClosestSp);
		//在射线碰撞坐标位置绘制一个圆形
		result.getHitPoint(this.hitPoint, this.rayClosest);  //hitPoint 碰撞点
        if(result.hasHit()){
		  this.rayClosestSp.graphics.beginFill(0x00ff00, 0.5);
          this.rayClosestSp.graphics.drawArc(this.hitPoint[0],this.hitPoint[1],10,0,2*Math.PI);
		  this.rayClosestSp.graphics.endFill();
        }
		//绘制射线碰撞位置的法线
		this.rayClosestSp.graphics.moveTo(this.hitPoint[0], this.hitPoint[1]); 
		this.rayClosestSp.graphics.lineTo(this.hitPoint[0] + result.normal[0]*100, this.hitPoint[1] + result.normal[1]*100);  //result.normal 世界空间中命中的法线
	}
}