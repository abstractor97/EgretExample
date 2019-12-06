module wy {

    /**
     * json文件数据操作类
	 * 
     */
	export class Json {

		//json数据源
		private jsondata: any;

		//json数据类型：0：object， 1：array, -1:其它类型（会导致操作无效）
		private datatype: number;

		public constructor(data?) {
			if (data) {
				this.jsondata = data;
				this.updateType();
			}
		}

		/**
		 * 设置操作的json数据源
		 * @param data
		 */
		public setData(data: any): void {
			if (data && data instanceof Object) {
				this.jsondata = data;
				this.updateType();
			}
		}

		/**
		 * 根据索引来获取对应的数据（datatype为Array时有效）
		 * 当index小于0时，返回对应的整个数组，
		 * 当index大于0时，返回对应数组的索引index处的数据，
		 * 如果index大于对应数据数组的长度，则返回null
		 * 
		 * @param index
		 */
		public getDataByIndex(index: number, ...args): any {
			var ans: any = null;
			if (this.datatype == 1) {
				if (!args || args.length <= 0) {
					ans = this.jsondata[index];
				} else {
					var tmpdata = this.jsondata;
					for (var i = 0, len = args.length; i < len; ++i) {
						if (!tmpdata) break;
						for (var j = 0, l = tmpdata.length; j < l; ++j) {
							if (tmpdata[j].label == args[i]) {
								tmpdata = tmpdata[j].children;
								break;
							}
						}
					}
					if (index < 0) {
						ans = tmpdata;
					} else if (index < tmpdata.length) {
						ans = tmpdata[index];
					} else {
						ans = null;
					}
				}
			}
			return ans;
		}

		/**
		 * 根据label的值，来获取对应children数组
		 * @param ...args
		 */
		public getDataByLabel(...args): any {
			var ans: any = null;
			if (this.datatype == 1) {
				if (!args || args.length <= 0) {
					ans = null;
				} else {
					var tmpdata = this.jsondata;
					for (var i = 0, len = args.length; i < len; ++i) {
						if (!tmpdata) break;
						for (var j = 0, l = tmpdata.length; j < l; ++j) {
							if (tmpdata[j].label == args[i]) {
								tmpdata = tmpdata[j].children;
								break;
							}
						}
					}
					ans = tmpdata;
				}
			}
			return ans;
		}

		/**
		 * 根据label值来获取对应children里，每个元素的label组成的数组
		 * @param ...args
		 */
		public getLabelArray(...args): any {
			var ans: any = null;
			if (this.datatype == 1) {
				if (!args || args.length <= 0) {
					ans = null;
				} else {
					var tmpdata = this.jsondata;
					for (var i = 0, len = args.length; i < len; ++i) {
						if (!tmpdata) break;
						for (var j = 0, l = tmpdata.length; j < l; ++j) {
							if (tmpdata[j].label == args[i]) {
								tmpdata = tmpdata[j].children;
								break;
							}
						}
					}
					if (tmpdata && tmpdata.length > 0) {
						ans = [];
						for (var i = 0, l = tmpdata.length; i < l; i++) {
							if (!tmpdata[i].hasOwnProperty('label')) {
								throw Error('json 数据没有 label 属性 ');
							}
							ans.push(tmpdata[i].label);
						}
					}
				}
			}
			return ans;
		}

		/**
		 * 根据label值来获取对应children里，每个元素的label，用键值对，key做键，label做值，{key:label}组成数组
		 *
		 * @param key
		 * @param ...args
		 */
		public getLabelObjArray(key: string, ...args): any {
			if (!key) return null;
			var ans: any = null;
			if (this.datatype == 1) {
				if (!args || args.length <= 0) {
					ans = null;
				} else {
					var tmpdata = this.jsondata;
					for (var i = 0, len = args.length; i < len; ++i) {
						if (!tmpdata) break;
						for (var j = 0, l = tmpdata.length; j < l; ++j) {
							if (tmpdata[j].label == args[i]) {
								tmpdata = tmpdata[j].children;
								break;
							}
						}
					}
					if (tmpdata && tmpdata.length > 0) {
						ans = [];
						for (var i = 0, l = tmpdata.length; i < l; i++) {
							if (!tmpdata[i].hasOwnProperty('label')) {
								throw Error('json 数据没有 label 属性 ');
							}
							ans.push({ key: tmpdata[i].label });
						}
					}
				}
			}
			return ans;
		}

		/**
		 * 更新数据源类型信息
		 */
		private updateType() {
			if (this.jsondata) {
				if (this.jsondata instanceof Object && this.jsondata instanceof Array) {
					this.datatype = 1;
				} else if (this.jsondata instanceof Object) {
					this.datatype = 0;
				} else {
					this.datatype = -1;
				}
			} else {
				this.datatype = -1;
			}
			console.log('datatype=' + this.datatype);
		}
	}
}