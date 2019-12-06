module wy {
        /**
         *
         */
        export interface IItemRenderer extends wy.BaseSprite {
                /**
                 * 要呈示或编辑的数据。
                 * @version 0.0.3
                 * @platform egret3.0.3
                 */
                data: any;
                /**
                 * 如果项呈示器可以将其自身显示为已选中，则为 true。
                 * @version 0.0.3
                 * @platform egret3.0.3
                 */
                selected: boolean;
                /**
                 * 项呈示器的数据提供程序中的项目索引。
                 * @version 0.0.3
                 * @platform egret3.0.3
                 */
                itemIndex: number;
        }
}