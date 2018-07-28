/**
 * 键盘监听
 * @author chenkai
 * @since 2017/6/27
 */
class KeyListener extends egret.EventDispatcher{
	public static EVENT_KEY_DOWN:string = "EVENT_KEY_DOWN";
	public static EVENT_KEY_UP:string = "EVENT_KEY_UP";

	public static Up:number = 38;
	public static Left:number = 37;
	public static Right:number = 39;

	private buttons:any = {};

	public constructor() {
		super();
		window["keyListener"] = this;
		window.document.onkeydown = this.onKeyDown;
		window.document.onkeyup = this.onKeyUp;
	}

	//键盘按下
	 private onKeyDown(evt){
		console.log(evt.keyCode);
		window["keyListener"].dispatchEventWith(KeyListener.EVENT_KEY_DOWN, false, evt.keyCode); 
	 }

	private onKeyUp(evt){
		window["keyListener"].dispatchEventWith(KeyListener.EVENT_KEY_UP, false, evt.keyCode);
	}
}