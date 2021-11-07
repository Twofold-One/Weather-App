const API_KEY = 'ec55f64c4e4b2603ec7d267c52a12943';

function weatherData(data) {
    const processedData = {
        city: data.name,
        location: data.sys.country,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        weather: data.weather[0].main,
        weatherDescription: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: Math.round(data.wind.speed),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
    };
    return processedData;
}

export default async function getCurrentWeather(city, units = 'metric') {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`,
            { mode: 'cors' }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const currentWeatherData = await response.json();

        return weatherData(currentWeatherData);
    } catch (err) {
        console.log(err);
    }
}
