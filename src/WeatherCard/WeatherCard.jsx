import React, { useContext, useState } from "react";
import WeatherContext from "../Contexts/WeatherContext";
import CityContext from "../Contexts/CityContext";
import WeatherGraph from "./WeatherGraph";
import FutureWeather from "./FutureWeather";
import "./WC.css";

import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';

import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';


import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import * as Icon from 'react-bootstrap-icons';


const weatherCodes = [
    {
        code: 0,
        title: "Tiszta",
        icon: "sun"
    },
    {
        code: 1,
        title: "Felhőtlen",
        icon: "sun"
    },
    {
        code: 2,
        title: "Többnyire felhős",
        icon: "sun-cloud"
    },
    {
        code: 3,
        title: "Felhős",
        icon: "cloud"
    },
    {
        code: 45,
        title: "Ködös",
        icon: "haze"
    },
    {
        code: 48,
        title: "Leszállt köd",
        icon: "fog"
    },
    {
        code: 51,
        title: "Könnyű szitálás",
        icon: "drizzle"
    },
    {
        code: 53,
        title: "Szitálás",
        icon: "drizzle"
    },
    {
        code: 55,
        title: "Heves szitálás",
        icon: "drizzle"
    },
    {
        code: 56,
        title: "Ónos szitálás",
        icon: "snow"
    },
    {
        code: 57,
        title: "Erős ónos szitálás",
        icon: "snow"
    },
    {
        code: 61,
        title: "Zápor",
        icon: "rain"
    },
    {
        code: 63,
        title: "Eső",
        icon: "rain"
    },
    {
        code: 65,
        title: "Zivatar",
        icon: "rain"
    },
    {
        code: 66,
        title: "Ónos eső",
        icon: "snow-rain"
    },
    {
        code: 67,
        title: "Ónos eső",
        icon: "snow-rain"
    },
    {
        code: 71,
        title: "Könnyed havazás",
        icon: "snow"
    },
    {
        code: 73,
        title: "Havazás",
        icon: "snow"
    },
    {
        code: 75,
        title: "Heves havazás",
        icon: "snow"
    },
    {
        code: 77,
        title: "Hódara",
        icon: "snow"
    },
    {
        code: 80,
        title: "Eső",
        icon: "rain"
    },
    {
        code: 81,
        title: "Eső",
        icon: "rain"
    },
    {
        code: 82,
        title: "Zivatar",
        icon: "heavy-rain"
    },
    {
        code: 85,
        title: "Havazás",
        icon: "snow"
    },
    {
        code: 86,
        title: "Heves havazás",
        icon: "snow"
    },
    {
        code: 95,
        title: "Vihar",
        icon: "thunder"
    },
    {
        code: 96,
        title: "Vihar",
        icon: "thunder"
    },
    {
        code: 99,
        title: "Vihar",
        icon: "thunder"
    },


]


export function GetIcon(props) {
    return (
        <>
            {
                props.icon === "sun" ? <Icon.BrightnessHighFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                    props.icon === "sun-cloud" ? <Icon.CloudSunFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                        props.icon === "cloud" ? <Icon.CloudFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                            props.icon === "fog" ? <Icon.CloudFogFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                props.icon === "haze" ? <Icon.CloudHazeFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                    props.icon === "drizzle" ? <Icon.CloudDrizzleFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                        props.icon === "rain" ? <Icon.CloudRainFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                            props.icon === "rain" ? <Icon.CloudRainHeavyFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                                props.icon === "snow" ? <Icon.CloudSnowFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                                    props.icon === "snow-rain" ? <Icon.CloudSleetFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> :
                                                        props.icon === "thunder" ? <Icon.CloudLightningRainFill fontSize={props.fontSize} className={props.class ? props.class : ("img-icon icon-" + props.color)} /> : <></>
            }
        </>
    )
}

export function AvgCards(props) {
    return (
        <div className="avg-card">
            {props.icon}
            {props.data}
            <span className="avg-title">{props.label}</span>
        </div>
    )
}

export function HourlyWeatherCode(props) {

    return (
        <div className="hourly-card c-HWC">
            <span className="time">{new Date(props.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <GetIcon icon={props.icon} class="c-icon" />
            <span className="c-temp">{props.temp}°</span>
        </div>
    );
}

function WC() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    const { weather } = useContext(WeatherContext);
    const { cityName } = useContext(CityContext);

    const [currentDay, setDay] = useState(0);
    const [times, setTimes] = useState(weather.hourly.time.filter((time) => new Date(time).getHours() === 0));

    function getDatasPerDay(override = null) {
        let tmp = {
            time: [],
            temp: [],
            humidity: [],
            wind: [],
            rain: [],
            weathercode: [],
        }
        for (let index = 0; index < weather.hourly.time.length; index++) {
            const element = weather.hourly.time[index];
            if (new Date(element).getDate() === (override == null ? new Date(times[currentDay]).getDate() : new Date(override).getDate())) {
                tmp.time.push(weather.hourly.time[index])
                tmp.temp.push(weather.hourly.temperature_2m[index]);
                tmp.humidity.push(weather.hourly.relativehumidity_2m[index]);
                tmp.wind.push(weather.hourly.windspeed_10m[index]);
                tmp.rain.push(weather.hourly.rain[index]);
                tmp.weathercode.push(weather.hourly.weathercode[index]);
            }
        }

        return {
            time: { array: tmp.time },
            temp: {
                max: Math.max(...tmp.temp),
                min: Math.min(...tmp.temp),
                current: tmp.temp[new Date().getHours()],
                avg: parseInt(tmp.temp.reduce((a, b) => a + b, 0) / tmp.temp.length),
                array: tmp.temp
            },
            humidity: {
                max: Math.max(...tmp.humidity),
                min: Math.min(...tmp.humidity),
                current: tmp.humidity[new Date().getHours()],
                avg: parseInt(tmp.humidity.reduce((a, b) => a + b, 0) / tmp.humidity.length),
                array: tmp.humidity
            },
            wind: {
                max: Math.max(...tmp.wind),
                min: Math.min(...tmp.wind),
                current: tmp.wind[new Date().getHours()],
                avg: parseInt(tmp.wind.reduce((a, b) => a + b, 0) / tmp.wind.length),
                array: tmp.wind
            },
            rain: {
                max: Math.max(...tmp.rain),
                min: Math.min(...tmp.rain),
                current: tmp.rain[new Date().getHours()],
                avg: parseInt(tmp.rain.reduce((a, b) => a + b, 0) / tmp.rain.length),
                array: tmp.rain
            },
            weathercode: {
                max: Math.max(...tmp.weathercode),
                min: Math.min(...tmp.weathercode),
                current: tmp.weathercode[new Date().getHours()],
                avg: parseInt(tmp.weathercode.reduce((a, b) => a + b, 0) / tmp.weathercode.length),
                array: tmp.weathercode
            }
        }

    }

    function convertToGraph() {
        const tmp = getDatasPerDay(null);

        return {
            labels: tmp.time.array.map((time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
            datasets: [
                {
                    label: "Hőmérséklet",
                    data: tmp.temp.array
                },
                {
                    label: "Páratartalom",
                    data: tmp.humidity.array
                },
                {
                    label: "Szélerősség",
                    data: tmp.wind.array
                },
            ]
        }

    }

    function getDataNext24Hours() {
        let tmp = {
            time: [],
            temp: [],
            weatherCode: [],
        }

        for (let index = 0; index < weather.hourly.time.length; index++) {
            const element = weather.hourly.time[index];
            if (new Date(element) >= new Date()) {
                tmp.time.push(weather.hourly.time[index]);
                tmp.temp.push(weather.hourly.temperature_2m[index]);
                tmp.weatherCode.push(weather.hourly.weathercode[index]);
            }
        }

        tmp.time = tmp.time.slice(0, 24);
        tmp.temp = tmp.temp.slice(0, 24);
        tmp.weatherCode = tmp.weatherCode.slice(0, 24);

        return tmp;

    }


    return (
        <div className="interface">
            <Grid container spacing={6}>
                <Grid item xs={12} lg={4} className="grid">
                    <div className="card cb-0">
                        <div className="img">
                            <GetIcon icon={weatherCodes.filter((w) => w.code === (currentDay === 0 ? getDatasPerDay().weathercode.current : getDatasPerDay().weathercode.max))[0].icon} fontSize="large" color={weatherCodes.filter((w) => w.code === (currentDay === 0 ? getDatasPerDay().weathercode.current : getDatasPerDay().weathercode.max))[0].icon === "sun" ? "yellow" : "white"} />
                        </div>
                        <span className="temp">{currentDay === 0 ? getDatasPerDay().temp.current : getDatasPerDay().temp.avg} {weather.hourly_units.temperature_2m}</span>
                        <span className="type"><GetIcon icon={weatherCodes.filter((w) => w.code === (currentDay === 0 ? getDatasPerDay().weathercode.current : getDatasPerDay().weathercode.max))[0].icon} fontSize="small" /> {weatherCodes.filter((w) => w.code === (currentDay === 0 ? getDatasPerDay().weathercode.current : getDatasPerDay().weathercode.max))[0].title}</span>
                        <div className="hr"></div>
                        <div className="footer">
                            <IconButton aria-label="Hátra" className="btn btn-left" onClick={() => setDay(currentDay > 0 ? currentDay - 1 : currentDay)}>
                                <ArrowBackIosIcon />
                            </IconButton>
                            <div className="block">
                                <span className="city"><PlaceIcon className="icon" /> {cityName}</span>
                                <span className="date"><CalendarMonthIcon className="icon" /> {new Date(weather.hourly.time[currentDay * 24]).toLocaleDateString("hu-HU", { month: '2-digit', day: '2-digit' })} {currentDay === 0 ? " - " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>

                            </div>
                            <IconButton aria-label="Előre" className="btn btn-right" onClick={() => setDay(currentDay + 1 < weather.hourly.time.length / 24 ? currentDay + 1 : currentDay)}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} className="grid grid-hourly">
                    <div className={"card c-hourlyWC" + (isMobile ? "" : " cb-0")}>
                        {
                            getDataNext24Hours().time.map((time, index) => (
                                <HourlyWeatherCode key={index} time={time} temp={getDataNext24Hours().temp[index]} icon={weatherCodes.filter((w) => w.code === getDataNext24Hours().weatherCode[index])[0].icon} />
                            ))
                        }
                    </div>
                </Grid>

                <Grid item xs={12} order={{ xs: 2, lg: 1 }} lg={8} className="grid">
                    <div className={"card "  + (isMobile ? "" : " cb-0")}>
                        <span className="avg">Napi adatok</span>

                        <Grid container spacing={4}>
                            <Grid item xs={12} lg={4}>
                                <AvgCards
                                    icon={<ThermostatIcon className="avg-icon icon-gray"></ThermostatIcon>}
                                    data={getDatasPerDay().temp.max + "° / " + getDatasPerDay().temp.min + "°"}
                                    label={"Hőmérséklet max/min"} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <AvgCards
                                    icon={<OpacityIcon className="avg-icon icon-blue"></OpacityIcon>}
                                    data={"~" + getDatasPerDay().humidity.avg + "%"}
                                    label={"Átlagos páratartalom"} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <AvgCards
                                    icon={<AirIcon className="avg-icon icon-white"></AirIcon>}
                                    data={getDatasPerDay().wind.max + " km/h"}
                                    label={"Maximális szélerősség"}></AvgCards>
                            </Grid>
                            <Grid item xs={6} lg={4}>
                                <AvgCards
                                    data={"~" + getDatasPerDay().temp.avg + " " + weather.hourly_units.temperature_2m}
                                    label={"Átlag hőmérséklet"} />
                            </Grid>
                            <Grid item xs={6} lg={4}>
                                <AvgCards
                                    data={"" + getDatasPerDay().rain.max + " mm"}
                                    label={"Csapadék mennyiség"} />
                            </Grid>
                        </Grid>


                    </div>
                </Grid>



                <Grid item xs={12} lg={4} className="grid" order={{ xs: 1, lg: 2 }}>
                    <div className={"card " + (isMobile ? "" : " cb-0")}>
                        {
                            times.map((data, index) => (
                                <FutureWeather key={index} index={index} class={currentDay === index ? "disappear" : (index === 0 ? "choosen" : "")} clicked={() => setDay(index)} date={data} data={getDatasPerDay(data)} icon={<GetIcon icon={weatherCodes.filter((w) => w.code === getDatasPerDay(data).weathercode.max)[0].icon} />}></FutureWeather>
                            ))
                        }

                    </div>
                </Grid>
                <Grid item xs={12} lg={8} order={{ xs: 3, lg: 3 }} className="grid grid-mobile-hourly">
                    <div className="card cb-0">
                        <span className="avg">Napi grafikon</span>
                        <WeatherGraph data={convertToGraph()}></WeatherGraph>
                    </div>
                </Grid>
            </Grid>


        </div>
    );
}

export default WC;