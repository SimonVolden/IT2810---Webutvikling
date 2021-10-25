import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from "../stateManagement/types";
import { Button, Toolbar, TextField } from "@mui/material";
import { setSearch } from "../stateManagement/actions";


function SearchBar(): JSX.Element {
    const searchString = useSelector((state: AppState) => state.search)
    const dispatch = useDispatch();

    return(
        <>
        <Toolbar sx={{
          justifyContent: "center",
        }}>
            <TextField 
                id="Search for beer" 
                aria-label="Beer search input field" 
                margin="dense"
                label="Beer search"
                variant="outlined" 
                style={{ marginRight: 16 }}
                onChange={(event) => {
                    dispatch(setSearch(event.target.value))
                }}
                />
                <Button aria-label="Seach for beer button" style={{ marginRight: 16 }} 
                variant="outlined" onClick={() => {}}> Search </Button>
                <Button aria-label="Remove seach for beer"  
                variant="outlined" onClick={() => {}}> Clear </Button>
        </Toolbar>
        </>
    )


}

export default SearchBar