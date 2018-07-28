/**
 * 键盘操作矩形移动，和其他刚体碰撞
 * 1. ContactMaterial材料的使用
 * 2. preSolve预处理，穿透实现。
 * 3. beginContact碰撞检测
 * 
 * @author chenkai
 * @since 2017/6/26
 */
class Character extends egret.Sprite{
	private debugDraw: p2DebugDraw;   //测试类
	private world:p2.World;           //世界

	private planeBody:p2.Body;        //地板
	public characterBody:p2.Body;     //角色

	private groundMaterial:p2.Material;     //材料
    private characterMaterial:p2.Material;
    private boxMaterial:p2.Material;

	private platforms = [];          //平台列表
	private boxes = [];              //物体列表

	public buttons:any = {left:0, right:0, space:0};  //鼠标事件

	public constructor() {
		super();

		//创建测试类
		this.debugDraw = new p2DebugDraw();
		this.addChild(this.debugDraw);

		//设置世界
		this.world = this.debugDraw.world;
		this.world.defaultContactMaterial.friction = 0.1;
        this.world.setGlobalStiffness(1e5);
		
		//初始化材料，决定两种刚体类型间的力(摩擦力等)作用
		this.groundMaterial = new p2.Material(0);
		this.characterMaterial = new p2.Material(0);
		this.boxMaterial = new p2.Material(0);

		//创建角色矩形
		this.characterBody = this.debugDraw.createRect(50,100);
		this.characterBody.mass = 1;                 //质量
		this.characterBody.position = [800,500];     //位置
		this.characterBody.fixedRotation = true;     //固定旋转
		this.characterBody.damping = 0.5;            //阻尼(摩擦力)
		var characterShape = this.characterBody.shapes[0];
		characterShape.material = this.characterMaterial;   

		//创建地板
		this.planeBody = this.debugDraw.createPlane();
		this.planeBody.position = [0, 600];
		var planeShape = this.planeBody.shapes[0];
		planeShape.material = this.groundMaterial;

		//创建不可移动的平台
        var platformPositions = [[100,450],[300,450],[500,450]];
        for(var i=0; i<platformPositions.length; i++){
			var platformBody = this.debugDraw.createRect(100, 50);
			platformBody.mass = 0;   //0，静止，不受重力影响
			platformBody.position = platformPositions[i];
			platformBody.type = p2.Body.KINEMATIC;  //静止
			var platformShape = platformBody.shapes[0];
			platformShape.material = this.groundMaterial;
			this.platforms.push(platformBody);
        }

		//创建可移动物体
	   	var boxPositions = [[100,400],[300,400],[500,400]];
        for(var i=0; i<boxPositions.length; i++){
		  var boxBody = this.debugDraw.createRect(50, 50);		
		  boxBody.mass = 1;
		  boxBody.position = boxPositions[i];
          var boxShape = boxBody.shapes[0];
		  boxShape.material = this.boxMaterial;
          this.boxes.push(boxBody);
        }

		//材料间的力作用
        var groundCharacterCM:p2.ContactMaterial = new p2.ContactMaterial(this.groundMaterial, this.characterMaterial);
		groundCharacterCM.friction = 0;

		var boxCharacterCM = new p2.ContactMaterial(this.boxMaterial, this.characterMaterial);
		boxCharacterCM.friction = 0;
        
		var boxGroundCM = new p2.ContactMaterial(this.boxMaterial, this.groundMaterial);
		boxGroundCM.friction = 0.6;  //摩擦力0.6  这样平台上的方块会跟随平台左右移动

        this.world.addContactMaterial(groundCharacterCM);
        this.world.addContactMaterial(boxCharacterCM);
        this.world.addContactMaterial(boxGroundCM);


		//允许人物跳跃时，可以从平台底下穿透，跳到平台上面
		this.world.on('beginContact', this.beginContact,this); //碰撞开始
		this.world.on('preSolve', this.preSolve, this);        //预处理(刚体间相互作用之前执行的函数???)
		this.world.on('endContact', this.endContact, this);    //碰撞结束

		//键盘事件
		window.document.onkeydown = this.onKeyDown;
		window.document.onkeyup = this.onKeyUp;
		window["Example4"] = this;  //在js函数代码中this不代表Example4，这里将Example4保存在window中，以便全局调用

		//世界更新事件?
		this.world.on('postStep', ()=>{
			for(var i=0; i<this.platforms.length; i++){
				this.platforms[i].velocity[0] = 20*Math.sin(this.world.time);
			}
			this.characterBody.velocity[0] = 100 * (this.buttons.right - this.buttons.left);
		}, this);
	}

	//碰撞检测
	private passThroughBody;
	private currentPlatform;
	private beginContact(evt){
		  //获取和角色碰撞的刚体
          if(evt.bodyA != this.characterBody && evt.bodyB != this.characterBody) 
		  	return;
          var otherBody = evt.bodyA == this.characterBody ? evt.bodyB : evt.bodyA;
		  //当碰撞刚体是平台，且平台位置在角色上方
          var platformIndex = this.platforms.indexOf(otherBody);
          if(platformIndex != -1 && otherBody.position[1] < this.characterBody.position[1]){
            this.passThroughBody = otherBody;
		  //平台位置在角色下方
          } else if(platformIndex != -1){
            this.currentPlatform = this.platforms[platformIndex];
          }
	}

	private preSolve(evt){
		  //平台在角色下方，则角色跟随平台移动
          if(this.currentPlatform) {
			  this.characterBody.velocity[0] += this.currentPlatform.velocity[0];
		  }
		  //碰撞是角色和平台，且满足穿透条件，则碰撞eq无效
          for(var i=0; i<evt.contactEquations.length; i++){  //contactEquations 碰撞处理函数?
            var eq = evt.contactEquations[i];
            if((eq.bodyA == this.characterBody && eq.bodyB == this.passThroughBody) || eq.bodyB == this.characterBody && eq.bodyA == this.passThroughBody){
              eq.enabled = false;
            }
          }
		  //碰撞是角色和平台，且满足穿透条件，则摩擦力无效
          for(var i=0; i<evt.frictionEquations.length; i++){   //frictionEquations 摩擦处理函数?
            var eq = evt.frictionEquations[i];
            if((eq.bodyA == this.characterBody && eq.bodyB == this.passThroughBody) || eq.bodyB == this.characterBody && eq.bodyA == this.passThroughBody){
              eq.enabled = false;
            }
          }
	}

	private endContact(evt){
		  //碰撞时角色和平台，且满足穿透条件，则重置穿透条件
          if((evt.bodyA == this.characterBody && evt.bodyB == this.passThroughBody) || evt.bodyB == this.characterBody && evt.bodyA == this.passThroughBody){
            this.passThroughBody = undefined;
          }
		  //碰撞是角色和平台，且平台是当前平台，则重置当前平台
          if(evt.bodyA != this.characterBody && evt.bodyB != this.characterBody) return;
          var otherBody = evt.bodyA == this.characterBody ? evt.bodyB : evt.bodyA;
          var platformIndex = this.platforms.indexOf(otherBody);
          if(otherBody == this.currentPlatform){
            this.currentPlatform = null;
          }
	}

	//键盘按下
	private onKeyDown(evt){
		var buttons = window["Example4"].buttons;
		var characterBody:p2.Body = window["Example4"].characterBody;
		evt = (evt) ? evt : window.event
		if (evt.keyCode) {
			if(evt.keyCode ==  38){  //up
				if(buttons.space != 1){
					buttons.space = 1;
					characterBody.velocity[1] = -500;
				}
			}else if(evt.keyCode == 37){  //left
				buttons.left = 1;
			}else if(evt.keyCode == 39){  //right
				buttons.right = 1;
			}
		}
	}

	//键盘释放
	private onKeyUp(evt){
		var buttons = window["Example4"].buttons;
		evt = (evt) ? evt : window.event
		if (evt.keyCode) {
			if(evt.keyCode ==  38){  //up
				buttons.space = 0;
			}else if(evt.keyCode == 37){  //left
				buttons.left = 0;
			}else if(evt.keyCode == 39){  //right
				buttons.right = 0;
			}
		}
	}
}