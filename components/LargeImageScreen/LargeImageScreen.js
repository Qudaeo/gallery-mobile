import React from "react";

import {
    Text,
} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";

const LargeImageScreen = () => {

    const {galleryStore} = useStore()

    return (<Text style={{
            fontSize: 25,
            fontWeight: "bold"
        }}
        >{galleryStore.detailPhoto.id}</Text>


    )

}
export default observer(LargeImageScreen)
