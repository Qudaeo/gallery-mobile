import React from "react";
import {useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {marginHorizontal, marginVertical} from "../../common/const";
import {calcImageDimensions} from "../../common/funcions";


export const GalleryRow = (props) => {

    const appWidth = useWindowDimensions().width

    let imageDimensions = props.row.map(image =>
        calcImageDimensions(appWidth, image.height / image.width, props.row.length))

    let imageRowDimensions = imageDimensions.map(el => ({...el}))

    if (imageDimensions.length === 2 ) {
        const h = Math.abs((Math.round(imageRowDimensions[0]['height']) + Math.round(imageRowDimensions[1]['height']))/2)

        imageRowDimensions[0]['width'] = Math.round(imageDimensions[0]['width'] * h/imageDimensions[0]['height'])
        imageRowDimensions[0]['height'] =Math.round(h)

        imageRowDimensions[1]['width'] = Math.round(imageDimensions[1]['width'] * h/imageDimensions[1]['height'])
        imageRowDimensions[1]['height'] =Math.round(h)

        const ratio =  (imageDimensions[0]['width'] + imageDimensions[1]['width']) /(imageRowDimensions[0]['width'] + imageRowDimensions[1]['width'])

        imageRowDimensions = imageRowDimensions.map(el => ({
            width: Math.round(el.width * ratio),
            height: Math.round(el.height * ratio)
        }))

        imageDimensions = imageRowDimensions
    }




    //   const rowImageRatio = props.row.map(image => imageDimensions.width / (image.width + image.height))

    return <>
        {/*<Text>{JSON.stringify(imageDimensions)}</Text>*/}

        {/*<Text>{JSON.stringify(imageRowDimensions)}</Text>*/}
        <View style={[{
            flexDirection: 'row',
            //       direction: 'row',
            marginVertical: marginVertical,
        }]}>

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
    </>
}

export default GalleryRow
