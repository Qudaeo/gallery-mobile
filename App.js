/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import Gallery from "./components/Gallery";
import {Provider} from "mobx-react";
import Store from "./mobx/store";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (<Provider {...Store}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <Text>***</Text>
                    <Gallery/>
                    <Text>***</Text>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

export default App

/*
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})
 */


