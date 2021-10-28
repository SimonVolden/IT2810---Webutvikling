import { gql, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';



export const UPDATE_LIKES = gql`
mutation updateLikes( $id: Int!, $liked: Boolean!) {
    updateLikes(id: $id, liked: $liked){
        likes
    }
}
`;

export const LIKE = gql`
mutation Like($token: String!, $beerID: Int!) {
  like(token: $token, beerID: $beerID )
}
`

/**
 * LikeButton that changes visuals depending on if the user has liked the beer or not.
 * Updates the Database when the user likes a beer.
 * @param props id of beer.
 * @returns IconButton
 */
export default function LikeButton(props: { id: number }): JSX.Element {

    const [updateLike] = useMutation(UPDATE_LIKES);
    const [like] = useMutation(LIKE);
    const [liked, setLiked] = useState<boolean>((localStorage.getItem(String(props.id)) === "true"));
    function handleLiked() {
        localStorage.setItem(String(props.id), String(!liked))
        setLiked(!liked);
    }


    return (
        <div>
            <form
                onSubmit={e => { //for useMutation, sending to the database.
                    e.preventDefault();
                    updateLike({ variables: { id: props.id, liked: liked } }).then(result => {
                        //console.log(result)
                    }).catch(error => {
                        console.log(error)
                    });

                    like({ variables: { token: localStorage.getItem("access-token"), beerID: props.id } }).then(result => {
                        //console.log(result)
                    }).catch(error => {
                        console.log(error)
                    })



                }}
            > {/** The actual button */}
                <IconButton 
                    id={"LikeButton"+props.id} 
                    onClick={handleLiked} type="submit">{liked ? 
                        <ThumbUpIcon id={"ThumbUpButton"+props.id}/> : 
                        <ThumbUpOutlinedIcon id={"ThumbUpOutlinedButton"+props.id} />}</IconButton>
            </form>
        </div>
    )
}