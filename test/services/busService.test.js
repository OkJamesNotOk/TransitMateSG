import {
	getBusArrivals,
	getBusStops,
	getBusRoutes,
} from '../../services/busService';

describe('busService', () => {
    // mock fetch instead of calling real api 
	beforeEach(() => {
		global.fetch = jest.fn();
	});

    // reset after each test
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getBusArrivals', () => {
		test('returns bus arrival services', async () => {
            // sample bus arrivals data
			const mockServices = [
				{
					ServiceNo: '10',
					Operator: 'SBST',
				},
				{
					ServiceNo: '20',
					Operator: 'SBST',
				},
			];

            // simulate a successful API response
			fetch.mockResolvedValue({
				ok: true,
				json: jest.fn().mockResolvedValue({
					Services: mockServices,
				}),
			});

			const result = await getBusArrivals('12345');

            // check that the returned services match the api data
			expect(result).toEqual(mockServices);

            // check that the correct bus stop code and GET method are used
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining('BusStopCode=12345'),
				expect.objectContaining({
					method: 'GET',
				})
			);
		});

        // simulate api response with no services
		test('returns empty array when no services available', async () => {
			fetch.mockResolvedValue({
				ok: true,
				json: jest.fn().mockResolvedValue({}),
			});

			const result = await getBusArrivals('12345');

			expect(result).toEqual([]);
		});

        // check that a failed request throw expected error
		test('throws error when bus arrival request fails', async () => {
			fetch.mockResolvedValue({
				ok: false,
			});

			await expect(getBusArrivals('12345'))
            .rejects.toThrow('Unable to retrieve bus arrivals');
		});
	});

	describe('getBusStops', () => {
        // check that data is returned from api
		test('returns bus stops from API', async () => {
            // sample bus stops data
			const mockStops = [
				{
					BusStopCode: '00001',
					Description: 'Stop 1',
				},
				{
					BusStopCode: '00002',
					Description: 'Stop 2',
				},
			];

			fetch.mockResolvedValue({
				ok: true,
				json: jest.fn().mockResolvedValue({
					value: mockStops,
				}),
			});

			const result = await getBusStops();
            
            // check that returned data is the same as sample data
			expect(result).toEqual(mockStops);
            
            // check that request first uses skip=0
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining('BusStops?$skip=0'),
				expect.any(Object)
			);
		});

        // check that a failed request throw expected error
		test('throws error when bus stops request fails', async () => {
			fetch.mockResolvedValue({
				ok: false,
			});

			await expect(getBusStops()).rejects.toThrow('Unable to retrieve bus stops');
		});
	});

	describe('getBusRoutes', () => {
		test('returns bus routes from API', async () => {
            // sample bus routes data
			const mockRoutes = [
				{
					ServiceNo: '10',
					Direction: 1,
					BusStopCode: '00001',
				},
				{
					ServiceNo: '20',
					Direction: 1,
					BusStopCode: '00002',
				},
			];

			fetch.mockResolvedValue({
				ok: true,
				json: jest.fn().mockResolvedValue({
					value: mockRoutes,
				}),
			});

			const result = await getBusRoutes();

            // check that returned data is the same as sample data
			expect(result).toEqual(mockRoutes);

            // check that request first uses skip=0
			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining('BusRoutes?$skip=0'),
				expect.any(Object)
			);
		});

        // check that a failed request throw expected error
		test('throws error when bus routes request fails', async () => {
			fetch.mockResolvedValue({
				ok: false,
			});

			await expect(getBusRoutes()).rejects.toThrow('Unable to retrieve bus routes');
		});
	});
});