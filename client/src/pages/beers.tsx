import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { LaunchTile, Header, Button, Loading } from '../components';
import * as GetBeersListTypes from './__generated__/GetBeersList';


export const BEERS_DATA = gql`
    fragment BeerTile on Beer {
        __typename
        id
        name
        tagline
    }
`;

interface BeersProps extends RouteComponentProps { }

const Beers: React.FC<BeersProps> = () => {
    const {
        data,
        loading,
        error
    } = useQuery<any>(GET_BEERS);

    if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    const beers = data.beers;

    return (
        <Fragment>
            <Header />
            {beers.map((beer: any) => (console.log(beer.name)))}
        </Fragment>
    )


    /* const {
        data,
        loading,
        error
    } = useQuery<
        GetBeersListTypes.GetBeersList,
        GetBeersListTypes.GetBeersListVariables
    >(GET_BEERS);

    if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <Fragment>
            <Header />
            {data.beers &&
                data.beers.beers &&
                data.beers.beers.map((beer: any) => (
                    <h1 key={beer.id}>
                        {beer.name}
                    </h1>
                ))}
        </Fragment>
    ) */

}

export const GET_BEERS = gql`
  query Query {
  beers {
    id
    name
    tagline
  }
}
`

/* export const GET_BEERS = gql`
    query GetBeersList($after: String) {
        beers(after: $after) {
            cursor
            hasMore
            beers  {
                ...BeerTile
            }
        }
    }
    ${BEERS_DATA}
`
 */
export default Beers;

/* query Query {
  beer(id: 1) {
    id
    name
  }
} */