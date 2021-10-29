import { combineReducers } from "redux";

import { changeTheme, incrementPageNumber, decrementPageNumber, setPageNumber, setSearch, setOrder, setField, setSignup } from './actions'
import { AppState } from './types'

//types of Actions from ./actions

type ThemeActions = ReturnType<typeof changeTheme>;

type PageNumberActions = ReturnType<typeof incrementPageNumber> | ReturnType<typeof decrementPageNumber> | ReturnType<typeof setPageNumber>;

type SearchActions = ReturnType<typeof setSearch>;

type FieldActions = ReturnType<typeof setField>;

type OrderActions = ReturnType<typeof setOrder>;

type SignupActions = ReturnType<typeof setSignup>;

//Helper, used to show correct theme when opening the page
function getSavedTheme(): boolean {
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

//Toggles the theme
function themeReducer(state: boolean = getSavedTheme(), action: ThemeActions) {
    switch (action.type) {
        case "CHANGE_THEME":
            return !state;
        default:
            return state;
    }
}

//Helper, used to get the saved page from localstorage.
function getSavedPageNumber(): number {
    const savedPageNumber = sessionStorage.getItem('pageNumber');
    if (savedPageNumber === null) {
        return 1
    }
    return parseInt(savedPageNumber)
}

//Inc, Dec or sets the pageNumber
function pageNumberReducer(state: number = getSavedPageNumber(), action: PageNumberActions) {
    switch (action.type) {
        case "INCREMENT_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(state + 1))
            return ++state;
        case "DECREMENT_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(state - 1))
            return --state;
        case "SET_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(action.payload))
            return action.payload;

        default:
            return state;
    }
}

//Sets the search-string, "" as default
function searchReducer(state: string = "", action: SearchActions) {
    switch (action.type) {
        case "SET_SEARCH":
            return action.payload;
        default:
            return state;
    }
}

//Sets the filter field
function fieldReducer(state: string = "id", action: FieldActions) {
    switch (action.type) {
        case "SET_FIELD":
            return action.payload;
        default:
            return state;
    }
}

//Sets the order
function orderReducer(state: number = 1, action: OrderActions) {
    switch (action.type) {
        case "SET_ORDER":
            return action.payload;
        default:
            return state;
    }
}
//Sets the order
function signupReducer(state: boolean = false, action: SignupActions) {
    switch (action.type) {
        case "SET_SIGNUP":
            return action.payload;
        default:
            return state;
    }
}

//Utility-funksjon for å kombinere flere reducere
export const rootReducer = combineReducers<AppState>({
    theme: themeReducer,
    pageNumber: pageNumberReducer,
    search: searchReducer,
    field: fieldReducer,
    order: orderReducer,
    signup: signupReducer
});
