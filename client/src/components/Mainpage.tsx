import { createTheme, ThemeProvider, CssBaseline, Paper, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Beers from '../pages/beers';
import NestedList from '../pages/beer_container';
import { AppState } from '../stateManagement/types';
import Header from './header';
import PageContainer from './page-container';

function Mainpage(): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    const theme = createTheme({
        palette: {
            type: pageTheme ? "dark" : "light",
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper>
                <Grid container direction="column">
                    <Header />
                    <PageContainer>
                        <NestedList />
                        <Beers />
                    </PageContainer>
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