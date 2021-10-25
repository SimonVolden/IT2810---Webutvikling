import { combineReducers } from "redux";

import { changeTheme, incrementPageNumber, decrementPageNumber, setPageNumber, setSearch} from './actions'
import { AppState } from './types'

type ThemeActions = ReturnType<typeof changeTheme>;

type PageNumberActions = ReturnType<typeof incrementPageNumber> | ReturnType<typeof decrementPageNumber> | ReturnType<typeof setPageNumber>;

type SearchActions = ReturnType<typeof setSearch>;

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

function  getSavedPageNumber(): number{
    const savedPageNumber = sessionStorage.getItem('pageNumber');
    if (savedPageNumber === null) {
        return 1
    }
    return parseInt(savedPageNumber)
}

function pageNumberReducer(state: number = getSavedPageNumber(), action: PageNumberActions){
    switch (action.type) {
        case "INCREMENT_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(state+1))
            return ++state;
        case "DECREMENT_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(state-1))
            return --state;
        case "SET_PAGE_NUMBER":
            sessionStorage.setItem('pageNumber', String(action.payload))
            return action.payload;
            
        default:
            return state;
    }
}

function searchReducer(state: string = "", action: SearchActions){
    switch (action.type) {
        case "SET_SEARCH":
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
});
