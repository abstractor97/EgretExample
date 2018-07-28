<?php
	require_once "HttpUtils.php";
	
	//1.获取code
	echo "获取code</br>";
	$httpUtils = new HttpUtils();
	$code = $_GET["code"];
	echo "code:".$code."</br>";
	
	
	if($code != null){
		echo("code is have");

		//2. 通过code换取网页授权access_token
		$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4a14bf95e973b059&secret=af99ce68694f39e2712e7cf7c22fe224&code=$code&grant_type=authorization_code";
		$res = json_decode($httpUtils->httpGet($url));
		$access_token = $res->access_token;
		$openid = $res->openid;
		$expires_in = $res->expires_in;
		$refresh_token = $res->refresh_token;
		$scope = $res->scope;
	
		//3. 拉取用户信息(需scope为 snsapi_userinfo)	
		$url = "https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN";
		$userInfoResult = json_decode($httpUtils->httpGet($url));
		echo("</br>");
		echo("openid:".$userInfoResult->openid."</br>");
		echo("nickname:".$userInfoResult->nickname."</br>");
		echo("sex:".$userInfoResult->sex."</br>");
		echo("province:".$userInfoResult->province."</br>");
		echo("city:".$userInfoResult->city."</br>");
		echo("country:".$userInfoResult->country."</br>");
		echo("headimgurl:".$userInfoResult->headimgurl."</br>");
		echo("privilege:".$userInfoResult->privilege."</br>");
		echo("unionid:".$userInfoResult->unionid."</br>");

		//4.重定向
		$openid = $userInfoResult->openid;
		$nickname = $userInfoResult->nickname;
		header('Location:http://120.24.188.118/Example/weixin_php_scope/egret/index.html'."?openid=".$openid."&nickname=".$nickname);
		

	}else{
		echo("code is null");
	}
?>