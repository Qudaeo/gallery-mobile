/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ToggleColumnCount from "../components/GalleryScreen/ToggleColumnCount";
import GalleryStore from "../mobx/GalleryStore";

it('1. renders correctly', () => {
    const galleryStore = new GalleryStore

    renderer.create(<ToggleColumnCount
        appColumnCount={galleryStore.appColumnCount}
        toggleColumnCount={galleryStore.toggleColumnCount}
        isAppInternetReachable={galleryStore.isAppInternetReachable}
        isFetchingInProgress={galleryStore.isFetchingInProgress}
    />)
})

test('2. toMatchSnapshot 1', () => {
    const tree = renderer.create(<ToggleColumnCount
        toggleColumnCount={() => {
        }}
        isAppInternetReachable={true}
        appColumnCount={1}
        isFetchingInProgress={false}
    />).toJSON()
    expect(tree).toMatchSnapshot()
})

test('3. toMatchSnapshot 2', () => {
    const tree = renderer.create(<ToggleColumnCount
        toggleColumnCount={() => {
        }}
        isAppInternetReachable={false}
        appColumnCount={2}
        isFetchingInProgress={true}
    />).toJSON()
    expect(tree).toMatchSnapshot()
})
