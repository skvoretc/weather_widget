import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import weatherReducer from "./weatherReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    weather: weatherReducer
})

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const store = createStore(rootReducer,loadFromLocalStorage(),composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => saveToLocalStorage(store.getState()));
