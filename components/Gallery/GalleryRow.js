import React from "react";
import {Text, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {marginVertical} from "../../common/const";


export const GalleryRow = (props) => {

    const heightRowSum = props.row.reduce((sum, el) => sum += el.height, 0)

    return <View style={[{

        flexDirection: 'row',
 //       direction: 'row',


        marginVertical: marginVertical,
    }]}>
        {props.row.map(el => <View key={el.id}  /*style={{
            width: Math.round((el.height / heightRowSum) * 100) + '%'
        }} */>
            {/*<Text>{Math.round((el.height / heightRowSum) * 100) + '%'}</Text>*/}
                <GalleryItem image={el} rowRatio={el.height / heightRowSum}
                             navigation={props.navigation}/>
            </View>
        )}
    </View>
}

export default GalleryRow
