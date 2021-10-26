import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {observer} from "mobx-react";
import {actionsPictures, marginHorizontal, marginVertical} from "../../common/const"
import {calcImageDimensions} from "../../common/funcions"
import {useStore} from "../../mobx/store";
import PhotoAction from "./PhotoAction";
import locationPicture from "../../images/DetailedImage/location.png"
import moment from "moment"



const DetailedImageScreen = (props) => {
    const {galleryStore} = useStore()

    const photoGalleryInfo = galleryStore.gallery.find(el => (el.id === galleryStore.selectedDetailPhotoId))
    const takenPhoto = moment(new Date(photoGalleryInfo.created_at)).format('DD MMM YYYY')
    const uploaded = moment(new Date(photoGalleryInfo.updated_at)).fromNow();

    const photo = galleryStore.detailPhoto[galleryStore.selectedDetailPhotoId]

    const windowWidth = useWindowDimensions().width
    const photoDimensions = calcImageDimensions(windowWidth, windowWidth * photo.height / photo.width, 1)

    const openLargeImage = () => {
        if (galleryStore.isAppInternetReachable) {
            props.navigation.navigate('LargeImageScreen')
        } else {
            alert('Check internet connection!')
        }

    }

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
                    {photo.description ? photo.description : "No description"}
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
                        {'by ' + photo.user.name + '  •  '}
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
        {photo.user.location &&
        <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
            <Image source={locationPicture} style={{width: 20, height: 20}}/>
            <View style={{marginLeft: 5}}>
                <Text style={{
                    textDecorationStyle: "dashed",
                    textDecorationLine: "underline",
                    textDecorationColor: 'rgb(0, 0, 153)'
                }}>{photo.user.location}</Text>
            </View>
        </View>}
        <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
            <Text style={{marginLeft: 5, fontWeight: "bold"}}>
                {`Taken: ${takenPhoto}      Uploaded: ${uploaded}`}
            </Text>

        </View>


        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            <Text>{JSON.stringify(photo)}</Text>
        </View>


    </ScrollView>
}

export default observer(DetailedImageScreen)
