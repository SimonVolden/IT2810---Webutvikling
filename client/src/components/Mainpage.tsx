import { createTheme, ThemeProvider, CssBaseline, Paper, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Beers from '../pages/beers';
import { AppState } from '../stateManagement/types';
import Header from './header';
import PageContainer from './page-container';
import PageNumberCounter from './PageNumberCounter';
import SearchBar from './searchBar';



/**
 * The main web application. 
 * If the user logs in, this is where he ends up.
 * @returns The Page
 */
function Mainpage(): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    const theme = createTheme({ //the main theme for the application
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
                        <PageNumberCounter />
                        <SearchBar />
                        <Beers />
                    </PageContainer>
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}

export default Mainpage;