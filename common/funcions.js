import {marginHorizontal} from "./const";

export const calcImageDimensions = (windowWidth, ratio, columnCount = 1) => {

    const width = Math.round((windowWidth - 2 * marginHorizontal - (columnCount - 1) * marginHorizontal) / columnCount)

    return {
        width,
        height: Math.round(width * ratio)
    }
}
