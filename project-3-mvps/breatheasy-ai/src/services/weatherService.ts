
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  aqi: number;
  pm25: number;
  pollen: string;
  condition: string;
}

interface PollenData {
  level: string; // "Low", "Moderate", "High"
  detail: string; // "Low (Grass)"
}

const getPollenLevel = (val: number): string => {
  if (val > 100) return 'High';
  if (val > 20) return 'Moderate';
  return 'Low';
};

export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    // Parallel Fetch: Weather + Air Quality
    const [weatherRes, airRes] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`),
      fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`)
    ]);

    if (!weatherRes.ok || !airRes.ok) throw new Error('Data fetch failed');

    const weatherData = await weatherRes.json();
    const airData = await airRes.json();

    // Process Weather
    const current = weatherData.current;

    // Process Pollen
    const pollen = airData.current;
    const allergens = [
      { name: 'Alder', val: pollen.alder_pollen },
      { name: 'Birch', val: pollen.birch_pollen },
      { name: 'Grass', val: pollen.grass_pollen },
      { name: 'Mugwort', val: pollen.mugwort_pollen },
      { name: 'Olive', val: pollen.olive_pollen },
      { name: 'Ragweed', val: pollen.ragweed_pollen },
    ];

    // Find Max Allergen
    const maxAllergen = allergens.reduce((prev, current) => (prev.val > current.val) ? prev : current);
    const level = getPollenLevel(maxAllergen.val);
    const pollenString = `${level} (${maxAllergen.name})`;

    return {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
      aqi: 45, // Default/Mock for now or map from PM2.5 if verified
      pm25: 12,
      pollen: pollenString,
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
      pm25: 10,
      pollen: 'Low (Safe)',
      condition: 'Clear sky'
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
