import { createTheme, ThemeProvider, CssBaseline, Paper, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../stateManagement/types';
import Header from './Header2';

function Mainpage(): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    const theme = createTheme({
        palette: {
            type: pageTheme ? "dark" : "light",
        }
    })

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Paper>
                <Grid container direction="column">
                    <Header/>
                </Grid>
            </Paper>
        </ThemeProvider>
/*
    <>
        <h1>Mainpage</h1>
        <h2>{String(pageTheme)}</h2>
        <button onClick={() => dispatch(changeTheme(pageTheme))}></button>
    </>        
*/
    )
}

export default Mainpage;