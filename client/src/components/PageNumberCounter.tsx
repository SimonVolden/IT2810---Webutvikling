import { Button, Toolbar, TextField } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";


export default function PageNumberCounter():JSX.Element {
    const pageNumber = useSelector((state: AppState) => state.pageNumber)
    const dispatch = useDispatch();


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
        <Toolbar>

            <p aria-label="pageNumber,"> Page: </p>  
            <Button aria-label="Increment Page Number," onClick={() => {
                dispatch(incrementPageNumber(pageNumber))
                }}> + </Button>
            <p aria-label={"Current Page Number, " + pageNumber}>{pageNumber}</p>
            <Button aria-label="Decrement Page Number," onClick={() => {
                if (isDecPageNumberLegal(pageNumber)) {
                        dispatch(decrementPageNumber(pageNumber))
                    }
                }}> - </Button>
            <TextField 
                id="page-number-input" 
                aria-label={"Page Number Input Field,"}
                margin="dense"
                label="Go to page"
                variant="outlined" 
                onChange={(event) => {
                    dispatch(setPageNumber(legalInput(event.target.value)))
                }}
                />
        </Toolbar>
        </>
    )

}