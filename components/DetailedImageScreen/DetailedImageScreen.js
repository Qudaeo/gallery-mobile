import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {observer} from "mobx-react";
import {actionsPictures, marginHorizontal, marginVertical} from "../../common/const"
import {calcImageDimensions} from "../../common/funcions"
import {useStore} from "../../mobx/store";
import PhotoAction from "./PhotoAction";

const DetailedImageScreen = (props) => {
    const {galleryStore} = useStore()
    const photo = galleryStore.detailPhoto[galleryStore.selectedDetailPhotoId]

    const windowWidth = useWindowDimensions().width
    const photoDimensions = calcImageDimensions(windowWidth, windowWidth * photo.height / photo.width, 1)

    const openLargeImage = () => {
        props.navigation.navigate('LargeImageScreen')
    };

    return <ScrollView style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical
    }}>
        <TouchableOpacity activeOpacity={.5} onPress={() => openLargeImage()}>
            <Image
                style={{
                    width: photoDimensions.width,
                    height: photoDimensions.height
                }}
                source={{uri: galleryStore.base64Images[photo.id]}}
            />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            {actionsPictures.map((el, index) => <PhotoAction key={index} index={index}/>)}
        </View>
        <View
            style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            <TouchableOpacity>
                <Image
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        marginLeft: 15
                    }}
                    source={{uri: photo.user.profile_image.large}}
                />
            </TouchableOpacity>
            <View style={{left: 20, height: 80}}>
                <Text style={{fontSize: 20, fontWeight: "900", paddingTop: 7}}>
                    {photo.description ? photo.description : "No title"}
                </Text>

                <View style={{
                    flex: 1,
                    textAlignVertical: "bottom",
                    paddingBottom: 12,
                    flexDirection: 'row'
                }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "500",
                        }}>
                        {'by ' + photo.user.name + '  • '}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "700",
                                color: "rgb(102, 163, 255)"
                            }}>
                            {'Follow'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>


        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            <Text>{JSON.stringify(photo)}</Text>
        </View>


    </ScrollView>
}

export default observer(DetailedImageScreen)
