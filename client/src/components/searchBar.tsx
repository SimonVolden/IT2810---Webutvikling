import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from "../stateManagement/types";
import { Button, Toolbar, TextField, createTheme, ThemeProvider } from "@mui/material";
import { setPageNumber, setSearch } from "../stateManagement/actions";
import FilterMenu from "./filterMenu";




function SearchBar(): JSX.Element {
    const searchString = useSelector((state: AppState) => state.search)
    const pageTheme = useSelector((state: AppState) => state.theme)
    const dispatch = useDispatch();

    const theme = createTheme({
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: pageTheme ? "white" : "black"
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    outlined: {
                        color: pageTheme ? "white" : "black"
                    }
                }
            }
        }
    })



    return (
        <>
            <Toolbar sx={{
                justifyContent: "center",
            }}>
                <ThemeProvider theme={theme}>
                    <TextField
                        value={searchString}
                        id="Search for beer"
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
                </ThemeProvider >
                <Button aria-label="Remove seach for beer"
                    variant="contained" onClick={() => {
                        dispatch(setSearch(""))
                        dispatch(setPageNumber(1))
                    }}
                    style={{ marginRight: 16 }}
                > Clear </Button>
                <FilterMenu />
            </Toolbar>
        </>
    )


}

export default SearchBar