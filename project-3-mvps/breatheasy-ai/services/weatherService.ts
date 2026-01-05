import { WeatherData } from '../types';

export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`
        );

        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        const current = data.current;

        return {
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            weatherCode: current.weather_code,
            isDay: current.is_day === 1,
            aqi: 45, // Fallback safe AQI
            pm25: 12, // Mocked
            pollen: 'Low', // Fallback
            condition: getWeatherDescription(current.weather_code)
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        // Fallback Mock Data
        return {
            temperature: 72,
            humidity: 45,
            windSpeed: 8,
            weatherCode: 0,
            isDay: true,
            aqi: 50,
            pm25: 15,
            pollen: 'Moderate',
            condition: 'Sunny'
        };
    }
};

export const getWeatherDescription = (code: number): string => {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    switch (code) {
        case 0: return 'Clear sky';
        case 1:
        case 2:
        case 3: return 'Partly cloudy';
        case 45:
        case 48: return 'Fog';
        case 51:
        case 53:
        case 55: return 'Drizzle';
        case 61:
        case 63:
        case 65: return 'Rain';
        case 71:
        case 73:
        case 75: return 'Snow';
        case 95:
        case 96:
        case 99: return 'Thunderstorm';
        default: return 'Variable';
    }
}
