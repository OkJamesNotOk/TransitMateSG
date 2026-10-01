import React from 'react';
import { Keyboard } from 'react-native';
import { render, fireEvent, } from '@testing-library/react-native';

import BusStopSearch from '../../components/BusStopSearch';

describe('BusStopSearch', () => {
    // mock functions
	const mockSetSearchCode = jest.fn();
	const mockSelectBusStop = jest.fn();
	const mockSetShowDropdown = jest.fn();

	const mockBusStops = [
		{
			BusStopCode: '00001',
			Description: 'Stop 1',
			RoadName: 'Road 1',
		},
		{
			BusStopCode: '00002',
			Description: 'Central Station',
			RoadName: 'Main Road',
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(Keyboard, 'dismiss').mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	// check that the search input is displayed
	test('displays the bus stop search input', async () => {
		const { getByPlaceholderText } = await render(
			<BusStopSearch
				searchCode=""
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={false}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		expect(getByPlaceholderText('Search bus stop')).toBeTruthy();
	});

	// check that matching bus stops are displayed
	test('filters bus stops using search text', async () => {
		const { getByText, queryByText } = await render(
			<BusStopSearch
				searchCode="Central"
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={true}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		expect(getByText('Central Station')).toBeTruthy();
		expect(queryByText('Stop 1')).toBeNull();
	});

	// check that typing updates search and opens dropdown
	test('updates search text when user types', async () => {
		const { getByPlaceholderText } = await render(
			<BusStopSearch
				searchCode=""
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={false}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		fireEvent.changeText(getByPlaceholderText('Search bus stop'), '00001');

		expect(mockSetSearchCode).toHaveBeenCalledWith('00001');
		expect(mockSetShowDropdown).toHaveBeenCalledWith(true);
	});

	// check that selecting a stop closes search and returns the stop
	test('selects a bus stop from search results', async () => {
		const { getByText } = await render(
			<BusStopSearch
				searchCode="00001"
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={true}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		fireEvent.press(getByText('Stop 1'));

		expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
		expect(Keyboard.dismiss).toHaveBeenCalled();
		expect(mockSelectBusStop).toHaveBeenCalledWith(mockBusStops[0]);
	});

	// check that clear button removes search text
	test('clears search text when X is pressed', async () => {
		const { getByText } = await render(
			<BusStopSearch
				searchCode="00001"
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={true}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		fireEvent.press(getByText('X'));

		expect(mockSetSearchCode).toHaveBeenCalledWith('');
	});

	// check that Dismiss closes the dropdown
	test('closes search dropdown when Dismiss is pressed', async () => {
		const { getByText } = await render(
			<BusStopSearch
				searchCode=""
				setSearchCode={mockSetSearchCode}
				busStops={mockBusStops}
				selectBusStop={mockSelectBusStop}
				showDropdown={true}
				setShowDropdown={mockSetShowDropdown}
			/>
		);

		fireEvent.press(getByText('Dismiss'));

		expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
		expect(Keyboard.dismiss).toHaveBeenCalled();
	});
});