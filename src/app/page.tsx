"use client";

import React, { useState } from "react";

import WeatherCard from "../WeatherCard/WeatherCard";
import WeatherForm from "../WeatherForm/WeatherForm"

import WeatherContext from "../Contexts/WeatherContext";
import LoadingContext from "../Contexts/LoadingContext";
import CityContext from "../Contexts/CityContext";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  
  const [weather, setWeather] = useState<any>({});
  const [loading, setLoad] = useState<any>(false);
  const [cityName, setCityName] = useState<any>("");
  
  return (
    <div className="">
      <WeatherContext.Provider value={{ weather, setWeather }}>
        <LoadingContext.Provider value={{ loading, setLoad }}>
          <CityContext.Provider value={{ cityName, setCityName }}>
            <WeatherForm></WeatherForm>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {weather.latitude && !loading ? <WeatherCard></WeatherCard> : <></>}
          </CityContext.Provider>
        </LoadingContext.Provider>
      </WeatherContext.Provider>
    </div>
  )
}
