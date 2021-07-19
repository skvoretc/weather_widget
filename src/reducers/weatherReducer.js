const SET_WEATHER = "SET_WEATHER"
const SET_LOCATION = "SET_LOCATION"
const CHANGE_ORDER = "CHANGE_ORDER"

const defaulState = {
    weather: [],
    location: [],
    startLocation: false,
    isLocationLoad: false,
    isLoad:false,
    isSettings:false,
    isFirst: true
}

export default function weatherReducer(state = defaulState,action) {
    switch (action.type) {
        case SET_WEATHER:
            return {
                ...state,
                weather: [...state.weather,action.payload.weather],
                location: [...state.location,action.payload.location],
                startLocation: false,
                isLoad: true

            }
        case SET_LOCATION:
            return {
                ...state,
                startLocation: action.payload,
                isLocationLoad: true,
            }
        case CHANGE_ORDER:
            return {
                ...state,
                weather: action.payload.weather,
                location: action.payload.location,
                isLoad: true
            }
        default :
            return state
    }
}

export const setWeather = (weather) => ({type:SET_WEATHER,payload:weather})
export const setLocation = (position) => ({type:SET_LOCATION,payload:position})
export const changeOrder = (weather) => ({type:CHANGE_ORDER,payload:weather})

