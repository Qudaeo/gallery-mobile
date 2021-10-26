import {marginHorizontal} from "./const";

export const calcImageDimensions = (oldWidth, oldHeight, columnCount = 1) => {

    const newWidth = Math.round((oldWidth - 2 * marginHorizontal - (columnCount - 1) * marginHorizontal) / columnCount)

    return {
        width: newWidth,
        height: Math.round(newWidth * oldHeight / oldWidth)
    }
}
