<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx4a14bf95e973b059", "af99ce68694f39e2712e7cf7c22fe224");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  
</body>

<div id="preview"> 

</div>
<div style="clear:both"></div>
<div>
  <button type="button" id="uploadBtn" width="300" height="300">上传</button> 
  <button type="button" id="downloadBtn" width="300" height="300">下载</button> 
</div>
<div style="clear:both"></div>
<div id="loadimg"> 

</div>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  var images = {
      localIds: [],
      serverId: [],
      downloadId: []
  };


  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: ['onMenuShareTimeline','chooseImage','uploadImage','downloadImage'
      // 所有要调用的 API 都要加到这个列表中
    ]
  });
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: 'test title', // 分享标题
      link: 'http://www.baidu.com', // 分享链接
      imgUrl: 'http://120.24.188.118/web/weixin/icon.jpg', // 分享图标
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
   });

    //选择本机图片
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          images.localIds = localIds;
          previewImg(localIds);
      },
      fail:function(res){
        alert("chooseImage fail");
      }
    });

    
  });

  //选择本机图片后，将图片显示在手机上
  function previewImg(imgList){
    var imgDiv = document.getElementById("preview");
    var len = imgList.length;
    for(var i=0;i<len;i++){
      var img = document.createElement("img");
      img.width = 100;
      img.heigth = 100;
      img.style.float = "left";
      img.src = imgList[i];
      imgDiv.appendChild(img);
    }
    
  }

  function showLoadImg(imgList){
    var imgDiv = document.getElementById("loadimg");
    var len = imgList.length;
    for(var i=0;i<len;i++){
      var img = document.createElement("img");
      img.width = 100;
      img.heigth = 100;
      img.style.float = "left";
      img.src = imgList[i];
      imgDiv.appendChild(img);
    }
  }

  var uploadCount;
  function startUploadImg(){
    alert("startUploadImg");
    uploadCount = images.localIds.length - 1;
    uploadImg(images.localIds[uploadCount]);
  }
  //
  
  function uploadImg(localId){
      if(uploadCount < 0){
        return;
      }
      alert("上传第几张图片:" + uploadCount);
      uploadCount--;
      wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              images.serverId.push(serverId);
              uploadImg(images.localIds[uploadCount]);
          },
          fail:function(res){
            alert("uploadImg fail");
          }
       });

    }

    var downloadCount;
    function startDownloadImg(){
      downloadCount = images.serverId.length-1;
      downloadImg(images.serverId[downloadCount]);
    }

    function downloadImg(serverId){  
      if(downloadCount < 0){
        showLoadImg(images.downloadId);
        return;
      }
      alert("下载第几张图片:" + downloadCount);
      downloadCount--;
      wx.downloadImage({
          serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回图片下载后的本地ID
              images.downloadId.push(localId);
              downloadImg(images.serverId[downloadCount]);
          },
          fail:function(res){
            alert("downloadImg fail");
          }
      });
  }

  var uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.onclick = startUploadImg;

  var downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.onclick = startDownloadImg;

  
</script>


  
</html>
