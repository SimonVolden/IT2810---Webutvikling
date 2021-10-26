import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BeerListCollapse from './BeerListCollapse';
import Divider from '@mui/material/Divider';
import { IconButton, Typography } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Beer } from './beers';
import LikeButton from './LikeButton';
import { gql, useMutation } from '@apollo/client';

export interface BeerContainerProps {
    beer: Beer
}

export const UPDATE_LIKES = gql`
mutation updateLikes($likes: Int!, $id: Int!) {
    updateLikes(likes: $likes, id: $id){
        likes
        id
    }
}
`;

function BeerContainer(props: BeerContainerProps) {


    return (
        <List
            component="nav"
            aria-label=''
        >
            <ListItem>
                <img
                    aria-label="picture of beer,"
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
                />
            </ListItem>
            <BeerListCollapse name="Description" data={props.beer.description} />
            <BeerListCollapse name="Tagline" data={props.beer.tagline} />

            <LikeButton id={Number(props.beer.id)} />

            <Divider />
        </List>
    );
}

export default BeerContainer;
