/**
 *
 *@author
 *
 */
class LoadingUI extends LoadingUIUI {
	constructor() {
		super();
		 let load = document.getElementById('loading');
		 if (load&&load.parentNode) { load.parentNode.removeChild(load); }
		 document.body.style.background = '#0E0E0E';
	}

	private shape:egret.MovieClip;//loading动画
	// private lineUp: egret.Shape;//黑线
	// private lineDown: egret.Shape;//白线

	protected createChildren(): void {
		super.createChildren();

		 this.shape = wy.Tools.createMovieClip('load2');
		 this.addChild(this.shape);
		 this.shape.play(-1);
		// this.shape.scaleX =
		// this.shape.scaleY =
		// 0.7;
		 wy.Tools.center(this.shape);
		 this.shape.x = egret.MainContext.instance.stage.stageWidth/2;
		 this.shape.y = egret.MainContext.instance.stage.stageHeight/2-this.textField.height/2;

		// this.lineDown = new egret.Shape();
		// this.lineDown.graphics.lineStyle(0.5, 0xffffff, 0.5);
		// this.lineDown.graphics.moveTo(0, 0);
		// this.lineDown.graphics.lineTo(120, 0);
		// this.lineDown.graphics.endFill();
		// this.addChild(this.lineDown);

		// this.lineUp = new egret.Shape();
		// this.addChild(this.lineUp);

		// this.lineDown.x = this.width / 2 - this.lineDown.width / 2;
		// this.lineDown.y = 830;

		// this.lineUp.x = this.lineDown.x;
		// this.lineUp.y = this.lineDown.y;

		this.textField.text = '';
		//this.textField.size = 15;
		this.textField.y = this.shape.y+this.shape.anchorOffsetY+10;
	}


	public hide(): void {
		super.hide();


	}

	public setProgress(cur, total): void {
		var perc: number = Math.round(cur * 100 / total);
		this.textField.text = '' + perc + '%';
		//this.textField.y = this.shape.y+this.shape.anchorOffsetY+10;//this.height/2 - this.textField.textHeight/2;
		this.textField.x = this.width/2 - this.textField.width/2;

		// this.lineUp.graphics.clear();
		// this.lineUp.graphics.lineStyle(2, 0x000000, 1);
		// this.lineUp.graphics.moveTo(0, 0);
		// this.lineUp.graphics.lineTo(this.lineDown.width * perc / 100, 0);

	}
}