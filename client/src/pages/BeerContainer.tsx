import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BeerListCollapse from './BeerListCollapse';
import Divider from '@mui/material/Divider';
import { Typography } from '@material-ui/core';

function BeerContainer(props: any) {

    return (
        <List
            component="nav"
        >
            <ListItem>
                <img
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
                        <Typography variant="h6">
                            {props.beer.name}
                        </Typography>
                    }
                />
            </ListItem>
            <BeerListCollapse name="Description" data={props.beer.description} />
            <BeerListCollapse name="Tagline" data={props.beer.tagline} />
            <Divider />
        </List>
    );
}

export default BeerContainer;
