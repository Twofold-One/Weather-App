import id from './auxiliary_functions';
import getCurrentWeather from './weather_api_data';

// header elements
const location = id('location');
const searchBtn = id('search-btn');

// main elements
const mainDate = id('main-date');
const mainLocation = id('main-location');
const mainWeatherIcon = id('main-weather-icon');
const mainTemperature = id('main-temperature');
const mainFeelsLike = id('main-feels-like');
const mainDescription = id('main-description');
const mainWind = id('main-wind');
const mainHumidity = id('main-humidity');
const mainPressure = id('main-pressure');

export default function UIinteratctions() {
    searchBtn.addEventListener('click', () => {
        getCurrentWeather(location.value).then((data) => {
            console.log(data);
            mainDate.textContent = new Date();
            mainLocation.textContent = `${data.city}, ${data.location}`;
            mainTemperature.textContent = `${data.temp} °C`;
            mainFeelsLike.textContent = `Feels like ${data.feelsLike} °C.`;
            mainDescription.textContent = `${data.weatherDescription}.`;
            mainWind.textContent = `${data.windSpeed} m/s`;
            mainHumidity.textContent = `${data.humidity} %`;
            mainPressure.textContent = `${data.pressure} hPa`;
            mainWeatherIcon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        });
    });
}
