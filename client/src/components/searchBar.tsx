import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from "../stateManagement/types";
import { Button, Toolbar, TextField, createTheme, ThemeProvider, Typography } from "@mui/material";
import { setField, setOrder, setPageNumber, setSearch } from "../stateManagement/actions";
import FilterMenu from "./filterMenu";

/**
 * The searchbar with a TextField for search input and a clear 
 * button that resets the search, filters and pageNumber states.
 * 
 * @returns The Search Bar as a JSX.Element
 */
function SearchBar(): JSX.Element {
    const searchString = useSelector((state: AppState) => state.search)
    const pageTheme = useSelector((state: AppState) => state.theme)
    const textSize = useSelector((state: AppState) => state.textSize)
    const dispatch = useDispatch();

    //used to get better readable colors on the TextField entries


    return ( //Themeprovider is used to input correct theme format (@mui, not @material-ui)
        <>
            <Toolbar sx={{
                justifyContent: "center",
            }}>
                    <TextField
                        value={searchString}
                        id="searchField" 
                        aria-label="Beer search input field"
                        margin="dense"
                        label="Beer search"
                        variant="outlined"
                        placeholder={searchString}
                        size="small"
                        sx={{  "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                              borderColor: "lightgrey"
                            }
                          }, 
                          "& .MuiInputBase-input": { color: pageTheme ? "white" : "black" },
                          "& .MuiInputLabel-outlined": { color: pageTheme ? "white" : "black" }
                          

                        }}
                        style={{ marginRight: 16 }}
                        onChange={(event) => {
                            dispatch(setSearch(event.target.value))
                            dispatch(setPageNumber(1))
                        }}
                    />
                <Button 
                    id="clear"
                    aria-label="Remove search for beer"
                    variant="contained"
                    sx={{bgcolor: pageTheme? "#3f51b5":"#1976D2"}}
                    style={{ marginRight: 16 }} 
                    onClick={() => {
                        dispatch(setSearch(""))
                        dispatch(setPageNumber(1))
                        dispatch(setOrder(1))
                        dispatch(setField("id"))
                    }}
                >
                    <Typography variant="button"> Clear </Typography> 
                </Button>

                <FilterMenu />
            </Toolbar>
        </>
    )


}

export default SearchBar