/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ToggleColumnCount from "../components/GalleryScreen/ToggleColumnCount";
import {fireEvent, render} from "@testing-library/react-native";
import GalleryStore from "../mobx/GalleryStore";

it('1. render correctly', () => {
    const galleryStore = new GalleryStore

    renderer.create(<ToggleColumnCount
        appColumnCount={galleryStore.appColumnCount}
        toggleColumnCount={galleryStore.toggleColumnCount}
        isAppInternetReachable={galleryStore.isAppInternetReachable}
        isFetchingInProgress={galleryStore.isFetchingInProgress}
    />)
})

for (let isAppInternetReachable of [true, false]) {
    for (let appColumnCount of [1, 2]) {
        for (let isFetchingInProgress of [true, false]) {
            test(`2. Match to Snapshots: isAppInternetReachable=${isAppInternetReachable}; appColumnCount=${appColumnCount}; isFetchingInProgress=${isFetchingInProgress}`, () => {
                const tree = renderer.create(<ToggleColumnCount
                    toggleColumnCount={() => {
                    }}
                    isAppInternetReachable={isAppInternetReachable}
                    appColumnCount={appColumnCount}
                    isFetchingInProgress={isFetchingInProgress}
                />).toJSON()
                expect(tree).toMatchSnapshot()
            })
        }
    }
}


it('3. press the toggle', () => {

    const mockStore = {
        appColumnCount: 1,
        toggleColumnCount: function () {
            this.appColumnCount = 2
        }
    }

    const TestComponent = () => <ToggleColumnCount
        toggleColumnCount={
            mockStore.toggleColumnCount.bind(mockStore)
        }
        isAppInternetReachable={true}
        appColumnCount={mockStore.appColumnCount}
        isFetchingInProgress={false}
    />

    const {getByTestId, rerender} = render(<TestComponent/>)

    fireEvent.press(getByTestId("TouchableOpacityText"))
    rerender(<TestComponent/>)

    expect(getByTestId("TouchableOpacityText").props.children[0].props.children).toEqual(2)
})

