import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useStore} from "../../mobx/store";
import {observer} from "mobx-react";

const TagComponent = (props) => {
    const {galleryStore} = useStore()

    const openTagSearch = () => {
        if (galleryStore.isAppInternetReachable) {
 //           alert(props.tagTitle)
            galleryStore.searchTextChange(props.tagTitle)
            props.navigation.navigate('GalleryScreen')
        } else {
            alert('Check internet connection!')
        }
    }

    return <TouchableOpacity activeOpacity={.5} onPress={() => openTagSearch()}>
        <View style={{
            height: 30,
            borderWidth: 1,
            borderRadius: 8,
            margin: 5,
            alignItems: "center",
            justifyContent: 'center',
            alignSelf: 'flex-start'
        }}>
            <Text style={{marginHorizontal: 10}}>{props.tagTitle}</Text>
        </View>
    </TouchableOpacity>
}

export default observer(TagComponent)
