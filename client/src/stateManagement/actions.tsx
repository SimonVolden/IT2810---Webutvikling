
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
