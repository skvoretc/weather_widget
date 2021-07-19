import {setLocation} from "../../reducers/weatherReducer";


export const takePosition = () => {
    return async (dispatch) => {
        const onChange = ({coords}) => {
            dispatch(setLocation({lat: coords.latitude, lon: coords.longitude}))
        };
        const onError = (error) => {
            dispatch(setLocation("Error"))
        };
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        let watcher;
        watcher = await geo.watchPosition(onChange, onError);
    }
}
