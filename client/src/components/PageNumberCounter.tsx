import { Button, Toolbar, TextField, createTheme, ThemeProvider, Typography } from "@mui/material"
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';




export default function PageNumberCounter():JSX.Element {
    const pageNumber = useSelector((state: AppState) => state.pageNumber)
    const pageTheme = useSelector((state: AppState) => state.theme)
    const dispatch = useDispatch();

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

    function isDecPageNumberLegal(nextPageNumber: number){
        return nextPageNumber-1 >=1
    }
    function legalInput(input: string): number{
        const numberInput = Number(input)

        if (numberInput) {
            if (numberInput >=1) {
                return numberInput; 
        }}
        return pageNumber
    }


    return(
        <>
        <Toolbar sx={{
            justifyContent: "center"
        }}>
            <Typography aria-label="page Number">Page:</Typography>
            <Button aria-label="Last Page button," onClick={() => {
                if (isDecPageNumberLegal(pageNumber)) {
                        dispatch(decrementPageNumber(pageNumber))
                    }
                }}> 
                <NavigateBeforeIcon/>
            </Button>
            <Typography aria-label={"Current Page Number " + pageNumber}>{pageNumber}</Typography>
            <Button aria-label=", Next Page button," onClick={() => {
                dispatch(incrementPageNumber(pageNumber))
                }}> 
                <NavigateNextIcon/>
            </Button>
            <ThemeProvider theme={theme}>
                <TextField 
                    id="page-number-input" 
                    aria-label={"Page Number Input Field,"}
                    margin="dense"
                    label="Go to page"
                    variant="outlined" 
                    value={pageNumber}
                    type="number"
                    InputLabelProps={{ color: "primary" }}
                    inputProps={{ color: "primary", inputMode: 'numeric', pattern: '[0-9]*' }} 
                    onChange={(event) => {
                        dispatch(setPageNumber(legalInput(event.target.value)))
                    }}
                    />
                </ThemeProvider>
        </Toolbar>
        </>
    )

}