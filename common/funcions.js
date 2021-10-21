import {marginHorizontal} from "./const";

export const calcImageDimensions = (windowWidth, ratio) => {
    const width = Math.floor(windowWidth - 2 * marginHorizontal)

    return {
        width,
        height: Math.floor(width * ratio)
    }
}
