/**
 * Base64
 * @author chenkai
 * @since 2017/4/18
 */
class Base64 {
	/**
	 * 编码
	 */
	public static encode(data:string){
		return window["Base64"].encode(data);
	}

	/**
	 * 解码
	 */
	public static decode(data:string){
		return window["Base64"].decode(data);
	}
}