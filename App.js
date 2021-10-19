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

const App = () => {
    return <Provider {...Store}>
        <Gallery/>
    </Provider>
};

export default App
