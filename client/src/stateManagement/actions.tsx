//All the actions we use, wrapped in function

export function changeTheme(theme: boolean) {
    return {
        type: "CHANGE_THEME",
        payload: theme
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
    } as const;
}

export function setOrder(order: number) {
    return {
        type: "SET_ORDER",
        payload: order
    } as const;
}
export function setField(field: string) {
    return {
        type: "SET_FIELD",
        payload: field
    } as const;
}

export function setSignup(signup: boolean) {
    return {
        type: "SET_SIGNUP",
        payload: signup
    } as const;
}

export function setTextSize(textSize: number) {
    return {
        type: "SET_TEXTSIZE",
        payload: textSize
    } as const;
}