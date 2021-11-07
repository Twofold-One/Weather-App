import format from 'date-fns/format';
import id from './auxiliary_functions';
import getCurrentWeather from './weather_api_data';

// header elements
const header = id('header');
const location = id('location');
const searchBtn = id('search-btn');
const metricRadio = id('metric');
const imperialRadio = id('imperial');

// main elements
const main = id('main');
const loader = id('loader');
const error = id('error-message');
const mainDate = id('main-date');
const mainLocation = id('main-location');
const mainWeatherIcon = id('main-weather-icon');
const mainTemperature = id('main-temperature');
const mainFeelsLike = id('main-feels-like');
const mainDescription = id('main-description');
const mainWind = id('main-wind');
const mainHumidity = id('main-humidity');
const mainPressure = id('main-pressure');
const windIcon = id('wind-icon');
const humidityIcon = id('humidity-icon');
const pressureIcon = id('pressure-icon');

function headerGifOnWeather(data) {
    switch (data.weather) {
        case 'Clear':
            if (data.temp < 0) {
                header.className = 'header clear-sky-winter';
            } else {
                header.className = 'header clear-sky';
            }
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
            header.className = 'header few-clouds';
    }
}

function mainWindowAnimation() {
    // trick to restart animation
    main.classList.remove('fade-in');
    void main.offsetWidth;
    main.classList.add('fade-in');
}

function searchOnEnter() {
    location.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            searchBtn.click();
        }
    });
}

function addLoadingComponent() {
    // trick to restart animation
    main.classList.remove('fade-in');
    void main.offsetWidth;
    main.classList.add('load');
    loader.classList.add('start');
}

function removeLoadingComponent() {
    main.classList.remove('load');
    loader.classList.remove('start');
}

function showIcons() {
    windIcon.className = '';
    humidityIcon.className = '';
    pressureIcon.className = '';

    windIcon.className = 'fas fa-wind';
    humidityIcon.className = 'fas fa-tint';
    pressureIcon.className = 'fas fa-tachometer-alt';
}

function errorMessage(data) {
    if (!data) {
        error.classList.add('start');
        removeLoadingComponent();
    } else {
        error.classList.remove('start');
    }
}

export default function UIinteratctions() {
    searchOnEnter();
    searchBtn.addEventListener('click', () => {
        const units = metricRadio.checked ? 'metric' : 'imperial';
        const temperatureUnits = metricRadio.checked ? '°C' : '°F';
        const windSpeedUnits = metricRadio.checked ? 'm/s' : 'mph';
        addLoadingComponent();
        getCurrentWeather(location.value, units).then((data) => {
            errorMessage(data);
            headerGifOnWeather(data);
            mainWindowAnimation();
            showIcons();
            mainDate.textContent = format(new Date(), 'MMM d, p');
            mainLocation.textContent = `${data.city}, ${data.location}`;
            mainTemperature.textContent = `${data.temp} ${temperatureUnits}`;
            mainFeelsLike.textContent = `Feels like ${data.feelsLike} ${temperatureUnits}.`;
            mainDescription.textContent = `${data.weatherDescription}.`;
            mainWind.textContent = `${data.windSpeed} ${windSpeedUnits}`;
            mainHumidity.textContent = `${data.humidity} %`;
            mainPressure.textContent = `${data.pressure} hPa`;
            mainWeatherIcon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
            removeLoadingComponent();
        });
    });
}
