import React from "react";
import { AppBar, Toolbar, Typography, Switch, Theme, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../stateManagement/types";
import { changeTheme } from "../stateManagement/actions";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const pageTheme = useSelector((state: AppState) => state.theme)
  const dispatch = useDispatch();
  const classes = useStyles();
  const pageThemeAria = pageTheme ? "Page Theme toggle, current theme is dark" : "Page Theme toggle, current theme is light"

  const pageNumber = useSelector((state: AppState) => state.pageNumber) - 1


  console.log(pageNumber)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <FormGroup>
          <FormControlLabel aria-label={pageThemeAria} control={<Switch
            checked={pageTheme} onChange={() => {
              dispatch(changeTheme(pageTheme))
              window.localStorage.setItem('pageTheme', String(!pageTheme))
            }
            } />} label={"Dark Mode"} />
        </FormGroup>
        <Typography variant="h6" align="center" className={classes.title}>
          Beer API
        </Typography>
        <Button variant="outlined" className={classes.button} onClick={() => {
          localStorage.setItem("access-token", "");
          for (let i: number = 1; i < 241; i++) {
            localStorage.setItem(String(i), "false");
          }

          history.push("/");
          window.location.reload()
        }}>Log out </Button>
      </Toolbar>
    </AppBar>

  )
}
