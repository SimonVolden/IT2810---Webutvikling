import { combineReducers } from "redux";

import {addCountry, removeCountry, changeTheme} from './actions'
import {AppState, Country } from './types'


type CountryActions = ReturnType<typeof addCountry> | ReturnType<typeof removeCountry>;

type ThemeActions = ReturnType<typeof changeTheme>;

function countryReducer(state: Country[] = [], action: CountryActions) {
    switch (action.type) {
        case "ADD_COUNTRY":
            return state.concat({ name: action.payload });
        case "REMOVE_COUNTRY":
            return state.filter(country => country.name !== action.payload);
        default:
            neverReached(action);
    }
    return state;
}

//used to show correct theme when opening the page
function getSavedTheme(): boolean{
    const savedTheme = localStorage.getItem('pageTheme')
    switch (savedTheme) {
        case ('true'):
            return true;
        case ('false'):
            return false;
        default:
            localStorage.setItem('pageTheme', 'false')
            return false
    }
}

function themeReducer(state: boolean = getSavedTheme(), action: ThemeActions) {
    switch (action.type) {
        case "CHANGE_THEME":
            return !state;
        default:
            return state;
    }
}

function neverReached(never: never) {}

//Utility-funksjon for å kombinere flere reducere
export const rootReducer = combineReducers<AppState>({
    country: countryReducer,
    theme: themeReducer
});
