import {renderHook, act, waitFor,} from '@testing-library/react-native';

import useBookmarks from '../../uitilities/useBookmarks';

import {
	BOOKMARKED_STOPS_KEY,
	saveCache,
	getCache,
} from '../../services/Storage';

// mock useFocusEffect so bookmarks load when hook renders
jest.mock('@react-navigation/native', () => {
	const React = require('react');

	return {
		useFocusEffect: (callback) => {
		React.useEffect(() => {
			return callback();
		}, [callback]);
		},
	};
});

// mock storage functions instead of using real storage
jest.mock('../../services/Storage', () => ({
	BOOKMARKED_STOPS_KEY: 'bookmarkedStops',
	saveCache: jest.fn(),
	getCache: jest.fn(),
}));


describe('useBookmarks', () => {
	// reset after each test
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// check that bookmarks successfully load from storage
	test('loads bookmarked stops from storage', async () => {
		// sample bookmarks
		const storedBookmarks = [
			{
				BusStopCode: '00001',
				Description: 'Stop 1',
				RoadName: 'Road 1',
			},
		];

		getCache.mockResolvedValue(storedBookmarks);

		const { result } = await renderHook(() => useBookmarks());

		await waitFor(() => {
			expect(result.current.bookmarkedStops).toEqual(storedBookmarks);
		});
		// check that the correct storage key was used
		expect(getCache).toHaveBeenCalledWith(BOOKMARKED_STOPS_KEY);
	});

	// check that a bus stop successfully added to bookmark
	test('adds bus stop to bookmarks', async () => {
		getCache.mockResolvedValue([]);

		saveCache.mockResolvedValue(true);

		const newStop = {
			BusStopCode: '00002',
			Description: 'Stop 2',
			RoadName: 'Road 2',
		};

		const { result } = await renderHook(() => useBookmarks());

		await waitFor(() => {
			expect(result.current.bookmarkedStops).toEqual([]);
		});

		await act(async () => {
			await result.current.toggleBookmark(newStop);
		});

		expect(result.current.bookmarkedStops).toEqual([newStop,]);

		// check that the updated bookmarks are saved to storage
		expect(saveCache).toHaveBeenCalledWith(BOOKMARKED_STOPS_KEY,[newStop]);
	});

	// check that an existing bookmark is succesfully removed
	test('removes a bus stop if already bookmarked', async () => {
		// sample bookmarks
		const stop1 = {
			BusStopCode: '00001',
			Description: 'Stop 1',
			RoadName: 'Road 1',
		};

		const stop2 = {
			BusStopCode: '00002',
			Description: 'Stop 2',
			RoadName: 'Road 2',
		};

		// simulate both stops saved as bookmarks
		getCache.mockResolvedValue([stop1,stop2,]);

		saveCache.mockResolvedValue(true);

		const { result } = await renderHook(() => useBookmarks());

		await waitFor(() => {
			expect(result.current.bookmarkedStops).toEqual([stop1,stop2,]);
		});

		// toggle stop1 to remove
		await act(async () => {
			await result.current.toggleBookmark(stop1);
		});

		// check that only stop2 remains
		expect(result.current.bookmarkedStops).toEqual([stop2,]);

		// check that saveCahe saves only stop2
		expect(saveCache).toHaveBeenCalledWith(BOOKMARKED_STOPS_KEY,[stop2]);
	});
});