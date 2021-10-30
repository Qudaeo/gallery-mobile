import React from "react";
import {useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {marginHorizontal, marginVertical} from "../../common/const";
import {calcImageDimensions} from "../../common/funcions";
import {useNavigation} from "@react-navigation/native";
import {GalleryNavigationProps} from "../../App";
import {PhotoType} from "../../mobx/GalleryStore";

type IProps = {
    row: PhotoType[]
}

export const GalleryRow: React.FC<IProps> = ({row}) => {

    const navigation = useNavigation<GalleryNavigationProps>();

    const appWidth = useWindowDimensions().width

    let imageDimensions = row.map(image =>
        calcImageDimensions(appWidth, appWidth * image.height / image.width, row.length))

    if (imageDimensions.length > 1) {

        const normalizedHeight = 10000
        const imageNormalizedHeightDimensions = imageDimensions.map(el => ({
            width: Math.round(el['width'] * normalizedHeight / el['height']),
            height: Math.round(normalizedHeight)
        }))

        const imagesWidth = imageDimensions.reduce((sum, el) => sum + el['width'], 0)
        const imagesHWidth = imageNormalizedHeightDimensions.reduce((sum, el) => sum + el['width'], 0)
        const ratio = imagesWidth / imagesHWidth

        imageDimensions = imageNormalizedHeightDimensions.map(el => ({
            width: Math.round(el.width * ratio),
            height: Math.round(el.height * ratio)
        }))
    }

    return <View
        style={[{
            flexDirection: 'row',
            marginVertical: marginVertical,
        }]}>

        {row.map((el, index) => <View key={el.id} style={{
                width: imageDimensions[index].width,
                height: imageDimensions[index].height,
                marginLeft: marginHorizontal,
            }}>
                <GalleryItem photo={el}
                             navigation={navigation} imageDimensions={imageDimensions[index]}/>
            </View>
        )}
    </View>
}

export default GalleryRow
