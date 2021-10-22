import React from "react";
import {Text, useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {marginHorizontal, marginVertical} from "../../common/const";
import {calcImageDimensions} from "../../common/funcions";


export const GalleryRow = (props) => {

    const appWidth = useWindowDimensions().width

    const imageDimensions = props.row.map(image =>
        calcImageDimensions(appWidth, image.height / image.width, props.row.length))

    //   const rowImageRatio = props.row.map(image => imageDimensions.width / (image.width + image.height))

    return <View style={[{
        flexDirection: 'row',
        //       direction: 'row',
        marginVertical: marginVertical,
    }]}>
        {/* <Text>{JSON.stringify(imageDimensions)}</Text>*/}
        {props.row.map((el, index) => <View key={el.id} style={{
                width: imageDimensions[index].width,
                height: imageDimensions[index].height,
                marginLeft: marginHorizontal,
            }}>
                <GalleryItem image={el}
                             navigation={props.navigation} imageDimensions={imageDimensions[index]}/>
            </View>
        )}
    </View>
}

export default GalleryRow
