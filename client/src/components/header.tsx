import React from "react";
import { AppBar, Toolbar, Typography, Switch, Theme, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../stateManagement/types";
import { changeTheme } from "../stateManagement/actions";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  //styles for certain page elements
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

/**
 * The Header where the dark Mode toggle, Title and logout button exists.
 * @returns Returns the header Bar
 */
export default function Header(): JSX.Element {
  const history = useHistory();
  const pageTheme = useSelector((state: AppState) => state.theme)
  const dispatch = useDispatch();
  const classes = useStyles(); //styles for certain page elements
  const pageThemeAria = pageTheme ? "Page Theme toggle, current theme is dark" : "Page Theme toggle, current theme is light"


  return (
    <AppBar position="sticky"> {/* makes it stay on top*/}
      <Toolbar> 
        {/* logout button */}
        <Button id="LogoutButton" variant="outlined" className={classes.button} onClick={() => {
          localStorage.setItem("access-token", "");
          for (let i: number = 1; i < 241; i++) {
            localStorage.setItem(String(i), "false");
          }

          history.push("/");
          window.location.reload()
        }}>Log out </Button>

        {/* title */}
        <Typography id="headerTitle" variant="h6" align="center" className={classes.title}>
          Beer API
        </Typography>

        <FormGroup> {/* Theme toggle */}
          <FormControlLabel id="themeToggle" aria-label={pageThemeAria} control={<Switch
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
