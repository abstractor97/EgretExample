<?php
	class HttpUtils {
		
		public function __construct() {
			
		 }

		public function httpGet($url) {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_TIMEOUT, 500);
			// 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
			// 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  //由于php curl版本问题，这两行必须为false
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
			curl_setopt($curl, CURLOPT_URL, $url);

			$res = curl_exec($curl);
			curl_close($curl);

			return $res;
		}
	}
	
	
?>