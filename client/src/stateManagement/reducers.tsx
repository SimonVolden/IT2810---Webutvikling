import React from "react";
import { combineReducers } from "redux";

import {addCountry, removeCountry} from './actions'
import {AppState, Country} from './types'


type Actions = ReturnType<typeof addCountry> | ReturnType<typeof removeCountry>;

function countryReducer(state: Country[] = [], action: Actions) {
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

function neverReached(never: never) {}

//Utility-funksjon for å kombinere flere reducere
export const rootReducer = combineReducers<AppState>({
    country: countryReducer
});
