import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export const TagComponent = () => <TouchableOpacity>
    <View style={{
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'flex-start'
    }}>
        <Text style={{marginHorizontal: 10}}>123</Text>
    </View>
</TouchableOpacity>
