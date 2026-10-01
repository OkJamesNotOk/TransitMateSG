import calculateDistance from '../../uitilities/calculateDistance';

describe('calculateDistance', () => {
    // same coordinates should have no distance
    test('return 0 when both coordinates are the same', () => {
        const distance = calculateDistance(
            1.290,
            103.851,
            1.290,
            103.851
        );
    
        expect(distance).toBe(0);
    });

    // larger coordinates differences should have larger distance
    test('return a larger distance for a farther location', () => {
        const closeDistance = calculateDistance(
            1.290,
            103.851,
            1.291,
            103.851
        );

        const farDistance = calculateDistance(
            1.290,
            103.851,
            1.300,
            103.851
        );

        expect(farDistance).toBeGreaterThan(closeDistance);
    });

    // distance should be the same in either direction
    test('return the same distance when coordinates are reversed', () => {
        const distanceAtoB = calculateDistance(
            1.290,
            103.851,
            1.300,
            103.860
        );

        const distanceBtoA = calculateDistance(
            1.300,
            103.860,
            1.290,
            103.851
        );

        expect(distanceAtoB).toBeCloseTo(distanceBtoA, 5);
    });

    // distance should be non negative
    test('return a non-negative distance for different coordinates', () => {
        const distance = calculateDistance(
            1.290,
            103.851,
            1.300,
            103.860
        );

        expect(distance).toBeGreaterThan(0);
    });
});