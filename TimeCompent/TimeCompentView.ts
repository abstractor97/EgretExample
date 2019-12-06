class TimeCompentView extends eui.Component {

	private data: Object;
	private loadObj: egret.DisplayObjectContainer;
	private loadType: number = 0;

	public constructor(data: Object, loadObj: egret.DisplayObjectContainer) {
		super();
		this.data = data;
		this.loadObj = loadObj;
		this.addEventListener(egret.Event.COMPLETE, this.uiComponent, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		this.skinName = TimeCompent;
	}
	private btn_pre: eui.Button;
	private btn_next: eui.Button;
	private txt_year: eui.Label;
	private txt_month: eui.Label;
	private txt_hour: eui.EditableText;
	private txt_minute: eui.EditableText;
	private txt_second: eui.EditableText;

	private isClick: boolean = false;
	private years: number = 2017;
	private month: number = 4;
	private day: number = 1;
	private hour: number = 23;
	private minute: number = 59;
	private second: number = 59;

	private localyears: number = 2017;
	private localmonth: number = 4;
	private localday: number = 1;

	private btn_today: eui.RadioButton;
	private btn_close: eui.RadioButton;

	private dateArr: Array<number> = [0, 1, 2, 0, 0, 0];
	private uiComponent(): void {
		this.x = this.data["xs"];
		this.y = this.data["ys"];
		this.loadType = this.data["loadType"];
		this.getLocalDate();
		this.initTime();
		this.btn_close.selected = true;
		this.btn_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.txt_hour.addEventListener(egret.FocusEvent.FOCUS_OUT, this.checkHour, this);//失去焦点时调度
		this.txt_minute.addEventListener(egret.FocusEvent.FOCUS_OUT, this.checkMinute, this);
		this.txt_second.addEventListener(egret.FocusEvent.FOCUS_OUT, this.checkSecond, this);
		this.btn_today.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
		// this.init();
	}
	private onRemoved(): void {
		this.btn_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.autoList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
		this.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.txt_hour.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.checkHour, this);//失去焦点时调度
		this.txt_minute.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.checkMinute, this);
		this.txt_second.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.checkSecond, this);
		this.btn_today.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
		this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
		this.removeEventListener(egret.Event.COMPLETE, this.uiComponent, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
	}

	private onCloseClick(evt: egret.TouchEvent): void {
		let data: Object = new Object();
		switch (evt.currentTarget) {

			case this.btn_today:
				this.getLocalDate();
				// return;
				break;
			case this.btn_close:

				break;
		}
		data["loadType"] = this.loadType;
		this.dateArr[1] = this.dateArr[1] - 1;
		data["date"] = this.dateArr;

		this.loadObj.dispatchEvent(new ActionEvent(ActionEvent.DATEREMOVED, data));
		// this.loadObj.removeChildren();
		this.loadObj.removeChild(this);
	}
	/**
	 * 得到当前时间
	 */
	private getLocalDate(): void {
		let date: Date = new Date();
		this.years = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
		this.localyears = date.getFullYear();
		this.localmonth = date.getMonth() + 1;
		this.localday = date.getDate();
		if (this.loadType == 1) {
			this.hour = 0;//date.getHours();
			this.minute = 0;//date.getMinutes();
			this.second = 0; //date.getSeconds();
		} else {
			this.hour = 23;//date.getHours();
			this.minute = 59;//date.getMinutes();
			this.second = 59; //date.getSeconds();
		}
		this.initDate();
		this.initDateUI(this.years, this.month);
	}
	/**
	 * 检查"时"
	 */
	private checkHour(): void {
		// this.txt_hour.text = dateArr[3] > 9 ? dateArr[3] + '' : "0" + dateArr[3];

		let dateArr = this.dateArr;
		var hour: number = parseInt(this.txt_hour.text);
		if (hour < 0) {
			hour = 0;
			// this.txt_hour.text = '' + this.hour;
			//console.log(hour + "***23***");
		} else if (hour > 23) {
			//console.log(hour + "***0***");
			hour = 23;
			// this.txt_hour.text = '' + this.hour;
		} else if (hour <= 23 && hour > 0) {
			hour = hour;
		} else {
			hour = 0;
		}
		this.hour = hour;
		dateArr[3] = hour;
		this.txt_hour.text = '';
		this.txt_hour.prompt = dateArr[3] > 9 ? dateArr[3] + '' : "0" + dateArr[3];
	}
	/**
	 * 检查"分"
	 */
	private checkMinute(): void {
		let dateArr = this.dateArr;
		// this.txt_minute.text = dateArr[4] > 9 ? dateArr[4] + '' : "0" + dateArr[4];

		var minute: number = parseInt(this.txt_minute.text);
		if (minute < 0) {
			minute = 0
			// this.txt_minute.text = '' + this.minute;
		} else if (minute > 59) {
			minute = 59;
			// this.txt_minute.text = '' + this.minute;
		} else if (minute <= 59 && minute > 0) {
			minute = minute;
		} else {
			minute = 0;
		}
		this.minute = minute;
		dateArr[4] = minute;
		this.txt_minute.text = '';
		this.txt_minute.prompt = minute > 9 ? minute + '' : "0" + dateArr[4];
	}
	/**
	 * 检查"秒"
	 */
	private checkSecond(): void {
		let dateArr = this.dateArr;
		var second: number = parseInt(this.txt_second.text);

		if (second < 0) {
			second = 0;
			// this.txt_second.text = '' + this.second;
		} else if (second > 59) {
			second = 59;
			// this.txt_second.text = '' + this.second;
		}
		else if (second <= 59 && second > 0) {
			second = second;
		} else {
			second = 0;
		}

		this.second = second;
		dateArr[5] = this.second;
		this.txt_second.text = '';
		this.txt_second.prompt = dateArr[5] > 9 ? dateArr[5] + '' : "0" + dateArr[5];
	}
	/**
	 * 年月切换
	 */
	private onClick(evt: egret.TouchEvent): void {
		let years: number = this.years;
		let month: number = this.month;
		switch (evt.currentTarget) {
			case this.btn_pre:
				month--;
				break;

			case this.btn_next:
				month++;
				break;
		}
		if (month == 13) {
			years++;
			month = 1;
		} else if (month == 0) {
			years--;
			month = 12;
		}
		this.initDateUI(years, month);
	}
	private initDate(): void {
		let timeArr: Array<number> = this.dateArr;
		timeArr[0] = this.years;
		timeArr[1] = this.month;
		timeArr[2] = this.day;
		timeArr[3] = this.hour;
		timeArr[4] = this.minute;
		timeArr[5] = this.second;
		console.log("TimeArr1", timeArr);
		this.showDateUI();
	}
	private showDateUI(): void {
		let dateArr: Array<number> = this.dateArr;
		this.txt_year.text = dateArr[0] + '';
		this.txt_month.text = dateArr[1] > 9 ? dateArr[1] + '' : "0" + dateArr[1];
		// this.txt_month.text = timeArr[1] + '';
		// this.txt_hour.prompt = dateArr[3] > 9 ? dateArr[3] + '' : "0" + dateArr[3];
		// this.txt_minute.prompt = dateArr[4] > 9 ? dateArr[4] + '' : "0" + dateArr[4];
		// this.txt_second.prompt = dateArr[5] > 9 ? dateArr[5] + '' : "0" + dateArr[5];
		// this.txt_hour.text = dateArr[3] > 9 ? dateArr[3] + '' : "0" + dateArr[3];
		// this.txt_minute.text = dateArr[4] > 9 ? dateArr[4] + '' : "0" + dateArr[4];
		// this.txt_second.text = dateArr[5] > 9 ? dateArr[5] + '' : "0" + dateArr[5];
	}

	/**
	 * 初始化月历的ui
	 */
	private initDateUI(years: number, month: number): void {
		this.years = years;
		this.month = month;
		let days: number = this.calculateDays(years, month);
		let times: string = '' + years + "," + month + "," + 1;
		let weeks: number = new Date(times).getDay();
		this.txt_year.text = years + '';
		this.txt_month.text = month + '';
		this.init(weeks, days);

		console.log("TimeArr", this.dateArr);
	}
	/**
	 * 计算当前月的第一天是星期几
	 */
	private calculateWeek(): number {

		return 0;
	}
	/**
	 * 是否是闰年
	 */
	private isLeapYear(year) {
		return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	}
	/**
	 * 计算这个月有多少天
	 */
	private calculateDays(year, month) {
		var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var days = months[month - 1];
		// 2月比较特殊，非闰年28天，闰年29天，如2008年2月为29天
		if (1 == month && this.isLeapYear(year)) {
			days = 29;
		}
		return days;
	}
	private autoList: eui.List;

	private init(lastMonth: number, days: number): void {
		let select: number = 0;
		let dateArr: Array<number> = this.dateArr;
		let timeArr: Array<Object> = new Array<Object>();
		for (var i = 0; i < lastMonth; i++) {
			timeArr.push({ times: null, selected: select });
		}
		for (var i = 1; i <= days; i++) {

			if (!this.isClick && this.localyears == this.years && this.localmonth == this.month && this.localday == this.day) {
				if (this.localday == i) {
					select = 1;
				} else {
					select = 0;
				}
			} else if (dateArr[0] == this.years && dateArr[1] == this.month && dateArr[2] == this.day) {
				if (dateArr[2] == i) {
					select = 1;
				} else {
					select = 0;
				}
			}
			timeArr.push({ times: i, selected: select });
		}

		this.autoList.dataProvider = new eui.ArrayCollection(timeArr);
		this.autoList.itemRenderer = TimeList;
		if (!this.autoList.hasEventListener(eui.ItemTapEvent.ITEM_TAP)) {
			this.autoList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
		}

	}
	private onChange(): void {
		this.isClick = true;
		let dateArr: Array<number> = this.dateArr;
		dateArr[0] = this.years;
		dateArr[1] = this.month;
		dateArr[2] = this.autoList.selectedItem["times"];
		this.day = this.autoList.selectedItem["times"];
		console.log(this.dateArr);
	}
	private initToday(): void {

	}
	/**
	 * 
	 */
	private initTime(): void {
		//初始化测试
		// this.txt_hour.text = "23";
		// this.txt_minute.text = "59";
		// this.txt_second.text = "59";
		this.txt_hour.restrict = "0-9";
		this.txt_minute.restrict = "0-9";
		this.txt_second.restrict = "0-9";
		this.txt_hour.maxChars = 2;
		this.txt_minute.maxChars = 2;
		this.txt_second.maxChars = 2;



	}

}
class TimeList extends eui.ItemRenderer {
	// private TimeArr: Array<number> = ManageTime.TimeArr;
	constructor() {
		super();
		this.skinName = listSkin;
	}
	private radios: eui.RadioButton;
	// private dates: eui.Label;
	protected createChildren(): void {
		super.createChildren();
	}
	protected dataChanged(): void {
		let dateGroup: eui.Group = this.radios.getChildByName("dateGroup") as eui.Group;
		let dates: eui.Label = dateGroup.getChildByName("dates") as eui.Label;
		let date: string = this.data["times"]
		if (date == null) {
			this.radios.touchEnabled = false;
		}
		dates.text = date;
		if (this.data["selected"] == 1) {
			this.radios.selected = true;
		}
		/*if (this.radios.selected) {
			this.dates.textColor = 0x05314a;
		} else {
			this.dates.textColor = 0x69c3de;
		}*/
	}
}
