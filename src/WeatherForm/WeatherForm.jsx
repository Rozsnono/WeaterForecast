import React, { useContext, useState } from "react";
import WeatherContext from "../Contexts/WeatherContext";
import CityContext from "../Contexts/CityContext";

import "./WF.css";

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoadingContext from "../Contexts/LoadingContext";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';


function WF() {

    const { setWeather } = useContext(WeatherContext);
    const { setLoad } = useContext(LoadingContext);
    const { setCityName } = useContext(CityContext);

    const [lati, setLati] = useState(47.68);
    const [long, setLong] = useState(17.63);
    const [type, setType] = useState("c");
    const [num, setNumber] = useState(3);
    const [city, setCity] = useState("Győr");

    const [first, setFirst] = useState(true);

    const [isCity, setIsCity] = useState(false);

    function GetWeather(lati, long) {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + (lati) + "&longitude=" + long + "&hourly=temperature_2m,relativehumidity_2m,rain,weathercode,windspeed_10m&" + (type === "f" ? "temperature_unit=fahrenheit&" : "") + "forecast_days=" + (num + 1))
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setLoad(false);
                setFirst(false);
            })
            .catch(error => {
                console.error(error);
                setLoad(false);
            });
    }

    function getCityCoordinates() {
        setLoad(true);

        if (isCity) {
            fetch("https://geocode.maps.co/search?q=" + city)
                .then(response => response.json())
                .then(data => {
                    setLati(parseFloat(data[0].lat));
                    setLong(parseFloat(data[0].lon));
                    GetWeather(parseFloat(data[0].lat), parseFloat(data[0].lon));
                    setCityName(data[0].display_name.split(',')[0]);
                })
                .catch(error => {
                    console.error(error);
                    setLoad(false);
                });
        } else {
            GetWeather(lati, long);
            setCityName(lati+"°E "+ long + "°N");
        }


    }

    const types = [
        {
            value: 'c',
            label: '°C',
        },
        {
            value: 'f',
            label: '°F',
        }
    ];

    const number = [
        {
            value: 3,
            label: '3',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 7,
            label: '7',
        }
    ];

    function Change(event) {
        setType(event.target.value);
    }

    function ChangeNum(event) {
        setNumber(event.target.value);
    }

    function DropDown(status) {
        setState(status);
        if (state) {
            getCityCoordinates();
        }
    }

    const [state, setState] = useState(true);

    return (
        <>
            <Drawer
                anchor={"top"}
                open={state}
                onClose={() => DropDown(false)}
                className={"drawer " + (state ? "active" : "")}
            >
                <div className={"form " + (state ? "active" : "") + (first ? " form-first" : "")}>
                    <h1>Időjárás előrejelző</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={6}>
                            <div className="fields">
                                {
                                    !isCity ?
                                        <TextField
                                            label="Szélesség"
                                            fullWidth
                                            id="outlined-start-adornment"
                                            value={lati}
                                            onChange={(event) => {
                                                setLati(event.target.value);
                                            }}
                                            type="number"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                            }}
                                            required
                                        /> : <TextField
                                            label="Város"
                                            fullWidth
                                            id="outlined-start-adornment"
                                            value={city}
                                            onChange={(event) => {
                                                setCity(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                                            }}
                                            required
                                        />
                                }

                                {
                                    !isCity ?
                                        <TextField
                                            label="Hosszúság"
                                            fullWidth
                                            id="outlined-start-adornment"
                                            value={long}
                                            onChange={(event) => {
                                                setLong(event.target.value);
                                            }}
                                            type="number"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">°</InputAdornment>,
                                            }}
                                            required
                                        /> : <></>
                                }

                                <FormControlLabel control={<Switch checked={isCity} onChange={() => setIsCity(!isCity)} />} label={isCity ? "Város" : "Koordináta"} />
                            </div>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <div className="fields">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Hőmérséklet"
                                    defaultValue="c"
                                    value={type}
                                    onChange={Change}
                                >
                                    {types.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Napos előrejelzés"
                                    defaultValue={3}
                                    value={num}
                                    onChange={ChangeNum}
                                >
                                    {number.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <div className="button">

                                <IconButton aria-label="Mehet" onClick={() => DropDown(false)}>
                                    <TravelExploreIcon />
                                </IconButton>
                            </div>
                        </Grid>


                    </Grid>


                    <div className="footer">
                        <KeyboardArrowUpIcon onClick={() => DropDown(false)} />
                    </div>


                </div>
            </Drawer>

            <div className={"dropdown-btn" + (state ? " active" : "")}>
                <KeyboardArrowUpIcon onMouseEnter={() => DropDown(true)} className="dd-btn" />
            </div>
        </>
    );
}

export default WF;
