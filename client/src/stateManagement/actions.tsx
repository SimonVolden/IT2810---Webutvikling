import { Beer } from "./types";

//Funksjoner som returnerer action-objekter
export function addCountry(countryName: string) {
    return {
        type: "ADD_COUNTRY",
        payload: countryName
    } as const;
}
export function removeCountry(countryName: string) {
    return {
        type: "REMOVE_COUNTRY",
        payload: countryName
    } as const;
}

export function changeTheme(theme: boolean) {
    return {
        type: "CHANGE_THEME",
        payload: theme
    } as const;
}

export function addBeer(beer: Beer) {
    return {
        type: "ADD_BEER",
        payload: beer
    } as const;
}

export function removeBeer(id: number) {
    return {
        type: "REMOVE_BEER",
        payload: id
    } as const;
}

export function incrementPageNumber(page: number) {
    return {
        type: "INCREMENT_PAGE_NUMBER",
        payload: page
    } as const;
}

export function decrementPageNumber(page: number) {
    return {
        type: "DECREMENT_PAGE_NUMBER",
        payload: page
    } as const;
}

export function setPageNumber(page: number) {
    return {
        type: "SET_PAGE_NUMBER",
        payload: page
    } as const;
}

export function setSearch(search: string) {
    return {
        type: "SET_SEARCH",
        payload: search
    }  as const;
}