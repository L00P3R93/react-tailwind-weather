import thunderstorm from '../../assets/img/weather-icon/thunderstorm.png';
import rain from '../../assets/img/weather-icon/rain.png';
import snow from '../../assets/img/weather-icon/snow.png';
import mist from '../../assets/img/weather-icon/mist.png';
import sun from '../../assets/img/weather-icon/sun.png';
import moon from '../../assets/img/weather-icon/moon.png';
import fewCloudsDay from '../../assets/img/weather-icon/few-clouds-day.png';
import fewCloudsNight from '../../assets/img/weather-icon/few-clouds-night.png';
import clouds from '../../assets/img/weather-icon/clouds.png';


export const convertIconToImg = (icon) => {
    let img = '';
    if (icon === '11d') {
        img = thunderstorm;
    } else if (icon === '09d' || icon === '10d') {
        img = rain;
    } else if (icon === '13d') {
        img = snow;
    } else if (icon === '50d' || icon === '50n') {
        img = mist;
    } else if (icon === '01d') {
        img = sun;
    } else if (icon === '01n') {
        img = moon;
    } else if (icon === '02d') {
        img = fewCloudsDay;
    } else if (icon === '02n') {
        img = fewCloudsNight;
    } else {
        img = clouds;
    }
    return img;
} 