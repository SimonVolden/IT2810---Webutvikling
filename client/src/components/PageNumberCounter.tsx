import { Button, Toolbar, TextField, createTheme, ThemeProvider, Typography } from "@mui/material"
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/**
 * Checks if the decremented page number is a legal value
 * @param pageNumber: number,  the current page
 * @returns boolean
 */
export function isDecPageNumberLegal(pageNumber: number) {
    return (pageNumber - 1) >= 1
}

/**
 * Checks if the incremented page number is a legal value
 * @param pageNumber: number,  the current page
 * @returns boolean
 */
export function isIncPageNumberLegal(pageNumber: number) {
    return (pageNumber + 1) <= 24
}

/**
 * inputs the number from user from the TextField,
 * checks if it is a legal value.
 * @param input: number,  
 * @returns boolean
 */
export function legalInput(input: number): boolean {
    const numberInput = Number(input)

    if (numberInput) {
        if (numberInput >= 1 && numberInput <= 24) {
            return true;
        }
    }
    return false
}


/**
 * The PageNumberCounter is a Bar with buttons that changes the pageNumber of 
 * the api searches. Also shows current page, and a TextField for direct input.
 * 
 * @returns The Search Bar as a JSX.Element
 */
export default function PageNumberCounter(): JSX.Element {
    const [error, setError] = useState(false);
    const pageNumber = useSelector((state: AppState) => state.pageNumber)
    const pageTheme = useSelector((state: AppState) => state.theme)
    const textSize = useSelector((state: AppState) => state.textSize)
    const dispatch = useDispatch();
    return (
        <>
            <Toolbar sx={{
                justifyContent: "center"
            }}>

                {/* Text, page: */}
                <Typography aria-label="page Number" variant="h6" >Page:</Typography>
                {/* Button, decrement pageNumber */}
                <Button id="decPageNumber" aria-label="Last Page button," onClick={() => {
                    if (isDecPageNumberLegal(pageNumber)) {
                        dispatch(decrementPageNumber(pageNumber))
                    }
                }}>
                    <NavigateBeforeIcon sx={{ fill: pageTheme ? "white" : "#1976D2" }} />
                </Button>
                {/* Text, current page: */}
                <Typography variant="h5" aria-label={"Current Page Number " + pageNumber}>{pageNumber}</Typography>
                {/* Button increment pageNumber */}
                <Button id="incPageNumber" aria-label=", Next Page button," onClick={() => {
                    if (isIncPageNumberLegal(pageNumber)) {
                        dispatch(incrementPageNumber(pageNumber))
                    }

                }}>
                    <NavigateNextIcon sx={{ fill: pageTheme ? "white" : "#1976D2" }} />
                </Button>
                {/* Themeprovider is used to input correct theme format (@mui, not @material-ui) */}

                {/* Textfield that only takes numbers */}
                <TextField
                    id="inputPageNumber"
                    aria-label={"Page Number Input Field,"}
                    margin="dense"
                    label="Go to page"
                    size="small"
                    style={{ width: 150 }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                borderColor: "lightgrey"
                            }
                        },
                        "& .MuiInputBase-input": { color: pageTheme ? "white" : "black" },
                        "& .MuiInputLabel-outlined": { color: pageTheme ? "white" : "black" }


                    }}
                    variant="outlined"
                    type="number"
                    InputLabelProps={{ color: "primary" }}
                    inputProps={{ color: "primary", inputMode: 'numeric', pattern: '[0-9]*' }}
                    error={error}
                    onChange={event => {

                        if (legalInput(Number(event.target.value))) {
                            setError(false)
                            dispatch(setPageNumber(Number(event.target.value)))
                        }
                        else {
                            setError(true)
                        }
                    }
                    }
                />
            </Toolbar>
        </>
    )

}