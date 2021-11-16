import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import { Loading } from '.';
import List from '@mui/material/List';
import BeerContainer from './BeerContainer';
import { IBeer } from '../interfaces/Beer';

interface BeersVars {
  pageSize: number
  after: number
  search: string
  field: string
  order: number
}

interface BeersData {
  beers: IBeer[]
}

/**
 * Beers collects the data from the database with Apollo. Makes a map of beers.
 * Each beer is presented with the JSX.Element BeerContainer. 
 * @returns Cards of Beers
 */
function Beers(): JSX.Element {
  const search = useSelector((state: AppState) => state.search)
  const pageNumber = useSelector((state: AppState) => state.pageNumber) - 1;
  const pageSize = 10;
  const after = pageNumber;
  const field = useSelector((state: AppState) => state.field);
  const order = useSelector((state: AppState) => state.order);
  const { data, loading, error } = useQuery<BeersData, BeersVars>(
    GET_BEERS,
    { variables: { pageSize, after, search, field, order } }
  );

  if (loading) return <Loading />;
  if (error) return <p>error</p>;
  if (!data) return <p>Not found</p>;

  const beers = data.beers;

  return (
    <List
      component="nav"
      aria-label=""
      sx={{ paddingTop: "10px" }}
    >
      {beers.map((beer: IBeer) => {
        return (
          <BeerContainer beer={beer} key={beer.id} />
        );
      })}
    </List>
  )
}

export const GET_BEERS: DocumentNode = gql`
  query BEERS($pageSize: Int, $after: Int, $search: String, $field: String, $order: Int) {
  beers(pageSize: $pageSize, after: $after, search: $search, field: $field, order: $order ) {
    id
    name
    tagline
    description
    image_url
    first_brewed
    food_pairing
    brewers_tips
    abv
    ingredients {
      hops {
        name
        add
        attribute
        amount {
          unit
          value
        }
      }
      malt {
        name
        amount {
          unit
          value
        }
      }
      yeast
    }
    method {
      mash_temp {
        duration
        temp {
          unit
          value
        }
      }
      fermentation {
        temp {
            value
            unit
        }
      }
      twist
    }
    likes
  }
}
`


export default Beers;
