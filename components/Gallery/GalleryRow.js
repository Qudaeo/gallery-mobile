import React from "react";
import {useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import { marginVertical} from "../../common/const";
import {calcImageDimensions} from "../../common/funcions";


export const GalleryRow = (props) => {

    const imageDimensions = calcImageDimensions(useWindowDimensions().width, props.row[0].height / props.row[0].width,props.row[0].length)

    return <View style={[{
        flexDirection: 'row',
        //       direction: 'row',
        marginVertical: marginVertical,
    }]}>
        {props.row.map(el => <View key={el.id} style={{
                //width: Math.round( 1 * 100) + '%'
            }}>

                <GalleryItem image={el}
                             navigation={props.navigation}/>
            </View>
        )}
    </View>
}

export default GalleryRow
