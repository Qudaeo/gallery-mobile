import {marginHorizontal} from "./const";

export const calcImageDimensions = (windowWidth, ratio, columnCount = 1) => {
    const width = Math.floor(windowWidth - (2 * columnCount - 1) * marginHorizontal)

    return {
        width,
        height: Math.floor(width * ratio)
    }
}
