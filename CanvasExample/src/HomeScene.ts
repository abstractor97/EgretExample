/**
 * 主页
 * @author chenkai
 * @since 2017/5/23
 */
class HomeScene extends eui.Component{
	private canvasGroup:eui.Group;   //画布容器
	private canvasSp:egret.Sprite;   //画布Sprite
	private canvas:egret.Graphics;   //画布

	private colorGroup:eui.Group;    //颜色选择容器
	private pan:eui.Image;           //画笔
	private eraser:eui.Image;        //橡皮
	private panColorRect:eui.Rect;   //画笔颜色
	private resetBtn:eui.Image;      //重置画布

	private panColor:number = 0;     //当前选择的画笔颜色
	private panLineSize:number = 5;  //画笔大小
	private eraserSize:number = 20;  //橡皮擦大小
	private curState:DrawState;      //当前状态
	
	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		this.changeState(DrawState.Free);
		this.initCanvas();
		this.configListeners();
	}

	//改变状态
	private changeState(state:DrawState, data:any = null){
		this.curState = state;
		switch(state){
			case DrawState.Free:
			break;
			case DrawState.Pan:
				console.log("选择画笔");
			break;
			case DrawState.Eraser:
				console.log("选择橡皮擦");
			break;
		}
	}

	//初始化画布
	private initCanvas(){
		this.canvasSp = new egret.Sprite();
		this.canvas = this.canvasSp.graphics;
		this.canvas.beginFill(0xffffff);
		this.canvas.drawRect(0,0,this.canvasGroup.width, this.canvasGroup.height);
		this.canvas.endFill();
		this.canvasSp.touchEnabled = true;
		this.canvasGroup.addChild(this.canvasSp);

		this.panColorRect.fillColor = this.panColor;
	}

	//监听触摸事件
	private configListeners(){
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.canvasSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.canvasSp.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.colorGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onColorSelect, this);
	}

	//触摸屏幕
	private onTouchTap(e:egret.TouchEvent){
		switch(e.target){
			case this.pan:    //画笔
				this.changeState(DrawState.Pan, e);
			break;
			case this.eraser: //橡皮擦
				this.changeState(DrawState.Eraser, e);
			break;
			case this.resetBtn: //重置画布
				this.reset();
			break;
		}
	}

	//开始触摸画布
	private onTouchBegin(e:egret.TouchEvent){
		if(e.target != this.canvasSp){
			return;
		}
		switch(this.curState){
			case DrawState.Pan:
				this.onPanBegin(e);
			break;
			case DrawState.Eraser:
				this.onEraserBegin(e);
			break;
		}
	}

	//移动
	private onTouchMove(e:egret.TouchEvent){
		if(e.target != this.canvasSp){
			return;
		}
		switch(this.curState){
			case DrawState.Pan:
				this.onPanMove(e);
			break;
			case DrawState.Eraser:
				this.onEraserMove(e);
			break;
		}
	}

	//选择颜色
	private onColorSelect(e:egret.TouchEvent){
		if(e.target instanceof eui.Rect){
			var colorRect:eui.Rect = e.target;
			this.panColor = colorRect.fillColor;
			this.panColorRect.fillColor = this.panColor;
		}
	}

	//画笔开始在画布上绘制，设置线条，并移动绘制起始点到触摸位置
	private onPanBegin(e:egret.TouchEvent){
		console.log("开始绘制线条");
		this.canvas.lineStyle(this.panLineSize ,this.panColor, 1,false, "normal",  egret.CapsStyle.ROUND, egret.JointStyle.ROUND,3);
		this.canvas.moveTo(e.localX, e.localY);
	}

	//画笔在画布上移动
	private onPanMove(e:egret.TouchEvent){
		this.canvas.lineTo(e.localX, e.localY);
	}

	//橡皮擦
	private onEraserBegin(e:egret.TouchEvent){
		console.log("开始擦除");
		this.canvas.lineStyle(this.eraserSize, 0xffffff, 1, false, "normal", egret.CapsStyle.ROUND, egret.JointStyle.ROUND,3);
		this.canvas.moveTo(e.localX, e.localY);
	}

	//橡皮擦移动
	private onEraserMove(e:egret.TouchEvent){
		this.canvas.lineTo(e.localX, e.localY);
	}

	//重置画布
	private reset(){
		console.log("重置画布");
		this.canvas.clear();
		this.canvas.beginFill(0xffffff);
		this.canvas.drawRect(0,0,this.canvasGroup.width, this.canvasGroup.height);
		this.canvas.endFill();
	}
}

//绘画状态
enum DrawState{   
	Free,
	Pan,
	Eraser
}