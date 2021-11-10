import React from "react";
import { AppBar, Toolbar, Typography, Switch, FormGroup, FormControlLabel, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../stateManagement/types";
import { changeTheme } from "../stateManagement/actions";
import { useHistory } from "react-router";
import TextSizeChanger from "./TextSizeChanger";


/**
 * The Header where the dark Mode toggle, Title and logout button exists.
 * @returns Returns the header Bar
 */
export default function Header(): JSX.Element {


  const history = useHistory();
  const pageTheme = useSelector((state: AppState) => state.theme)
  const dispatch = useDispatch();
  const pageThemeAria = pageTheme ? "Page Theme toggle, current theme is dark" : "Page Theme toggle, current theme is light"
  const themeColor = pageTheme? "#3f51b5":"#1976D2"

  return (
    <AppBar position="sticky" style={{background: themeColor}} >
      <Toolbar>
        
        {/** change text size */}
        <TextSizeChanger/>

        <FormGroup> {/**Theme toggle */}
          <FormControlLabel id="themeToggle" aria-label={pageThemeAria} 
            control={<Switch
              color="secondary"
              checked={pageTheme}
              onChange={() => {
                dispatch(changeTheme(pageTheme))
                window.localStorage.setItem('pageTheme', String(!pageTheme))
              }
            } />} label={"Dark Mode"} />
        </FormGroup>

        {/**page Title */}
        <Typography id="headerTitle" variant="h5" align="center" sx={{flexGrow: 1}}>
          Beer Viewer
        </Typography>

        {/** Logout button */}
        <Button 
          id="LogoutButton" 
          aria-label="log out button"
          variant="contained" 

          sx={{bgcolor:"white", color: themeColor, ":hover": {bgcolor: "#f50057"}}} 
          onClick={() => {
            localStorage.setItem("access-token", "");
            for (let i: number = 1; i < 241; i++) {
              localStorage.setItem(String(i), "false");
            }

          history.push("/prosjekt3");
          window.location.reload()
        }}> 
          <Typography variant="button" sx={{ fontWeight: 'bold' }} >Log ut</Typography> 
        </Button>
      </Toolbar>
    </AppBar>

  )
}
