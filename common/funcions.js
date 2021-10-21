import {marginHorizontal} from "./const";

export const calcImageDimensions = (windowWidth, ratio, columnCount) => {
//    const width = )
    const width = Math.floor((windowWidth -  2 * marginHorizontal - (columnCount-1) * marginHorizontal)/ columnCount)

    return {
        width,
        height: Math.floor(width * ratio)
    }
}
