import { gql, useMutation } from "@apollo/client";
import { IconButton, Toolbar } from "@material-ui/core";
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
export default function LikeButton(props: { id: number, likes: number }): JSX.Element {

    const [likes, setLikes] = useState<number>(props.likes)
    const [updateLike] = useMutation(UPDATE_LIKES);
    const [like] = useMutation(LIKE);
    const [liked, setLiked] = useState<boolean>((localStorage.getItem(String(props.id)) === "true"));
    function handleLiked() {
        localStorage.setItem(String(props.id), String(!liked))
        liked ? setLikes(likes - 1) : setLikes(likes + 1)
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
                <Toolbar>
                    <IconButton
                        id={"LikeButton" + props.id}
                        onClick={handleLiked} type="submit">{liked ?
                            <ThumbUpIcon aria-label="unlike beer" id={"ThumbUpButton" + props.id} /> :
                            <ThumbUpOutlinedIcon aria-label="Like beer" id={"ThumbUpOutlinedButton" + props.id} />}</IconButton>
                    {likes}
                </Toolbar>
            </form>
        </div>
    )
}