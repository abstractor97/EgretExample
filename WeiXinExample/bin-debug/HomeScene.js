var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        WxUtils.getInstance().config(window["wxInfo"]);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    HomeScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.chooseImgBtn:
                this.onChooseImg();
                break;
            case this.uploadImgBtn:
                this.onUploadImg();
                break;
            case this.startRecordBtn:
                this.onStartRecord();
                break;
            case this.stopRecordBtn:
                this.onStopRecord();
                break;
            case this.playVoiceBtn:
                this.onPlayVocie();
                break;
            case this.pauseVoiceBtn:
                this.onPauseVoice();
                break;
            case this.stopVoiceBtn:
                this.onStopVoice();
                break;
            case this.uploadVoiceBtn:
                this.uploadVoice();
                break;
            case this.downloadVoiceBtn:
                this.downloadVoice();
                break;
            case this.translateVoiceBtn:
                this.translateVoice();
                break;
            case this.getLocationBtn:
                this.getLocation();
                break;
        }
    };
    //打开相册，选择图片
    HomeScene.prototype.onChooseImg = function () {
        WxUtils.getInstance().addEventListener(WxUtils.CHOOSE_IMAGE_SUCCESS, this.onChooseImgSuccess, this);
        WxUtils.getInstance().chooseImg();
    };
    //选择图片成功
    HomeScene.prototype.onChooseImgSuccess = function (e) {
        this.imgLocalIds = e.data;
        egret.log("选择图片成功:", this.imgLocalIds[0]);
        //img成功
        //由于跨域问题，toDataURL不行
        var img = document.createElement("img");
        var chooseImg = this.chooseImg;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL("image/jpeg");
            chooseImg.source = dataURL;
        };
        img.src = this.imgLocalIds[0];
    };
    //上传图片
    HomeScene.prototype.onUploadImg = function () {
        //上传图片的本地ID
        var localId = this.imgLocalIds[0];
        WxUtils.getInstance().addEventListener(WxUtils.UPLOAD_IMAGE_SUCCESS, this.uploadImgSuccess, this);
        WxUtils.getInstance().uploadImage(localId);
    };
    //上传图片成功
    HomeScene.prototype.uploadImgSuccess = function (e) {
        var serverId = e.data;
        egret.log("上传图片成功:", serverId);
        //开始下载图片
        WxUtils.getInstance().addEventListener(WxUtils.DOWNLOAD_IMAGE_SUCCESS, this.downloadImgSuccess, this);
        WxUtils.getInstance().downloadImage(serverId);
    };
    //下载图片成功
    HomeScene.prototype.downloadImgSuccess = function (e) {
        var localId = e.data;
        egret.log("下载图片成功:", localId);
    };
    //开始录音
    HomeScene.prototype.onStartRecord = function () {
        WxUtils.getInstance().startRecord();
    };
    //停止录音
    HomeScene.prototype.onStopRecord = function () {
        WxUtils.getInstance().addEventListener(WxUtils.STOP_RECORD, this.stopRecordSuccess, this);
        WxUtils.getInstance().stopRecord();
    };
    //停止录音成功
    HomeScene.prototype.stopRecordSuccess = function (e) {
        var localId = e.data;
        egret.log("停止录音:", localId);
        this.voiceLocalId = localId;
    };
    //播放录音
    HomeScene.prototype.onPlayVocie = function () {
        WxUtils.getInstance().addEventListener(WxUtils.VOICE_PLAY_END, this.onVoicePlayEnd, this);
        WxUtils.getInstance().playVoice(this.voiceLocalId);
    };
    //播放录音结束
    HomeScene.prototype.onVoicePlayEnd = function () {
        egret.log("录音播放结束");
    };
    //暂停播放录音
    HomeScene.prototype.onPauseVoice = function () {
        WxUtils.getInstance().pauseVoice(this.voiceLocalId);
    };
    //停止播放录音
    HomeScene.prototype.onStopVoice = function () {
        WxUtils.getInstance().stopVoice(this.voiceLocalId);
    };
    //上传录音
    HomeScene.prototype.uploadVoice = function () {
        WxUtils.getInstance().addEventListener(WxUtils.UPLOAD_VOICE_SUCCESS, this.uploadVoiceSuccess, this);
        WxUtils.getInstance().uploadVoice(this.voiceLocalId);
    };
    //上传录音成功
    HomeScene.prototype.uploadVoiceSuccess = function (e) {
        var serveId = e.data;
        egret.log("上传录音成功:", serveId);
        this.voiceServerId = serveId;
    };
    //下载录音
    HomeScene.prototype.downloadVoice = function () {
        WxUtils.getInstance().addEventListener(WxUtils.DOWNLOAD_VOICE_SUCCESS, this.downlodVoiceSuccess, this);
        WxUtils.getInstance().downloadVocie(this.voiceServerId);
    };
    //下载录音成功
    HomeScene.prototype.downlodVoiceSuccess = function (e) {
        var localId = e.data;
        egret.log("下载录音成功:", localId);
    };
    //音频识别
    HomeScene.prototype.translateVoice = function () {
        WxUtils.getInstance().addEventListener(WxUtils.TRANSLATE_VOICE_SUCCESS, this.translateVoiceSuccess, this);
        WxUtils.getInstance().translateVoice(this.voiceLocalId);
    };
    //音频识别成功
    HomeScene.prototype.translateVoiceSuccess = function (e) {
        var result = e.data;
        egret.log("音频识别:", result);
    };
    //获取地理位置
    HomeScene.prototype.getLocation = function () {
        WxUtils.getInstance().addEventListener(WxUtils.GET_LOCATION_SUCCESS, this.getLocationSuccess, this);
        WxUtils.getInstance().getLocation('gcj02');
    };
    //获取地理位置成功
    HomeScene.prototype.getLocationSuccess = function (e) {
        var res = e.data;
        WxUtils.getInstance().openLocation(res.latitude, res.longitude, "地理位置测试");
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
