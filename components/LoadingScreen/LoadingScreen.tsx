import {Text, View} from "react-native";
import React from "react";

type IProps = {
    messageText: string
}

const LoadingScreen: React.FC<IProps> = ({messageText}) => <View style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
}}>
    <Text style={{
        fontSize: 25,
    }}>{messageText}</Text>
</View>

export default LoadingScreen
