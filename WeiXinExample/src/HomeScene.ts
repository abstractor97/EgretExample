/**
 *
 * @author 
 *
 */
class HomeScene extends eui.Component{
    private chooseImgBtn:eui.Button;  //选择图片按钮
    private uploadImgBtn:eui.Button;  //上传图片按钮
    private downImgBtn:eui.Button;    //下载图片按钮
    private chooseImg:eui.Image;      //选择的图片
    private downloadImg:eui.Image;    //下载的图片
    private startRecordBtn:eui.Button;//开始录音
    private stopRecordBtn:eui.Button; //停止录音
    private playVoiceBtn:eui.Button;  //播放录音
    private pauseVoiceBtn:eui.Button; //暂停播放录音
    private stopVoiceBtn:eui.Button;  //停止播放录音
    private uploadVoiceBtn:eui.Button;//上传录音
    private downloadVoiceBtn:eui.Button;//下载录音
    private translateVoiceBtn:eui.Button;//音频识别
    private getLocationBtn:eui.Button;  //获取地理位置
    
	public constructor() {
    	super();
    	this.skinName = "HomeSceneSkin";
	}
	
	public childrenCreated(){
    	  WxUtils.getInstance().config(window["wxInfo"]);
    	  
    	  this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}
	
	private onTouchTap(e:egret.TouchEvent){
    	switch(e.target){
            case this.chooseImgBtn:  //打开相册
                this.onChooseImg();
            break;
            case this.uploadImgBtn:  //上传图片
                this.onUploadImg();
            break;
            case this.startRecordBtn: //开始录音
                this.onStartRecord();
            break;
            case this.stopRecordBtn: //停止录音
                this.onStopRecord();
            break;
            case this.playVoiceBtn:  //播放录音
                this.onPlayVocie();
            break;
            case this.pauseVoiceBtn: //暂停播放录音
                this.onPauseVoice();
            break;
            case this.stopVoiceBtn:  //停止播放录音
                this.onStopVoice();
            break;
            case this.uploadVoiceBtn://上传录音
                this.uploadVoice();
            break;
            case this.downloadVoiceBtn: // 下载录音
                this.downloadVoice();
            break;
            case this.translateVoiceBtn: //音频识别
                this.translateVoice();
            break;
            case this.getLocationBtn:  //获取地理位置
                this.getLocation();
            break;
	  }
	}
	
	/////////////////////////////////////////////
	//----------------[ 图片接口 ]----------------
	/////////////////////////////////////////////
	
	//打开相册，选择图片id列表
	private imgLocalIds;
	
	//打开相册，选择图片
	private onChooseImg(){
        WxUtils.getInstance().addEventListener(WxUtils.CHOOSE_IMAGE_SUCCESS, this.onChooseImgSuccess, this);
    	  WxUtils.getInstance().chooseImg(); 
	}
	
	//选择图片成功
    private onChooseImgSuccess(e:egret.Event){
        this.imgLocalIds = e.data;
        egret.log("选择图片成功:",this.imgLocalIds[0]);
    	    
    	  //img成功
    	  //由于跨域问题，toDataURL不行
          var img = document.createElement("img");
          var chooseImg = this.chooseImg;
          img.onload = function() {
              var canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img,0,0,img.width,img.height);
              var dataURL = canvas.toDataURL("image/jpeg");
              chooseImg.source = dataURL; 
              
          }
          img.src = this.imgLocalIds[0];
	}
	
	//上传图片
    private onUploadImg(){
        //上传图片的本地ID
        var localId = this.imgLocalIds[0];
        WxUtils.getInstance().addEventListener(WxUtils.UPLOAD_IMAGE_SUCCESS, this.uploadImgSuccess, this);
        WxUtils.getInstance().uploadImage(localId); 
    }
    
    //上传图片成功
    private uploadImgSuccess(e:egret.Event){
        var serverId = e.data;
        egret.log("上传图片成功:", serverId);

        //开始下载图片
        WxUtils.getInstance().addEventListener(WxUtils.DOWNLOAD_IMAGE_SUCCESS, this.downloadImgSuccess, this);
        WxUtils.getInstance().downloadImage(serverId);
    }
    
    //下载图片成功
    private downloadImgSuccess(e:egret.Event){
        var localId = e.data;
        egret.log("下载图片成功:", localId);
    }
    
    /////////////////////////////////////////////
	//----------------[ 音频接口 ]----------------
	/////////////////////////////////////////////
    //录音id
    private voiceLocalId;
    private voiceServerId;
    
    //开始录音
    private onStartRecord(){
        WxUtils.getInstance().startRecord();
    }
    
    //停止录音
    private onStopRecord(){
        WxUtils.getInstance().addEventListener(WxUtils.STOP_RECORD,this.stopRecordSuccess, this);
        WxUtils.getInstance().stopRecord();
    }
    
    //停止录音成功
    private stopRecordSuccess(e:egret.Event){
        var localId = e.data;
        egret.log("停止录音:", localId);
        this.voiceLocalId = localId;
    }
    
    //播放录音
    private onPlayVocie(){
        WxUtils.getInstance().addEventListener(WxUtils.VOICE_PLAY_END, this.onVoicePlayEnd, this);
        WxUtils.getInstance().playVoice(this.voiceLocalId);
    }
    
    //播放录音结束
    private onVoicePlayEnd(){
        egret.log("录音播放结束");
    }
    
    //暂停播放录音
    private onPauseVoice(){
        WxUtils.getInstance().pauseVoice(this.voiceLocalId);
    }
    
    //停止播放录音
    private onStopVoice(){
        WxUtils.getInstance().stopVoice(this.voiceLocalId);
    }
    
    //上传录音
    private uploadVoice(){
        WxUtils.getInstance().addEventListener(WxUtils.UPLOAD_VOICE_SUCCESS, this.uploadVoiceSuccess, this);
        WxUtils.getInstance().uploadVoice(this.voiceLocalId);
    }
    
    //上传录音成功
    private uploadVoiceSuccess(e:egret.Event){
        var serveId = e.data;
        egret.log("上传录音成功:",serveId);
        
        this.voiceServerId = serveId;
    }
    
    //下载录音
    private downloadVoice(){
        WxUtils.getInstance().addEventListener(WxUtils.DOWNLOAD_VOICE_SUCCESS, this.downlodVoiceSuccess, this);
        WxUtils.getInstance().downloadVocie(this.voiceServerId);
    }
    
    //下载录音成功
    private downlodVoiceSuccess(e:egret.Event){
        var localId = e.data;
        egret.log("下载录音成功:", localId);
    }
    
    //音频识别
    private translateVoice(){
        WxUtils.getInstance().addEventListener(WxUtils.TRANSLATE_VOICE_SUCCESS, this.translateVoiceSuccess, this);
        WxUtils.getInstance().translateVoice(this.voiceLocalId);
    }
    
    //音频识别成功
    private translateVoiceSuccess(e:egret.Event){
        var result = e.data;
        egret.log("音频识别:", result);
    }
    
    //获取地理位置
    private getLocation(){
        WxUtils.getInstance().addEventListener(WxUtils.GET_LOCATION_SUCCESS, this.getLocationSuccess, this);
        WxUtils.getInstance().getLocation('gcj02');
    }
    
    //获取地理位置成功
    private getLocationSuccess(e:egret.Event){
        var res = e.data;
        
        WxUtils.getInstance().openLocation(
            res.latitude,
            res.longitude,
            "地理位置测试"
            );
    }
}












