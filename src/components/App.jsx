import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "./actions/weather";
import Widget from "./widget/widget";
import "./App.less"
import {takePosition} from "./actions/takePosition";
import Settings from "./settings/Settings";

var isLoad = false;
var isLocationLoad = false;

const App = () =>{
    const [isWeather,setIsWeather] = useState(true)
    const dispatch = useDispatch();
    const weather = useSelector(state => state.weather.weather)
    const position = useSelector(state => state.weather.location)
    const startposition = useSelector(state => state.weather.startLocation)
    isLoad = useSelector(state => state.weather.isLoad)
    isLocationLoad = useSelector(state => state.weather.isLocationLoad)


    useEffect(()=>{
        if(weather.length==0) dispatch(takePosition())
    },[])

     useEffect(() => {
        if (isLocationLoad) {
            if (weather.length==0){
                dispatch(getWeather(startposition))
            }
        }
     }, [isLocationLoad]);

    return (
        <div className="main">
            {isLoad?
                isWeather?(
                    weather.map((widget,index) => (
                        <Widget key ={index} first = {index==0?true:false} isLoad = {isLoad} weather = {widget} changeWindow = {setIsWeather}/>
                    ))
                ):<Settings changeWindow = {setIsWeather} weather = {weather} isLoad = {isLoad}/>
                : <p>Loading</p>
            }
        </div>
    )
}



export default App
