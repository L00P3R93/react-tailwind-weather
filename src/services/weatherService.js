import { DateTime } from 'luxon';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (infoType, searchParams) => {
    const weatherUrl = new URL(BASE_URL);
    weatherUrl.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return weatherData;
};


const formatCurrentWeather = (weatherData) => {
    const { coord, main, name, dt, sys, weather, wind } = weatherData;
    const { lat, lon } = coord;
    const { temp, feels_like, temp_min, temp_max, humidity } = main;
    const { country, sunrise, sunset } = sys;
    const { main: detail, icon } = weather[0];
    const { speed } = wind;

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
        detail,
        icon,
        speed,
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
    const formattedCurrentWeather = await getWeatherData(
        'weather',
        searchParams,
    ).then(formatCurrentWeather)

    const { lat, lon } = formatCurrentWeather;

    const formattedForecastWeather = await getWeatherData(
        'onecall',
        {
            lat,
            lon,
            exclude: 'current,minutely,alerts',
            units: searchParams.units,
        }
    ).then(data => formatForecastWeather())

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
