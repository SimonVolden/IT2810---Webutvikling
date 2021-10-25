import { gql, useMutation } from "@apollo/client";
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

export default function LikeButton(props: { id: number }): JSX.Element {
    const [updateLike] = useMutation(UPDATE_LIKES);
    const [liked, setLiked] = useState<boolean>((localStorage.getItem(String(props.id)) === "true"));
    function handleLiked() {
        localStorage.setItem(String(props.id), String(!liked))
        setLiked(!liked);
    }
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    updateLike({ variables: { id: props.id, liked: liked } }).then(result => {
                        console.log(result)
                    }).catch(error => {
                        console.log(error)
                    });

                }}
            >
                <IconButton onClick={handleLiked} type="submit">{liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</IconButton>
            </form>
        </div>
    )
}