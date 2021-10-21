import React from "react";
import {View} from "react-native";
import GalleryItem from "./GalleryItem";

export const GalleryRow = (props) => (
    <View>
        {props.row.map(el => <GalleryItem key={el.id} image={el} navigation={props.navigation}/>)}
    </View>
)

export default GalleryRow
