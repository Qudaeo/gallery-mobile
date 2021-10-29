import {Text, View} from "react-native";
import React from "react";

const LoadingScreen = ({messageText}) => <View style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
}}>
    <Text style={{
        fontSize: 25,
    }}>{messageText}</Text>
</View>

export default LoadingScreen
