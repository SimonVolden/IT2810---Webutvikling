import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { LaunchTile, Header, Button, Loading } from '../components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as GetBeersListTypes from './__generated__/GetBeersList';

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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Tagline</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beers.map((beer: Beer) => {
                            return (
                                <TableRow key={beer.id}>
                                    <TableCell scope="row">
                                        {beer.id}
                                    </TableCell>
                                    <TableCell>{beer.name}</TableCell>
                                    <TableCell>{beer.tagline}</TableCell>
                                    <TableCell>{beer.description}</TableCell>
                                    <TableCell>
                                        <img src={beer.image_url} width="100" height="100"></img>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
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
    description
    image_url
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