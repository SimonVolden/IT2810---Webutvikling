import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BeerListCollapse from './BeerListCollapse';
import Divider from '@mui/material/Divider';
import { Typography } from '@material-ui/core';
import { Description } from '@material-ui/icons';
import { getCollapseUtilityClass } from '@mui/material';
import { Beer } from './beers';

interface BeerContainerProps {
    beer: Beer
}

function BeerContainer(props: BeerContainerProps) {

    return (
        <List
            component="nav"
            aria-label=''
        >
            <ListItem>
                <img
                    aria-label="picture of beer,"
                    alt="Image of beer"
                    src={props.beer.image_url}
                    style={{
                        width: "7%",
                        height: "auto",
                        paddingRight: 10
                    }}
                ></img>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography aria-label={"beer name:, " + props.beer.name + " , "} variant="h6">
                            {props.beer.name}
                        </Typography>
                    }
                    secondary={
                        <Typography aria-label={"tagline:, " + props.beer.tagline + " , "} variant="subtitle2">
                            {props.beer.tagline}
                        </Typography>
                    }
                />
            </ListItem>
            <BeerListCollapse name="Description" data={props.beer.description} />
            <Divider />
        </List>
    );
}

export default BeerContainer;
