import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components';
import * as GetBeersListTypes from './__generated__/GetBeersList';
import List from '@mui/material/List';
import BeerContainer from './BeerContainer';

interface Beer {
    id: number
    name: string
    tagline: string
    description: string
    image_url: string
}

export const BEERS_DATA = gql`
    fragment BeerTile on Beer {
        __typename
        id
        name
        tagline
    }
`;


function Beers() {
    const { data, loading, error } = useQuery<any>(GET_BEERS);

    if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
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
  query Query {
  beers {
    id
    name
    tagline
    description
    image_url
  }
}
`

export default Beers;
