<?php
	class HttpUtils {
		
		public function __construct() {
			
		 }

		public function httpGet($url) {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_TIMEOUT, 500);
			// Ϊ��֤��������������΢�ŷ�����֮�����ݴ���İ�ȫ�ԣ�����΢�Žӿڲ���https��ʽ���ã�����ʹ������2�д����ssl��ȫУ�顣
			// ����ڲ�������д����ڴ˴���֤ʧ�ܣ��뵽 http://curl.haxx.se/ca/cacert.pem �����µ�֤���б��ļ���
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  //����php curl�汾���⣬�����б���Ϊfalse
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
			curl_setopt($curl, CURLOPT_URL, $url);

			$res = curl_exec($curl);
			curl_close($curl);

			return $res;
		}
	}
	
	
?>