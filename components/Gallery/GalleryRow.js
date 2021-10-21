import React from "react";
import {View} from "react-native";
import GalleryItem from "./GalleryItem";

export const GalleryRow = (props) => (
    <View style={[{
        flex: 1,
        flexDirection: 'row'
    }]}>
        {props.row.map(el => <GalleryItem key={el.id} image={el} navigation={props.navigation}/>)}
    </View>
)

export default GalleryRow
