import { Button, IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextSize } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";
import FormatSizeRoundedIcon from '@mui/icons-material/FormatSizeRounded';

export default function TextSizeChanger():JSX.Element {
    const textSize = useSelector((state: AppState) => state.textSize)
    const dispatch = useDispatch();

    function changeFontSize(){
        const value = textSize
        switch (value) {
            case (14):
                dispatch(setTextSize(16));
                break
            case (16):
                dispatch(setTextSize(18));
                break
            case (18):
                dispatch(setTextSize(14));
                break
            default:
                dispatch(setTextSize(14));
        }
                
    }

    return(
        <>
        <IconButton onClick={() => {changeFontSize()}}>
            <FormatSizeRoundedIcon style={{fill: "white"}}/>
        </IconButton>
        </>
    )
}