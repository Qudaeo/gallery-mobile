/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import GalleryScreen from './components/GalleryScreen/GalleryScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailedImageScreen from './components/DetailedImageScreen/DetailedImageScreen';
import {store} from './mobx/store';
import {Provider} from 'mobx-react';
import LargeImageScreen from './components/LargeImageScreen/LargeImageScreen';

export type GalleryNavigationProps = NativeStackNavigationProp<any>;

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider galleryStore={store.galleryStore}>
        <Stack.Navigator
          initialRouteName="GalleryScreen"
          screenOptions={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}>
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
          <Stack.Screen
            name="DetailedImageScreen"
            component={DetailedImageScreen}
          />
          <Stack.Screen name="LargeImageScreen" component={LargeImageScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
