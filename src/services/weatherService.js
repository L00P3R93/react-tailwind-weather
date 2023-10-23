import { DateTime } from 'luxon';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (infoType, searchParams) => {
    const weatherUrl = new URL(`${BASE_URL}/${infoType}`);
    const params = new URLSearchParams({ ...searchParams, appid: API_KEY });
    weatherUrl.search = params;

    //console.log('weatherUrl:', weatherUrl.toString());

    const response = await fetch(weatherUrl);
    //console.log('response:', response);

    const jsonData = await response.json();
    //console.log('jsonData:', jsonData);

    return jsonData;
};


const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;
    const { main: detail, icon } = weather[0];
    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        speed,
        detail,
        icon,
    };
}

const formatForecastWeather = (data) => {
    let { timezone, hourly, daily } = data;
    daily = daily.slice(1, 7).map(day => {
        return {
            title: formatToLocalTime(day.dt, timezone, 'ccc'),
            temp: day.temp.day,
            icon: day.weather[0].icon,
        }
    });
    hourly = hourly.slice(1, 7).map(day => {
        return {
            title: formatToLocalTime(day.dt, timezone, 'hh:mm a'),
            temp: day.temp,
            icon: day.weather[0].icon,
        }
    });

    return { timezone, daily, hourly };
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrentWeather);
    console.log('Formatted Current Weather:', formattedCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
            lat,
            lon,
            exclude: 'current,minutely,alerts',
            units: searchParams.units,
        })
        .then(formatForecastWeather);
    console.log('Formatted Forecast Weather: ', formattedForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
}

const getFourWeatherData = (searchParams) => {
    const tehran = getWeatherData('weather', {
        q: 'tehran',
        units: searchParams.units,
    }).then((data) => formatCurrentWeather(data));
    
    const tokyo = getWeatherData('weather', {
        q: 'tokyo',
        units: searchParams.units,
    }).then((data) => formatCurrentWeather(data));
    
    const seoul = getWeatherData('weather', {
        q: 'seoul',
        units: searchParams.units,
    }).then((data) => formatCurrentWeather(data));
    
    const toronto = getWeatherData('weather', {
        q: 'toronto',
        units: searchParams.units,
    }).then((data) => formatCurrentWeather(data));
    
    return [tehran, tokyo, seoul, toronto];
}

const formatToLocalTime = (
    secs,
    zone,
    format = "ccc, dd LLL yyyy' | local time: hh: mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export { formatToLocalTime, getFourWeatherData };

export default getFormattedWeatherData;
