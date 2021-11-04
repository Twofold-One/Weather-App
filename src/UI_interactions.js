import id from './auxiliary_functions';
import getCurrentWeather from './weather_api_data';

const location = id('location');
const searchBtn = id('search-btn');

export default function UIinteratctions() {
    searchBtn.addEventListener('click', () => {
        getCurrentWeather(location.value).then((data) => {
            console.log(data);
        });
    });
}
