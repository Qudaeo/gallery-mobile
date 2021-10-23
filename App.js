/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback} from 'react';
import GalleryScreen from "./components/GalleryScreen/GalleryScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import DetailedImageScreen from "./components/DetailedImageScreen/DetailedImageScreen";
import {store} from "./mobx/store";
import {Provider} from "mobx-react";
import LargeImageScreen from "./components/LargeImageScreen/LargeImageScreen";

const App = () => {

    const Stack = createStackNavigator();

    const handleBlur = useCallback(() => {
        alert('good')
    }, [])

    return <Provider store={store}
                     galleryStore={store.galleryStore}>

        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}
                             onBlur ={handleBlur}>
                <Stack.Screen
                    name="GalleryScreen"
                    component={GalleryScreen}
                />
                <Stack.Screen
                    name="DetailedImageScreen"
                    component={DetailedImageScreen}
                />
                <Stack.Screen
                    name="LargeImageScreen"
                    component={LargeImageScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>

    </Provider>
}

export default App
