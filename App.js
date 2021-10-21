/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Gallery from "./components/Gallery/Gallery";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import DetailedImage from "./components/DetailedImage/DetailedImage";
import {store} from "./mobx/store";
import {Provider} from "mobx-react";

const App = () => {

    const Stack = createStackNavigator();

    return <Provider store={store}
                     galleryStore={store.galleryStore}>

        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="Gallery"
                    component={Gallery}
                />
                <Stack.Screen
                    name="DetailedImage"
                    component={DetailedImage}
                />
            </Stack.Navigator>
        </NavigationContainer>

    </Provider>
}

export default App
