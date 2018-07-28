/**
 * App主类
 * @author rikimaru
 * @since 2017/3/15
 */
class App extends SingleClass{
	

	/**舞台工具类*/
	public static get StageUtils():StageUtils{
		return StageUtils.getInstance();
	}
	
}