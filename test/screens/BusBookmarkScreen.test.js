import React from 'react';
import {render,fireEvent,} from '@testing-library/react-native';

import BusBookmarkScreen from '../../screens/BusBookmarkScreen';
import useBookmarks from '../../uitilities/useBookmarks';

// mock the bookmark hook
jest.mock('../../uitilities/useBookmarks', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// mock Ionicons so the star icon can be found in the test
jest.mock('@expo/vector-icons/Ionicons', () => {
    const React = require('react');
    const { Text } = require('react-native');

    // replace real icons with a text element with icon name as text
    return function MockIonicons({ name }) {
        return React.createElement(Text, null, name);
    };
});

describe('BusBookmarkScreen', () => {
    // mock navigation so the test can check where the screen navigates
    const mockNavigation = {
        popTo: jest.fn(),
    };

    // mock bookmark function
    const mockToggleBookmark = jest.fn();

    const mockBookmarkedStop = {
        BusStopCode: '00001',
        Description: 'Stop 1',
        RoadName: 'Road 1',
    };


    beforeEach(() => {
        jest.clearAllMocks();
    });

    // no saved bookmarks
    test('displays empty message when there are no bookmarked stops', async () => {
        useBookmarks.mockReturnValue({
            bookmarkedStops: [],
            toggleBookmark: mockToggleBookmark,
        });

        const { getByText } = await render(
            <BusBookmarkScreen navigation={mockNavigation} />
        );

        expect(getByText('No bookmarked bus stops.')).toBeTruthy();
    });

    // with bookmarks
    test('displays bookmarked bus stop information', async () => {
        useBookmarks.mockReturnValue({
            bookmarkedStops: [mockBookmarkedStop],
            toggleBookmark: mockToggleBookmark,
        });

        const { getByText } = await render(
            <BusBookmarkScreen navigation={mockNavigation} />
        );

        expect(getByText('Stop 1')).toBeTruthy();

        expect(getByText('Bus Stop 00001')).toBeTruthy();

        expect(getByText('Road 1')).toBeTruthy();
    });

    // check that View returns to BusHome with the selected stop code
    test('opens selected bookmarked bus stop when View is pressed', async () => {
        useBookmarks.mockReturnValue({
            bookmarkedStops: [mockBookmarkedStop],
            toggleBookmark: mockToggleBookmark,
        });

        const { getByText } = await render(
            <BusBookmarkScreen navigation={mockNavigation} />
        );

        fireEvent.press(getByText('View'));

        expect(mockNavigation.popTo).toHaveBeenCalledWith(
            'BusHome',
            {
                selectedBookmarkCode: '00001',
            }
        );
    });

    // check that the selected stop is passed to toggleBookmark
    test('removes bookmarked stop when star button is pressed', async () => {
        useBookmarks.mockReturnValue({
            bookmarkedStops: [mockBookmarkedStop],
            toggleBookmark: mockToggleBookmark,
        });

        const { getByText } = await render(<BusBookmarkScreen navigation={mockNavigation} />);

        fireEvent.press(getByText('star'));

        expect(mockToggleBookmark).toHaveBeenCalledWith(mockBookmarkedStop);
    });
});