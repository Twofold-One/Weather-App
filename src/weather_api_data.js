const API_KEY = 'ec55f64c4e4b2603ec7d267c52a12943';
// const weather = {};

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

export default async function getCurrentWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
            { mode: 'cors' }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const currentWeatherData = await response.json();
        console.log(currentWeatherData);
        // console.log(
        //     `${currentWeatherData.name}, ${currentWeatherData.sys.country}`
        // );
        // console.log(`${Math.round(currentWeatherData.main.temp)} °C`);
        // console.log(
        //     `Feels like ${Math.round(currentWeatherData.main.feels_like)} °C`
        // );
        // console.log(`${currentWeatherData.weather[0].main}`);
        // console.log(`${currentWeatherData.weather[0].icon}`);
        // console.log(`${Math.round(currentWeatherData.wind.speed)} m/s`);
        // console.log(`${currentWeatherData.main.pressure} hPa`);
        // console.log(`${currentWeatherData.main.humidity} %`);
        return weatherData(currentWeatherData);
    } catch (err) {
        console.log(err);
    }
}

// this construction to use
// cool!!!

// getCurrentWeather('London').then((json) => {
//     console.log(json);
//     console.log(json.city);
// });

// this construction as an option

// (async () => {
//     weather = await getCurrentWeather('Moscow');
//     console.log(weather);
// })();
