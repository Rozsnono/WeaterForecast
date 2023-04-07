import './App.css';
import React, { useState } from "react";

import WeatherCard from "./WeatherCard/WeatherCard";
import WeatherForm from "./WeatherForm/WeatherForm"

import WeatherContext from "./Contexts/WeatherContext";
import LoadingContext from "./Contexts/LoadingContext";
import CityContext from "./Contexts/CityContext";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  const [weather, setWeather] = useState({});
  const [loading, setLoad] = useState(false);
  const [cityName, setCityName] = useState("");

  return (
    <div>
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
  );
}

export default App;
