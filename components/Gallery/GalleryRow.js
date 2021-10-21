import React from "react";
import {View} from "react-native";
import GalleryItem from "./GalleryItem";
import {marginVertical} from "../../common/const";

export const GalleryRow = (props) => (
    <View style={[{
        flex: 1,
        flexDirection: 'row',

        marginVertical: marginVertical,
    }]}>
        {props.row.map(el => <GalleryItem key={el.id} image={el} navigation={props.navigation}/>)}
    </View>
)

export default GalleryRow
