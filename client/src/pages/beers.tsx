import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { Header, Button, Loading } from '../components';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import * as GetBeersListTypes from './__generated__/GetBeersList';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';

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
    const pageNumber = useSelector((state: AppState) => state.pageNumber) - 1;
    const pageSize=10;
    const after = pageSize * pageNumber;
    const {
        data,
        loading,
        error
    } = useQuery<any>(GET_BEERS,{
        variables: { pageSize, after },
      });

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    if (!data) return <p>Not found</p>;

    const beers = data.beers;

    return (
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
                    <TableBody >
                        {beers.map((beer: Beer) => {
                            return (
                                <TableRow key={beer.id}>
                                    <TableCell scope="row" aria-label={"beer id:" + beer.id}>
                                        {beer.id}
                                    </TableCell>
                                    <TableCell aria-label={"beer name:" + beer.name}>{beer.name}</TableCell>
                                    <TableCell aria-label={"beer tagline:" + beer.tagline}>{beer.tagline}</TableCell>
                                    <TableCell aria-label={"beer description:" + beer.description}>{beer.description}</TableCell>
                                    <TableCell aria-label={"picture of beer"}>
                                        <img src={beer.image_url} width="100" height="100"></img>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
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
  query BEERS($pageSize: Int, $after: Int) {
  beers(pageSize: $pageSize, after: $after) {
    id
    name
    tagline
    description
    image_url
    first_brewed
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