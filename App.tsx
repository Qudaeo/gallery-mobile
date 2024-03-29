/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import GalleryScreen from './src/screens/GalleryScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailedImageScreen from './src/screens/DetailedImageScreen';
import {store} from './src/mobx/store';
import {Provider} from 'mobx-react';
import LargeImageScreen from './src/screens/LargeImageScreen';

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
