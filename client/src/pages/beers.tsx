import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import { Loading } from '../components';
import List from '@mui/material/List';
import BeerContainer from './BeerContainer';

export interface Beer {
    id: number
    name: string
    tagline: string
    description: string
    image_url: string
    likes: number
}

interface BeersVars {
    pageSize: number
    after: number
    search: string
}

interface BeersData {
    beers: Beer[]
}

function Beers(): JSX.Element {
    const search = useSelector((state: AppState) => state.search)
    const pageNumber = useSelector((state: AppState) => state.pageNumber) - 1;
    const pageSize = 10;
    const after = pageNumber;
    const { data, loading, error } = useQuery<BeersData, BeersVars>(
        GET_BEERS,
        { variables: { pageSize, after, search } }
    );

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    if (!data) return <p>Not found</p>;

    const beers = data.beers;

    return (
        <List
            component="nav"
            aria-label=""
        >
            {beers.map((beer: Beer) => {
                return (
                    <BeerContainer beer={beer} key={beer.id} />
                );
            })}
        </List>
    )
}

export const GET_BEERS: DocumentNode = gql`
  query BEERS($pageSize: Int, $after: Int, $search: String) {
  beers(pageSize: $pageSize, after: $after, search: $search) {
    id
    name
    tagline
    description
    image_url
    first_brewed
    likes
  }
}
`


export default Beers;
