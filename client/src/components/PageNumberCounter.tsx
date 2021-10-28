import { Button, Toolbar, TextField, createTheme, ThemeProvider, Typography } from "@mui/material"
import React from "react";
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
export function isDecPageNumberLegal(pageNumber: number){
    return (pageNumber-1) >=1
}

/**
 * Checks if the incremented page number is a legal value
 * @param pageNumber: number,  the current page
 * @returns boolean
 */
export function isIncPageNumberLegal(pageNumber: number){
    return (pageNumber+1) <=24
}

/**
 * inputs the number from user from the TextField,
 * checks if it is a legal value.
 * @param input: number,  
 * @returns boolean
 */
export function legalInput(input: number): boolean{
    const numberInput = Number(input)

    if (numberInput) {
        if (numberInput >=1 && numberInput <= 24) {
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
export default function PageNumberCounter():JSX.Element {
    const pageNumber = useSelector((state: AppState) => state.pageNumber)
    const pageTheme = useSelector((state: AppState) => state.theme)
    const dispatch = useDispatch();

    //used to get better readable colors on the TextField entries
    const theme = createTheme({
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: pageTheme? "white" : "black"
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    outlined: {
                        color: pageTheme? "white" : "black"
                    }
                }
            }
        }
    })

    return(
        <>
        <Toolbar sx={{
            justifyContent: "center"
        }}> {/* Text, page: */}
            <Typography aria-label="page Number">Page:</Typography>
            {/* Button, decrement pageNumber */}
            <Button id="decPageNumber" aria-label="Last Page button," onClick={() => {
                if (isDecPageNumberLegal(pageNumber)) {
                        dispatch(decrementPageNumber(pageNumber))
                    }
                }}> 
                <NavigateBeforeIcon/>
            </Button>
            {/* Text, current page: */}
            <Typography aria-label={"Current Page Number " + pageNumber}>{pageNumber}</Typography>
            {/* Button increment pageNumber */}
            <Button id="incPageNumber" aria-label=", Next Page button," onClick={() => {
                if (isIncPageNumberLegal(pageNumber)){
                    dispatch(incrementPageNumber(pageNumber))
                }
                
                }}> 
                <NavigateNextIcon/>
            </Button>
            {/* Themeprovider is used to input correct theme format (@mui, not @material-ui) */}
            <ThemeProvider theme={theme}>
                {/* Textfield that only takes numbers */}
                <TextField 
                    id="inputPageNumber"
                    aria-label={"Page Number Input Field,"}
                    margin="dense"
                    label="Go to page"
                    size="small"
                    style = {{width: 100}}
                    variant="outlined" 
                    value={pageNumber}
                    type="number"
                    InputLabelProps={{ color: "primary" }}
                    inputProps={{ color: "primary", inputMode: 'numeric', pattern: '[0-9]*' }} 
                    onChange={(event) => {
                        if (legalInput(Number(event.target.value))){
                            dispatch(setPageNumber(Number(event.target.value)))
                            }
                        else {
                            dispatch(setPageNumber(pageNumber))
                            }   
                        }
                    }
                    />
                </ThemeProvider>
        </Toolbar>
        </>
    )

}