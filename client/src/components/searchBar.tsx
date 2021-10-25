import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from "../stateManagement/types";
import { Button, Toolbar, TextField } from "@mui/material";
import { setPageNumber, setSearch } from "../stateManagement/actions";


function SearchBar(): JSX.Element {
    const searchString = useSelector((state: AppState) => state.search)
    const dispatch = useDispatch();

    return(
        <>
        <Toolbar sx={{
          justifyContent: "center",
        }}>
            <TextField 
                value={searchString}
                id="Search for beer" 
                aria-label="Beer search input field" 
                margin="dense"
                label="Beer search"
                variant="outlined" 
                placeholder={searchString}
                style={{ marginRight: 16 }}
                onChange={(event) => {
                    dispatch(setSearch(event.target.value))
                    dispatch(setPageNumber(1))
                }}
                />
                <Button aria-label="Remove seach for beer"  
                variant="outlined" onClick={() => {
                    dispatch(setSearch(""))
                    dispatch(setPageNumber(1))
                }}> Clear </Button>
        </Toolbar>
        </>
    )


}

export default SearchBar