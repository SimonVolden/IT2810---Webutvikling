import React from "react";
import { AppBar, Toolbar, Typography, Switch, Theme, FormGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../stateManagement/types";
import { changeTheme } from "../stateManagement/actions";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: "white",
      background: "#3f51b5",
    }
  
  }));

export default function Header(): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    const dispatch = useDispatch();
    const classes = useStyles();


    
    
    return(
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" align="center" className={classes.title}>
              Beer API
            </Typography>
    
            <FormGroup>
              <FormControlLabel control={<Switch
                checked={pageTheme} onChange={() => {
                    dispatch(changeTheme(pageTheme))
                    window.localStorage.setItem('pageTheme', String(!pageTheme))
                }
                } />} label={"Dark Mode"} />
            </FormGroup>
          </Toolbar>
        </AppBar>

    )
}
