/**
 * 长按识别二维码
 * 创建img标签的二维码，在微信里长按扫描识别
 * @author chenkai
 * @since 2017/4/17
 * 
 * example:
 * var qrCode:QRCode = new QRCode("resource/assets/qrcode.jpg");
 * qrCode.setPosition(100, 100, 200, 200);
 * qrCode.showHtmlCode();
 */
class QRCode{
    /**html中<img>标签二维码*/
    private htmlCode: HTMLImageElement;

	/**
	 * @param htmlCodeUrl htmlCode二维码链接
	 */
	public constructor(htmlCodeUrl:string){
		var gameDiv = document.getElementById("gameDiv");
		this.htmlCode = document.createElement("img");
		this.htmlCode.src = htmlCodeUrl;
		this.htmlCode.style.position = "absolute";
		this.htmlCode.style.display = "none";
		gameDiv.appendChild(this.htmlCode);
	}

    /**
     * 显示二维码
     */ 
    public showHtmlCode(): void {
        if(this.htmlCode){
             this.htmlCode.style.display = "inline";
        }
    }
    
    /**隐藏二维码*/
    public hideHtmlCode(): void {
        if(this.htmlCode) {
            this.htmlCode.style.display = "none";
        }
    }

    /**
     * 设置二维码图片位置
     * @param xPos x坐标
     * @param yPos y坐标
     * @param width 宽度
     * @param height 高度
     */
    public setPosition(xPos:number, yPos:number, width:number, height:number){
        if(this.htmlCode == null){
            return;
        }

        //竖屏
        if(document.body.clientWidth < document.body.clientHeight){
            var wScale = document.body.clientWidth / GameConst.stage.stageWidth;
            var hScale = document.body.clientHeight /GameConst.stage.stageHeight;
            this.htmlCode.style.width = width * wScale + "px";
            this.htmlCode.style.height = height * hScale + "px";
            this.htmlCode.style.left = xPos * wScale + "px";
            this.htmlCode.style.top = yPos * hScale + "px";
        //横屏
        }else{
            var wScale = document.body.clientWidth / GameConst.stage.stageHeight;
            var hScale = document.body.clientHeight / GameConst.stage.stageWidth;
            this.htmlCode.style.width =height*wScale + "px";
            this.htmlCode.style.height = width*hScale + "px";
            this.htmlCode.style.top = (GameConst.stage.stageWidth - xPos -width)*hScale + "px";
            this.htmlCode.style.left = yPos*wScale + "px";
        }
    }
    
    /**销毁*/
    public destroy(){
        if(this.htmlCode){
            this.htmlCode.parentNode.removeChild(this.htmlCode);
            this.htmlCode = null;
        }
    }
}
