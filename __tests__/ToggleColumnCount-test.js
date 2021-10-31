/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ToggleColumnCount from "../components/GalleryScreen/ToggleColumnCount";


it('renders correctly', () => {
    renderer.create(<ToggleColumnCount
        toggleColumnCount={1}
        isAppInternetReachable={true}
        appColumnCount={1}
        isFetchingInProgress={false}
    />)
})
