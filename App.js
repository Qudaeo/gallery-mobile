/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';


import Gallery from "./components/Gallery";
import {Provider} from "mobx-react";
import Store from "./mobx/store";
import {isDarkMode} from "./common/colorSchemeStyles";

const App = () => {
    return (<Provider {...Store}>
            {/*<SafeAreaView style={backgroundStyle}>*/}
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>

            <Gallery/>

            {/*</SafeAreaView>*/}
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


