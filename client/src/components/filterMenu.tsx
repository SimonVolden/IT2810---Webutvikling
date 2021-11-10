import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setOrder } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";


export default function FilterMenu(): JSX.Element {
    const dispatch = useDispatch()
    const order = useSelector((state: AppState) => state.order);
    const field = useSelector((state: AppState) => state.field);
    const pageTheme = useSelector((state: AppState) => state.theme);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    function handleClose() {
        setAnchorEl(null);
        console.log(order)
    }


    return (
        <>
            <div>
                <Button
                    sx={{bgcolor: pageTheme? "#3f51b5":"#1976D2"}}
                    variant="contained"
                    id="FilterButton"
                    aria-label="filter menu"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Typography variant="button"> Sort by</Typography>
                </Button>
                <Menu
                    id="FilterMenu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        id="id-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "id") {
                                dispatch(setOrder(1))
                            }
                            else {
                                dispatch(setOrder(order === 1 ? -1 : 1))
                            }
                            dispatch(setField("id"));
                            

                        }}>ID
                    </MenuItem>
                    <MenuItem
                        id="name-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "name") {
                                dispatch(setOrder(1))
                            } else {
                                dispatch(setOrder(order === 1 ? -1 : 1))

                            }
                            dispatch(setField("name"));

                        }}>Name</MenuItem>
                    <MenuItem
                        id="abv-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "abv") {
                                dispatch(setOrder(1))
                            } else{
                            dispatch(setOrder(order === 1 ? -1 : 1))
                            }
                            dispatch(setField("abv"));

                        }}>Alcohol Percentage</MenuItem>
                    <MenuItem
                        id="likes-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "likes") {
                                dispatch(setOrder(1))
                            } else{
                            dispatch(setOrder(order === 1 ? -1 : 1))

                            }
                            dispatch(setField("likes"));
                        }}>Likes</MenuItem>

                </Menu>
            </div>
        </>
    )
}
