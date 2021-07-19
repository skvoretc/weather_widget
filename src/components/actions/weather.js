import axios from "axios";
import {dropStartLocation, setWeather} from "../../reducers/weatherReducer";
import {takePosition} from "../App";
import {useDispatch} from "react-redux";

const API = "3a9835fca0d855d2af57bd9910b18d6b"

export const getWeather = (city = {lon: -0.09184, lat: 51.512791}) => {
    return async (dispatch) => {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API}`)
        dispatch(setWeather({weather: response.data, location: city}))
    }
}

