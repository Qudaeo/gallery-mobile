/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Gallery from "./components/Gallery";
import {Provider} from "mobx-react";
import Store from "./mobx/store";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import GalleryDetailedImage from "./components/GalleryDetailedImage";


const Stack = createStackNavigator();

const App = () => {
    return <Provider {...Store}>

        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="Gallery"
                    component={Gallery}
                />
                <Stack.Screen
                    name="GalleryDetailedImage"
                    component={GalleryDetailedImage}
                />
            </Stack.Navigator>
        </NavigationContainer>

    </Provider>
}

export default App
