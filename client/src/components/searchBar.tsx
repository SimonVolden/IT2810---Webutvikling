import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from "../stateManagement/types";
import { Button, Toolbar, TextField, createTheme, ThemeProvider } from "@mui/material";
import { setPageNumber, setSearch } from "../stateManagement/actions";

/**
 * The searchbar with a TextField for search input and a clear 
 * button that resets the search, filters and pageNumber states.
 * 
 * @returns The Search Bar as a JSX.Element
 */
function SearchBar(): JSX.Element {
    const searchString = useSelector((state: AppState) => state.search)
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

    return( //Themeprovider is used to input correct theme format (@mui, not @material-ui)
        <>
        <Toolbar sx={{ //lets us put elements in a line
          justifyContent: "center",
        }}>
            <ThemeProvider theme={theme}> 
            <TextField 
                value={searchString}
                id="searchField" 
                aria-label="Beer search input field" 
                margin="dense"
                label="Beer search"
                variant="outlined" 
                placeholder={searchString}
                size="small"
                style={{ marginRight: 16 }}
                onChange={(event) => {
                    dispatch(setSearch(event.target.value))
                    dispatch(setPageNumber(1))
                }}
                />
                </ThemeProvider>
                <Button id="clear" aria-label="Remove seach for beer"  
                variant="contained" onClick={() => {
                    dispatch(setSearch(""))
                    dispatch(setPageNumber(1))
                }}> Clear </Button>
        </Toolbar>
        </>
    )


}

export default SearchBar