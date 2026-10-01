import {getWeatherCondition, getWeatherIcon,} from '../../uitilities/weatherFunctions';

describe('getWeatherCondition', () => {
    test('return Clear for weather code 0', () => {
        expect(getWeatherCondition(0)).toBe('Clear');
    });

    test('return Partly Cloudy for weather codes 1 and 2', () => {
        expect(getWeatherCondition(1)).toBe('Partly Cloudy');
        expect(getWeatherCondition(2)).toBe('Partly Cloudy');
    });

    test('return Cloudy for weather code 3', () => {
        expect(getWeatherCondition(3)).toBe('Cloudy');
    });

    test('return Rain for weather codes from 51 to 67', () => {
        expect(getWeatherCondition(51)).toBe('Rain');
        expect(getWeatherCondition(67)).toBe('Rain');
    });

    test('return Rain for weather codes from 80 to 82', () => {
        expect(getWeatherCondition(80)).toBe('Rain');
        expect(getWeatherCondition(82)).toBe('Rain');
    });

    test('return Thunderstorm for weather codes 95 and above', () => {
        expect(getWeatherCondition(95)).toBe('Thunderstorm');
        expect(getWeatherCondition(99)).toBe('Thunderstorm');
    });

    test('return Weather for other code', () => {
        expect(getWeatherCondition(40)).toBe('Weather');
    });

});

describe('getWeatherIcon', () => {
    test('return sunny icon for weather code 0', () => {
        expect(getWeatherIcon(0)).toBe('sunny-outline');
    });

    test('return partly sunny icon for weather codes 1 and 2', () => {
        expect(getWeatherIcon(1)).toBe('partly-sunny-outline');
        expect(getWeatherIcon(2)).toBe('partly-sunny-outline');
    });

    test('return cloudy icon for weather code 3', () => {
        expect(getWeatherIcon(3)).toBe('cloudy-outline');
    });

    test('return rainy icon for weather codes from 51 to 67', () => {
        expect(getWeatherIcon(51)).toBe('rainy-outline');
        expect(getWeatherIcon(67)).toBe('rainy-outline');
    });

    test('return rainy icon for weather codes from 80 to 82', () => {
        expect(getWeatherIcon(80)).toBe('rainy-outline');
        expect(getWeatherIcon(82)).toBe('rainy-outline');
    });

    test('return thunderstorm icon for weather codes 95 and above', () => {
        expect(getWeatherIcon(95)).toBe('thunderstorm-outline');
        expect(getWeatherIcon(99)).toBe('thunderstorm-outline');
    });

    test('return partly sunny icon for other code', () => {
        expect(getWeatherIcon(40)).toBe('partly-sunny-outline');
    });

});