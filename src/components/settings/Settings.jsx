import React, {useState} from 'react';
import "./Settings.less"
import {useDispatch} from "react-redux";
import {changeOrder} from "../../reducers/weatherReducer";
import Select from "react-select";
import {getWeather} from "../actions/weather";




const Settings = (props) => {
    const dispatch = useDispatch()
    const {changeWindow,weather,isLoad} =props
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        {label: 'New York', value: {lon:-74.005966,lat:40.714272}},
        {label: 'Moscow', value: {lon: 37.606667, lat: 55.761665}},
        {label: 'City of London', value: {lon: -0.09184, lat: 51.512791}},
        {label: 'Paris', value: {lon: 2.3486, lat: 48.853401}},
        {label: 'Barcelona', value: {lon: 2.0, lat: 41.666672}},
        {label: 'Saint Petersburg', value: {lon: 30.264168, lat: 59.894444}},
        {label: 'Riga', value: {lon: 24.1, lat: 56.950001}}
    ];

    var curweather = weather;
    var currentweather = null

    function addCity() {
        if(selectedOption !=null) {
            if (weather.filter(item => item.name == selectedOption.label).length == 0) {
                dispatch(getWeather(selectedOption.value))
            }
        }
    }

    function dragStartHandler(e, location,index) {
        currentweather = location
    }

    function dragEndHandler(e) {

    }

    function dragOverHandler(e) {
        e.preventDefault()
    }

    function dropHandler(e, location, index) {
        e.preventDefault()
        curweather = weather.map(loc =>{
            if (loc == currentweather){
                return location
            }
            else if (loc == location) {
                return currentweather
            }
            return loc
        })
        let loc = curweather.map(item => item.coord)
        dispatch(changeOrder({weather: curweather,location: loc}))

    }
    function deleteOrder(index) {
        let cur = weather.filter((item,i)=> i!=index)
        let loc = cur.map(item => item.coord)
        dispatch(changeOrder({weather: cur,location: loc}))
    }

    return(
        <div className="main_settings">
            <div className="header">
                <div className="title">Settings</div>
                <div className="icon">
                    <svg onClick={() => changeWindow(true)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         className="bi bi-x" viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
            </div>
            <div className="locations">
                 {isLoad?(
                     curweather.map((location, index) => (
                        <div className="location"
                             draggable={true}
                             onDragStart={(e) => dragStartHandler(e,location,index)}
                             onDragLeave={(e) =>dragEndHandler(e)}
                             onDragEnd={(e) =>dragEndHandler(e)}
                             onDragOver={(e) =>dragOverHandler(e)}
                             onDrop={(e) =>dropHandler(e,location,index)}
                             key={index}>
                            <div className="location_name">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     className="bi bi-justify" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                <div>
                                    {location.name}
                                </div>
                            </div>

                            <div >
                                {
                                    weather.length!=1?
                                        <svg onClick={() => deleteOrder(index)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#555454"
                                             className="bi bi-trash" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd"
                                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        :""
                                }

                            </div>
                        </div>
                    ))):""
                }

            </div>
            <div className="add_field">
                <h3>Add Location:</h3>
                <div className="enter">
                    <div className="field">
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </div>
                    <div onClick={() => addCity()} className="enter_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
