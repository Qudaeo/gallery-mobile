import React from "react";

import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import ImageViewer from 'react-native-image-zoom-viewer';

const LargeImageScreen = () => {

    const {galleryStore} = useStore()

    return <ImageViewer
        imageUrls={[{url: galleryStore.detailPhoto.download_url}]}
        renderIndicator = {() => null}
//        backgroundColor = "white"
    />

}


//  return <Image source={{uri: photo.download_url}} style={styles.image}/>
/*
(<View style={styles.container}>
    <Image source={{uri: photo.download_url}} style={styles.image}/>

    <Text style={styles.description}>

    </Text>


    <Text style={styles.description}>
        Search
    </Text>

    <View style={styles.flowRight}>
        <TextInput
            style={styles.searchInput}
            placeholder='Search by Batch, Name, Interest...'/>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
    </View>

    <TouchableHighlight style={styles.button}
                        underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Location</Text>
    </TouchableHighlight>

</View>


)
*/


export default observer(LargeImageScreen)
