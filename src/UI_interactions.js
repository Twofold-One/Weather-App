import format from 'date-fns/format';
import id from './auxiliary_functions';
import getCurrentWeather from './weather_api_data';

// header elements
const header = id('header');
const location = id('location');
const searchBtn = id('search-btn');

// main elements
const main = id('main');
const mainDate = id('main-date');
const mainLocation = id('main-location');
const mainWeatherIcon = id('main-weather-icon');
const mainTemperature = id('main-temperature');
const mainFeelsLike = id('main-feels-like');
const mainDescription = id('main-description');
const mainWind = id('main-wind');
const mainHumidity = id('main-humidity');
const mainPressure = id('main-pressure');

function headerGifOnWeather(weather) {
    switch (weather) {
        case 'Clear sky':
            header.className = 'header clear-sky';
            break;
        case 'Clouds':
            header.className = 'header few-clouds';
            break;
        case 'Rain':
            header.className = 'header rain';
            break;
        case 'Snow':
            header.className = 'header snow';
            break;
        case 'Mist':
            header.className = 'header mist';
            break;
        default:
            header.className = 'header clear-sky';
    }
}

function mainWindowAnimation() {
    main.classList.remove('fade-in');
    // trick to restart animation
    void main.offsetWidth;
    main.classList.add('fade-in');
}

export default function UIinteratctions() {
    searchBtn.addEventListener('click', () => {
        getCurrentWeather(location.value).then((data) => {
            console.log(data);
            headerGifOnWeather(data.weather);
            mainWindowAnimation();
            mainDate.textContent = format(new Date(), 'MMM d, p');
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
