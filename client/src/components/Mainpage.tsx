import { createTheme, ThemeProvider, CssBaseline, Paper, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Beers from '../pages/beers';
import { AppState } from '../stateManagement/types';
import FilterMenu from './filterMenu';
import Header from './header';
import PageContainer from './page-container';
import PageNumberCounter from './PageNumberCounter';
import SearchBar from './searchBar';




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