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
 * face++人脸识别测试
 * 1. 点击上传本地图片
 * 2. 调用face++接口，传送图片
 * 3. 返回face++识别结果
 *
 * 问题：
 * 1. Access-Control-Allow-Origin 跨域问题，用ajax的JSONP。
 * 2. ajax的JSONP后，访问报错，
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
    };
    //点击选择图片按钮
    HomeScene.prototype.onSelect = function () {
        var uploadImg = document.getElementById("uploadImg");
        uploadImg.onchange = this.onChang;
        uploadImg.click();
    };
    //加载选择的图片
    HomeScene.prototype.onChang = function () {
        //获取选择图片
        var uploadImg = document.getElementById("uploadImg");
        var file = uploadImg.files[0];
        //判断图片类型
        var imageType = /^image\//;
        if (!imageType.test(file.type)) {
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
        window["sendFaceReq"](url, JSON.stringify(data));
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
