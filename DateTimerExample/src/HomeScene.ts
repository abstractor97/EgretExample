/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/19
 * 
 * 创建多张运动图片，降低帧频，然后测试enter_frame、timer、datetimer在fps过低的情况下的计数。
 * 测试结果：
 * enter_frame、timer在帧频过低的情况下，计数变少
 * datetimer无论帧频如何，计数不会变少
 */
class HomeScene extends eui.Component{
	//显示计数文本
	private enterFrameLabel:eui.Label;
	private timerLabel:eui.Label;
	private dateTimerLabel:eui.Label;

	//计数
	private count0:number = 0;
	private count1:number = 0;
	private count2:number = 0;

	//图片容器
	private bmGroup:eui.Group;

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		//enter_frame
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

		//timer
		var timer:egret.Timer = new egret.Timer(1000/30);
		timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
		timer.start();

		//dateTimer
		var dateTimer:DateTimer = new DateTimer(1000/30);
		dateTimer.addEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler, this);
		dateTimer.start();

		//创建多张运动图片，降低帧频
		this.createManyBitmap();
	}

	private onEnterFrame(){
		this.count0 ++;
		this.enterFrameLabel.text = "EnterFrame:" + this.count0;
	}

	private onTimerHandler(){
		this.count1++;
		this.timerLabel.text = "Timer:" + this.count1;
	}

	private onDateTimerHandler(){
		this.count2++;
		this.dateTimerLabel.text = "DateTimer:" + this.count2;
	}

	//创建很多的bitmap来降低帧频
	private bmNum:number = 100;
    private createManyBitmap(){
        for(var i=0;i<this.bmNum;i++){
            var bm:egret.Bitmap = new egret.Bitmap();
            bm.texture = RES.getRes("bg_jpg");
            this.bmGroup.addChild(bm);
            egret.Tween.get(bm, {loop:true}).to({x:100*Math.random(),y:Math.random()*500},1000).to({x:0,y:0},1000);
        }
    }
}