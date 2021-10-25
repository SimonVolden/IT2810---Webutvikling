import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components';
import List from '@mui/material/List';
import BeerContainer from './BeerContainer';
import { Beer } from '../interfaces/Beer';

interface BeersVars {
    pageSize: number
    after: number
}

interface BeersData {
    beers: Beer[]
}

function Beers(): JSX.Element {
    const pageNumber = useSelector((state: AppState) => state.pageNumber) - 1;
    const pageSize=10;
    const after = pageSize * pageNumber;
    const { data, loading, error} = useQuery<BeersData, BeersVars>(
        GET_BEERS,
        { variables: { pageSize, after } }
    );

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    if (!data) return <p>Not found</p>;

    const beers = data.beers;

    return (
        <List
            component="nav"
        >
        {beers.map((beer: Beer) => {
            return (
                <BeerContainer beer={beer} key={beer.id}/>
            );
        })}
        </List>
    )
}

export const GET_BEERS = gql`
  query BEERS($pageSize: Int, $after: Int) {
  beers(pageSize: $pageSize, after: $after) {
    id
    name
    tagline
    description
    image_url
    first_brewed
    food_pairing
    brewers_tips
    abv
  }
}
`

export default Beers;
