/**
 * 主页场景
 * @author chenkai
 * @since 2017/5/4
 */
class HomeScene extends eui.Component{
	private vj:VirtualJoystick = new VirtualJoystick();  //虚拟摇杆
	private player:eui.Rect;    //人物
	private speedX = 0;         //人物移动速度
	private speedY = 0;
	private speed = 10;

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		//开启虚拟摇杆
		this.vj.start();
		this.vj.addEventListener("vj_start",this.onStart, this);
		this.vj.addEventListener("vj_move", this.onChange, this);
		this.vj.addEventListener("vj_end", this.onEnd, this);
	}

	//摇杆启动，人物开始根据摇杆移动
	private onStart(){
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	//触摸摇杆的角度改变，人物的移动速度方向也随之改变
	private onChange(e:egret.Event){
		var angle = e.data;
		this.speedX = Math.cos(angle)*this.speed;
		this.speedY = Math.sin(angle)*this.speed;
	}

	//停止摇杆，人物停止移动
	private onEnd(){
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	//每帧更新，人物移动
	private onEnterFrame(){
		this.player.x  += this.speedX;
		this.player.y += this.speedY;
	}
}