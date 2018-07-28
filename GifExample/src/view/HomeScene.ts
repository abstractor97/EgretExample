/**
 * 
 * @author 
 *
 *  gif工具类地址： //http://download.csdn.net/detail/loveappleer/9706883
 *  演示如何上传图片，并用手势拖动和缩放图片，然后将图片合成Gif。
 *  1. <input>标签上传本地图片
 *  2. gesture工具类，拖动缩放图片到合适位置
 *  3. gifjs工具类合成gif图
 * 
 *  跨域问题：在微信和手机默认浏览器没问题，在qq浏览器有跨域问题，设置渲染方式webgl修改为canvas解决。
 */
class HomeScene extends eui.Component{
    /**我要换脸*/
    private openFileBtn:eui.Image;
    /**确认生成*/
    private okBtn:eui.Image;
    /**我的图片*/
    private myImg:eui.Image;
    /**手势*/
    private gesturePinch: GesturePinch = new GesturePinch();
    private gestureDrag: GestureDrag = new GestureDrag();
    /**放照片的Group*/
    private imgGroup:eui.Group;
    /**图片容器*/
    private pictureGroup:eui.Group;
    /**图片容器遮罩*/
    private pictureMask:eui.Rect;
    
	public constructor() {
    	super();
    	this.percentWidth = 100;
    	this.percentHeight = 100;
    	this.skinName = "HomeSceneSkin";
	}
	
	public childrenCreated(){
    	  //保存HomeScene调用
        window["homeScene"] = this;
        //遮罩
        this.pictureGroup.mask = this.pictureMask;
    	  //监听我要换脸点击事件
        this.openFileBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFile, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtn, this);
	}
	
	//打开本地图片选择
    private onOpenFile(){
        var uploadImg:any = document.getElementById("uploadImg");
        uploadImg.onchange = this.onChang;
        uploadImg.click();
	}
	
	//选定本地图片，加载该图片
    private onChang(){
        //获取选择图片
        var uploadImg: any = document.getElementById("uploadImg");
        var file = uploadImg.files[0];
        //判断图片类型
        var imageType = /^image\//;
        if(!imageType.test(file.type)) {
            alert("请选择图片类型上传");
            return;
        }
        //加载图片
        var reader = new FileReader();
        reader.onload = function(){
            window["homeScene"].loadFileComplete(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
    //加载图片完成
    public loadFileComplete(result){
        //将加载图片的数据赋值给myImg
        this.myImg.addEventListener(egret.Event.COMPLETE, this.onMyImgComplete, this);
        this.myImg.source = result;
    }
    
    //myImg生成完成
    private onMyImgComplete(){
        //将图片缩小
        var rate = this.myImg.width / this.myImg.height;
        this.myImg.width = 300;
        this.myImg.height = 300/rate;
        this.myImg.anchorOffsetX = this.myImg.width/2;
        this.myImg.anchorOffsetY = this.myImg.height/2;
        this.myImg.x += this.myImg.anchorOffsetX;
        this.myImg.y += this.myImg.anchorOffsetY;
        
        
        //增加缩放手势
        this.gesturePinch.setTarget(this.myImg);
        this.gesturePinch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
            this.gestureDrag.stop();
        },this);
        this.gesturePinch.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{
            this.gestureDrag.start();
        },this);
        this.gesturePinch.start();
        
        //增加拖拽手势
        this.gestureDrag.setTarget(this.myImg);
        this.gestureDrag.start();
    }
    
    //确认合成
    private onOkBtn(){
        //关闭手势
        this.gesturePinch.stop();
        this.gestureDrag.stop();
        
        //截取合成图
        var render: egret.RenderTexture = new egret.RenderTexture();
        render.drawToTexture(this.pictureGroup, new egret.Rectangle(0,0,400,350));
        var img: eui.Image = new eui.Image();
        img.texture = render;
        
        var list = [];
        list.push(img.texture.toDataURL("image/png"));
        
        var render2: egret.RenderTexture = new egret.RenderTexture();
        this.imgGroup.y = 15;
        render2.drawToTexture(this.pictureGroup,new egret.Rectangle(0,0,400,350));
        var img2: eui.Image = new eui.Image();
        img2.texture = render2;
        
        list.push(img2.texture.toDataURL("image/png"));
        
        //移除本场景所有内容
        this.removeChildren();
        
        //创建Gif
        var htmlImg;
        var gameDiv = document.getElementById("gameDiv");
        htmlImg = document.createElement("img");
        htmlImg.id = "gif";
        gameDiv.appendChild(htmlImg);
        
        window["createGif"](list);
        
        //调整Gif位置
        var wScale = document.body.clientWidth / StageUtils.stage.stageWidth;
        var hScale = document.body.clientHeight / StageUtils.stage.stageHeight;
        var htmlImgWidth = this.pictureGroup.width * wScale;
        var htmlImgHeight = this.pictureGroup.height * hScale;
        
        htmlImg.style.width = htmlImgWidth + "px";
        htmlImg.style.height = htmlImgHeight + "px";
        htmlImg.style.left = this.pictureGroup.x * wScale + "px";
        htmlImg.style.top = this.pictureGroup.y * hScale + 1 + "px"; //有1px的偏移
        htmlImg.style.display = "inline";
        htmlImg.style.position = "absolute";
    }
    
   
}








