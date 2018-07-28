/**
 *
 * @author 
 * face++人脸识别测试
 * 1. 点击上传本地图片
 * 2. 调用face++接口，传送图片
 * 3. 返回face++识别结果
 * 
 * 问题：
 * 1. Access-Control-Allow-Origin 跨域问题，用ajax的JSONP。
 * 2. ajax的JSONP后，访问报错，
 */
class HomeScene extends eui.Component{
    private selectBtn:eui.Image;
    
	public constructor() {
    	 super();
       this.percentWidth = 100;
       this.percentHeight = 100;
    	 this.skinName = "HomeSceneSkin";  
	}
	
	public childrenCreated(){
    	this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
	}
	
	//点击选择图片按钮
	private onSelect(){
        var uploadImg: any = document.getElementById("uploadImg");
        uploadImg.onchange = this.onChang;
        uploadImg.click();
	}
	
	//加载选择的图片
    private onChang() {
        //获取选择图片
        var uploadImg: any = document.getElementById("uploadImg");
        var file = uploadImg.files[0];
        //判断图片类型
        var imageType = /^image\//;
        if(!imageType.test(file.type)) {
            alert("请选择图片类型上传");
            return;
        }
        
        //发送人脸识别请求
        var url = "https://api-cn.faceplusplus.com/facepp/v3/detect";
        var data = {
            "api_key": "Ha2o6pdL-Dui_G9ZJoxdlHk_qhkMzDq0",
            "api_secret": "ZoAd1VHXjEybfUTptAgPNyq4fALw-SJy",
            "image_url": "http://120.24.188.118/example/faceexample/resource/assets/m3_r.png",
            "return_landmark": 0,
            "return_attributes": "none"

        };
        window["sendFaceReq"](url,JSON.stringify(data));
    }
}
