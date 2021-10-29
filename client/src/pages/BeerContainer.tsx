import React, { Fragment} from 'react';
import LikeButton from './LikeButton';
import { gql } from '@apollo/client';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { IBeer } from '../interfaces/Beer';
import Typography from '@mui/material/Typography';
import BeerDescription from './BeerDescription';
import BeerMethods from './BeerMethods';
import BeerIngredients from './BeerIngredients';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { createTheme, ThemeProvider } from '@mui/material';

export interface BeerContainerProps {
    beer: IBeer
}

export const UPDATE_LIKES = gql`
mutation updateLikes($likes: Int!, $id: Int!) {
    updateLikes(likes: $likes, id: $id){
        likes
        id
    }
}
`;

/**
 * BeerContainer returns a JSX.Element Card that contains all the presented beer info.
 * @param props The Beer, sent in from beers.tsx
 * @returns JSX.Element Card of beer
 */
function BeerContainer(props: BeerContainerProps): JSX.Element {
    
    //PageTheme, used to get the correct theme state, to update themes.
    const pageTheme = useSelector((state: AppState) => state.theme)
    //Card backgroundColor
    const cardTheme = pageTheme ? "#424242" :"#ffffff"

    //MUI theme
    const theme = createTheme({
        palette: {
            mode: pageTheme ? "dark" : "light",
        }
    })

    return (
        <ThemeProvider theme={theme}>
        {/**Parent Card, contains the whole Beer */}
        <Card sx={{ marginBottom: "1vh", }} square={true} elevation={3} style={{ backgroundColor: cardTheme }}>
            
            {/** Header with Picture, Title, tagline and alcohol level */}
            <CardHeader 
                avatar={
                    <Avatar aria-label="picture of beer" alt={props.beer.name} src={props.beer.image_url} variant="square" sx={{ width: "25px !important", height: "auto !important" }} />
                }
                title={
                    <Typography aria-label={"Beer name: " + props.beer.name} variant="h6">{props.beer.name}</Typography>
                }
                subheader={
                    <Fragment>
                        <Typography aria-label={"Tagline: " + props.beer.tagline} variant="subtitle2">{props.beer.tagline}</Typography>
                        <Typography aria-label={"Alcohol percentage: " + props.beer.abv} variant="subtitle1">{props.beer.abv +"%"}</Typography>
                        <LikeButton id={Number(props.beer.id)}/>
                    </Fragment>
                }
            />
                {/* Beer Description as a dropdown menu */}
                <BeerDescription name="Description" desc={props.beer.description} food_pairing={props.beer.food_pairing} />
                {/* Beer Methods as a dropdown menu */}
                <BeerMethods name="Methods/Timings" method={props.beer.method} brewers_tips={props.beer.brewers_tips} />
                {/* Beer Ingredients as a dropdown menu */}
                <BeerIngredients name="Ingredients" ingredients={props.beer.ingredients} />

            </Card>
        </ThemeProvider>
    );
}

export default BeerContainer;
