import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {FlatList, Text, useWindowDimensions, View} from "react-native";
import GalleryImageItem from "./GalleryImageItem";

const Gallery = ({gallery, setAppWindowWidth, getNextPage}) => {

    const windowWidth = useWindowDimensions().width

    useEffect(() => {
        getNextPage()
    }, [])

    useEffect(() => {
        setAppWindowWidth(windowWidth)
    }, [windowWidth])

    /*
        <FlatList
      data={items}
      renderItem={(item) => <View key={item.index} style={styles.item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
     */


    return <View style={{flex: 1}}>
        {(gallery.length === 0)
            ? <Text>loading...</Text>
            : (gallery) && <FlatList
            data={gallery}
            renderItem={({item}) => <GalleryImageItem key={item.id} image={item} windowWidth={windowWidth}/>}
            onEndReached={() => {
                getNextPage()
            }}
            onEndReachedThreshold={0.5}
        />}
    </View>

    /*<ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>{windowWidth}</Text>
        {(gallery.length === 0)
            ? <Text>loading...</Text>
            : (gallery) && gallery.map(el =>
            <GalleryImageItem key={el.id} image={el} windowWidth={windowWidth}/>)
        }
    </ScrollView>*/
}


/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image:
});
*/

export default inject("gallery", "setAppWindowWidth", "getNextPage")(observer(Gallery))
