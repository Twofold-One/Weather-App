import id from './auxiliary_functions';
import getCurrentWeather from './weather_api_data';

const location = id('location');
const searchBtn = id('search-btn');
const weatherIcon = id('weather-icon');

export default function UIinteratctions() {
    searchBtn.addEventListener('click', () => {
        getCurrentWeather(location.value).then((data) => {
            console.log(data.icon);
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        });
    });
}
