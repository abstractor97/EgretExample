class FirtPage extends eui.Component implements  eui.UIComponent {
	private banner:Banner;
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.banner.show();
	}
	
}