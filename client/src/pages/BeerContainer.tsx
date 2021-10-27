import React, { Fragment } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { Beer } from '../interfaces/Beer';
import Typography from '@mui/material/Typography';
import BeerDescription from './BeerDescription';
import BeerMethods from './BeerMethods';
import BeerIngredients from './BeerIngredients';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { createTheme, ThemeProvider } from '@mui/material';

interface BeerContainerProps {
    beer: Beer
}


function BeerContainer(props: BeerContainerProps): JSX.Element {
    
    
    const pageTheme = useSelector((state: AppState) => state.theme)
    const cardTheme = pageTheme ? "#424242" :"#ffffff"

    const theme = createTheme({
        palette: {
            mode: pageTheme ? "dark" : "light",
        }
    })


    return (
        <ThemeProvider theme={theme}>
        <Card sx={{ marginBottom: "1vh", }} square={true} elevation={3} style={{ backgroundColor: cardTheme }}>
            <CardHeader 
                avatar={
                    <Avatar alt={props.beer.name} src={props.beer.image_url} variant="square" sx={{ width: "25px !important", height: "auto !important" }} />
                }
                title={
                    <Typography variant="h6">{props.beer.name}</Typography>
                }
                subheader={
                    <Fragment>
                        <Typography variant="subtitle2">{props.beer.tagline}</Typography>
                        <Typography variant="subtitle1">{props.beer.abv +"%"}</Typography>
                    </Fragment>
                }
            />
            
                <BeerDescription name="Description" desc={props.beer.description} food_pairing={props.beer.food_pairing} />
                <BeerMethods name="Methods/Timings" method={props.beer.method} brewers_tips={props.beer.brewers_tips} />
                <BeerIngredients name="Ingredients" ingredients={props.beer.ingredients} />
            
        </Card>
        </ThemeProvider>
    );
}

export default BeerContainer;
