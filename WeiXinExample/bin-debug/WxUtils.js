var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 微信工具类
 * @author chenkai
 * @date 2017/3/1
 *
 * 微信JSSDK接口测试
 * 1. 分享功能
 * 2. 图片功能
 * 3. 录音功能
 * 4. 音频识别
 * 5. 地理位置
 */
var WxUtils = (function (_super) {
    __extends(WxUtils, _super);
    function WxUtils() {
        var _this = _super.apply(this, arguments) || this;
        /**分享标题*/
        _this.title = "微信分享测试标题";
        /**分享描述*/
        _this.desc = "微信分享测试描述";
        /**分享链接*/
        _this.link = "http://baidu.com";
        /**分享图片*/
        _this.imgUrl = "http://120.24.188.118/Example/weixin/resource/assets/share.jpg";
        return _this;
    }
    WxUtils.getInstance = function () {
        if (this.instance == null) {
            this.instance = new WxUtils();
        }
        return this.instance;
    };
    /**
     * 配置微信接口
     * @wxInfo 微信配置信息
     */
    WxUtils.prototype.config = function (wxInfo) {
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = wxInfo.debug;
        bodyConfig.appId = wxInfo.appId;
        bodyConfig.timestamp = wxInfo.timestamp;
        bodyConfig.nonceStr = wxInfo.nonceStr;
        bodyConfig.signature = wxInfo.signature;
        bodyConfig.jsApiList = [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "stopVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice",
            "translateVoice",
            "openLocation",
            "getLocation" //获取地理位置接口
        ];
        if (wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            //接口验证失败
            wx.error(function () {
            });
            //接口验证成功
            wx.ready(function () {
                WxUtils.getInstance().setShareContent();
            });
        }
    };
    /**
     * 设置分享内容
     * @title 分享标题(用于标题显示得分)
     */
    WxUtils.prototype.setShareContent = function (title) {
        if (title === void 0) { title = this.title; }
        this.shareTimeLine(title); //朋友圈
        this.shareAppMessage(title); //好友
        this.shareQQ(title); //QQ空间
        this.shareWeiBo(title); //微博
    };
    /**分享朋友圈*/
    WxUtils.prototype.shareTimeLine = function (title) {
        var body = new BodyMenuShareTimeline();
        body.title = title;
        body.imgUrl = this.imgUrl;
        body.link = this.link;
        //分享成功
        body.success = function () {
        };
        //分享失败
        body.fail = function () {
        };
        //分享撤销
        body.cancel = function () {
        };
        wx.onMenuShareTimeline(body);
    };
    /**分享好友*/
    WxUtils.prototype.shareAppMessage = function (title) {
        var bodyFriend = new BodyMenuShareAppMessage();
        bodyFriend.title = title;
        bodyFriend.imgUrl = this.imgUrl;
        bodyFriend.link = this.link;
        bodyFriend.desc = this.desc;
        bodyFriend.success = function () {
        };
        wx.onMenuShareAppMessage(bodyFriend);
    };
    /**分享QQ空间*/
    WxUtils.prototype.shareQQ = function (title) {
        var bodyQQ = new BodyMenuShareQQ();
        bodyQQ.title = title;
        bodyQQ.desc = this.desc;
        bodyQQ.link = this.link;
        bodyQQ.imgUrl = this.imgUrl;
        bodyQQ.success = function () {
        };
        wx.onMenuShareQQ(bodyQQ);
    };
    /**分享微博*/
    WxUtils.prototype.shareWeiBo = function (title) {
        var bodyWeiBo = new BodyMenuShareWeibo();
        bodyWeiBo.title = title;
        bodyWeiBo.desc = this.desc;
        bodyWeiBo.link = this.link;
        bodyWeiBo.imgUrl = this.imgUrl;
        wx.onMenuShareWeibo(bodyWeiBo);
    };
    /**打开相册，选择图片*/
    WxUtils.prototype.chooseImg = function () {
        //选择相册图片
        var chooseImageBody = {
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                WxUtils.getInstance().dispatchEventWith(WxUtils.CHOOSE_IMAGE_SUCCESS, false, localIds);
            },
            fail: function () {
            }
        };
        wx.chooseImage(chooseImageBody);
    };
    /**预览图片*/
    WxUtils.prototype.previewImage = function () {
        var previewImage = {
            current: '',
            urls: [] // 需要预览的图片http链接列表
        };
    };
    /**
     * 上传图片
     * @localId 需要上传图片的本地ID
     */
    WxUtils.prototype.uploadImage = function (localId) {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1,
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                WxUtils.getInstance().dispatchEventWith(WxUtils.UPLOAD_IMAGE_SUCCESS, false, serverId);
            }
        });
    };
    /**
     * 下载图片
     * @serverId 下载图片的服务器地址
     */
    WxUtils.prototype.downloadImage = function (serverId) {
        wx.downloadImage({
            serverId: serverId,
            isShowProgressTips: 1,
            success: function (res) {
                var localId = res.localId; // 返回图片下载后的本地ID
                WxUtils.getInstance().dispatchEventWith(WxUtils.DOWNLOAD_IMAGE_SUCCESS, false, localId);
            }
        });
    };
    /**开始录音*/
    WxUtils.prototype.startRecord = function () {
        wx.startRecord({});
        //监听录音超时
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId;
                WxUtils.getInstance().dispatchEventWith(WxUtils.STOP_RECORD, false, localId);
            }
        });
    };
    /**停止录音*/
    WxUtils.prototype.stopRecord = function () {
        wx.stopRecord({
            success: function (res) {
                var localId = res.localId; //本地录音id
                WxUtils.getInstance().dispatchEventWith(WxUtils.STOP_RECORD, false, localId);
            }
        });
    };
    /**
     * 播放录音
     * @localId 录音本地id
     */
    WxUtils.prototype.playVoice = function (localId) {
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        //监听录音播放完毕
        wx.onVoicePlayEnd({
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                WxUtils.getInstance().dispatchEventWith(WxUtils.VOICE_PLAY_END, false, localId);
            }
        });
    };
    /**
     * 暂停播放录音
     * @localId 录音id
     */
    WxUtils.prototype.pauseVoice = function (localId) {
        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
    };
    /**
     * 停止播放录音
     * @localId 录音id
     */
    WxUtils.prototype.stopVoice = function (localId) {
        wx.stopVoice({
            localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    };
    /**
     * 上传录音
     * @localId
     */
    WxUtils.prototype.uploadVoice = function (localId) {
        wx.uploadVoice({
            localId: localId,
            isShowProgressTips: 1,
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                WxUtils.getInstance().dispatchEventWith(WxUtils.UPLOAD_VOICE_SUCCESS, false, serverId);
            }
        });
    };
    /**
     * 下载录音
     * @serverId 录音服务器id
     */
    WxUtils.prototype.downloadVocie = function (serverId) {
        wx.downloadVoice({
            serverId: serverId,
            isShowProgressTips: 1,
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                WxUtils.getInstance().dispatchEventWith(WxUtils.DOWNLOAD_VOICE_SUCCESS, false, localId);
            }
        });
    };
    /**
     * 音频识别
     * @localId 本地录音id
     */
    WxUtils.prototype.translateVoice = function (localId) {
        wx.translateVoice({
            localId: localId,
            isShowProgressTips: 1,
            success: function (res) {
                //音频识别结果
                var result = res.translateResult;
                WxUtils.getInstance().dispatchEventWith(WxUtils.TRANSLATE_VOICE_SUCCESS, false, result);
            }
        });
    };
    /**
     * 微信内置地图查看位置接口
     * @latitude
     * @longitude
     * @name
     * @address
     * @scale
     * @infoUrl
     */
    WxUtils.prototype.openLocation = function (latitude, longitude, name, address, scale, infoUrl) {
        if (latitude === void 0) { latitude = 0; }
        if (longitude === void 0) { longitude = 0; }
        if (name === void 0) { name = ''; }
        if (address === void 0) { address = ''; }
        if (scale === void 0) { scale = 28; }
        if (infoUrl === void 0) { infoUrl = ''; }
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address,
            scale: scale,
            infoUrl: infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
        });
    };
    /**
     * 获取地理位置
     * @type 位置类型
     */
    WxUtils.prototype.getLocation = function (type) {
        if (type === void 0) { type = 'wgs84'; }
        wx.getLocation({
            type: type,
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                WxUtils.getInstance().dispatchEventWith(WxUtils.GET_LOCATION_SUCCESS, false, res);
            }
        });
    };
    return WxUtils;
}(egret.EventDispatcher));
/**选择相册图片成功*/
WxUtils.CHOOSE_IMAGE_SUCCESS = "CHOOSE_IMAGE_SUCCESS";
/**上传图片成功*/
WxUtils.UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
/**下载图片成功*/
WxUtils.DOWNLOAD_IMAGE_SUCCESS = "DOWNLOAD_IMAGE_SUCCESS";
/**停止录音*/
WxUtils.STOP_RECORD = "STOP_RECORD";
/**播放录音完毕*/
WxUtils.VOICE_PLAY_END = "VOICE_PLAY_END";
/**上传录音成功*/
WxUtils.UPLOAD_VOICE_SUCCESS = "UPLOAD_VOICE_SUCCESS";
/**下载录音成功*/
WxUtils.DOWNLOAD_VOICE_SUCCESS = "DOWNLOAD_VOICE_SUCCESS";
/**音频识别成功*/
WxUtils.TRANSLATE_VOICE_SUCCESS = "TRANSLATE_VOICE_SUCCESS";
/**获取地理位置成功*/
WxUtils.GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
__reflect(WxUtils.prototype, "WxUtils");
