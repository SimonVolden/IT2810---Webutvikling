import { Button, Toolbar, TextField } from "@mui/material"
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export function isDecPageNumberLegal(nextPageNumber: number){
    return (nextPageNumber-1) >=1
}
export function isIncPageNumberLegal(nextPageNumber: number){
    return (nextPageNumber+1) <=24
}
export function legalInput(input: number): boolean{
    const numberInput = Number(input)

    if (numberInput) {
        if (numberInput >=1 && numberInput <= 24) {
            return true; 
        }
   }
    return false
}

export default function PageNumberCounter():JSX.Element {
    const pageNumber = useSelector((state: AppState) => state.pageNumber)
    const dispatch = useDispatch();

    return(
        <>
        <Toolbar sx={{
            justifyContent: "center"
        }}>

            <p aria-label="pageNumber,"> Page: </p>  
            <Button aria-label="Last Page button," onClick={() => {
                if (isDecPageNumberLegal(pageNumber)) {
                        dispatch(decrementPageNumber(pageNumber))
                    }
                }}> 
                <NavigateBeforeIcon/>
            </Button>
            <p aria-label={"Current Page Number " + pageNumber}>{pageNumber}</p>
            <Button aria-label=", Next Page button," onClick={() => {
                if (isIncPageNumberLegal(pageNumber)){
                    dispatch(incrementPageNumber(pageNumber))
                }
                
                }}> 
                <NavigateNextIcon/>
            </Button>
            <TextField 
                id="page-number-input" 
                aria-label={"Page Number Input Field,"}
                margin="dense"
                label="Go to page"
                variant="outlined" 
                onChange={(event) => {
                    const input = Number(event.target.value)
                    dispatch(setPageNumber(legalInput(input)? input : pageNumber ))
                }}
                />
        </Toolbar>
        </>
    )

}