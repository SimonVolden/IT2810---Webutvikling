import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setOrder } from "../stateManagement/actions";
import { AppState } from "../stateManagement/types";


//Styles for the header line
const useStyles = makeStyles(() => ({
    button: {
        color: "white",
        background: "#1976d2",
        spacing: 16
    }
}));


export default function FilterMenu(): JSX.Element {
    const dispatch = useDispatch()
    const classes = useStyles();
    const order = useSelector((state: AppState) => state.order);
    const field = useSelector((state: AppState) => state.field);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    function handleClose() {
        setAnchorEl(null);
        dispatch(setOrder(order === 1 ? -1 : 1))
        console.log(order)
    }


    return (
        <>
            <div>
                <Button
                    className={classes.button}
                    id="FilterButton"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon />
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
                            dispatch(setField("id"));
                        }}>ID
                    </MenuItem>
                    <MenuItem
                        id="name-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "name") {
                                dispatch(setOrder(1))
                            }
                            dispatch(setField("name"));

                        }}>Name</MenuItem>
                    <MenuItem
                        id="abv-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "abv") {
                                dispatch(setOrder(1))
                            }
                            dispatch(setField("abv"));
                        }}>Alcohol Percentage</MenuItem>
                    <MenuItem
                        id="likes-menu-item"
                        onClick={() => {
                            handleClose();
                            if (field !== "likes") {
                                dispatch(setOrder(1))
                            }
                            dispatch(setField("likes"));
                        }}>Likes</MenuItem>

                </Menu>
            </div>
        </>
    )
}
