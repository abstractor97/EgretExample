/**
 * 虚拟摇杆
 * @author chenkai
 * @since 2017/5/4
 */
class VirtualJoystick extends eui.Component{
	private ball:eui.Image;          //圆环
	private circle:eui.Image;        //小球
	private circleRadius:number = 0; //圆环半径
	private ballRadius:number = 0;   //小球半径
	private centerX:number = 0;      //中心点坐标
	private centerY:number = 0;
	private touchID:number;          //触摸ID

	public constructor() {
		super();
		this.skinName = "VirtualJoystickSkin";
	}

	public childrenCreated(){
		//获取圆环和小球半径
		this.circleRadius = this.circle.height/2;
		this.ballRadius = this.ball.height/2;
		//获取中心点
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		//设置锚点
		this.anchorOffsetX = this.circleRadius;
		this.anchorOffsetY = this.circleRadius;
		//设置小球初始位置
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
	}

	//启动虚拟摇杆 (监听事件根据实际情况设置，不然点一下UI上的其他按钮，也会触发虚拟摇杆事件。这里只是做demo，就没那么讲究了 - -!)
	public start(){
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//停止虚拟摇杆
	public stop(){
		GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//触摸开始，显示虚拟摇杆
	private onTouchBegin(e:egret.TouchEvent){
		if(this.parent){
			return;
		}
		this.touchID = e.touchPointID;
		this.x = e.stageX;
		this.y = e.stageY;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
		GameConst.stage.addChild(this);

		this.dispatchEvent(new egret.Event("vj_start"));
	}

	//触摸结束，隐藏虚拟摇杆
	private onTouchEnd(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		this.hide();
		this.dispatchEvent(new egret.Event("vj_end"));
	}

	//触摸移动，设置小球的位置
	private p1:egret.Point = new egret.Point();
	private p2:egret.Point = new egret.Point();
	private onTouchMove(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		//获取手指和虚拟摇杆的距离
		this.p1.x = this.x;
		this.p1.y = this.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		var dist = egret.Point.distance(this.p1, this.p2);
		var angle:number = Math.atan2(e.stageY - this.y, e.stageX - this.x);
		//手指距离在圆环范围内
		if(dist <= (this.circleRadius - this.ballRadius)){
			this.ball.x = this.centerX + e.stageX - this.x;
			this.ball.y = this.centerY + e.stageY - this.y;
		//手指距离在圆环范围外
		}else{
			this.ball.x = Math.cos(angle)*(this.circleRadius - this.ballRadius) + this.centerX;
			this.ball.y = Math.sin(angle)*(this.circleRadius - this.ballRadius) + this.centerY;
		}
		//派发事件
		this.dispatchEventWith("vj_move", false, angle);
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}


}