import { DateTime } from 'luxon';


const API_KEY = "5e4ef88bda3d43bf041637384f2ed9df"
const BASE_URL = "https://api.openweathermap.org/data/2.5"


const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    // console.log(url);
    return fetch(url).then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0];

    return { lat, lon,feels, temp, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, icon, details, weather, speed }
}

const formatForcastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1,6).map(d=> {
        return {
            title: formatLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        }
    });

    hourly = hourly.slice(1,6).map((d)=>{
        return {
            title: formatLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon,
    };
    });
    return { timezone, daily, hourly };
}

const getFormatedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForcastWeather = await getWeatherData("onecall", 
    {
        lat, 
        lon, 
        exclude: 'current, minutely, alerts', 
        units: searchParams.units,
    }).then()
    // formatForcastWeather

    return { ...formattedCurrentWeather, ...formattedForcastWeather };
}

const formatLocalTime = (
    secs, 
    zone, 
    format = "cccc,dd LLL yyyy' | local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormatedWeatherData

export {formatLocalTime, iconUrlFromCode};