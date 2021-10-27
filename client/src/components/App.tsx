import React, { useState } from "react";
import { Provider, useSelector } from 'react-redux';
import { store } from "../stateManagement/store";
import Mainpage from "./Mainpage";
import SignUp from "../pages/Signup";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from "../pages/Login";
import { DocumentNode, gql, useQuery } from '@apollo/client';
import Loading from "./loading";
import Header from "./header";
import { AppState } from "../stateManagement/types";

const VALID_TOKEN: DocumentNode = gql`
    query Query ($token: String!) {
  validToken(token: $token) 
}
`

interface TokenVars {
    token: string
}

interface TokenData {
    validToken: boolean
}


export const GET_LIKED_BY_USER = gql`
query getLikedByUser ($token: String!) {
  getLikedByUser(token: $token)
}
`

interface QueryVars {
    token: string
}

interface QueryData {
    getLikedByUser: [Number]
}


export default function App(): JSX.Element {
    const likeData = useQuery<QueryData, QueryVars>(GET_LIKED_BY_USER, { variables: { token: String(localStorage.getItem("access-token")) } }).data
    const data = useQuery<TokenData, TokenVars>(VALID_TOKEN, { variables: { token: String(localStorage.getItem("access-token")) } }).data

    if (!likeData) return <p>Not found. Please connect to VPN</p>;


    const beers = likeData.getLikedByUser
    beers.map(beer => {
        localStorage.setItem(String(beer), "true");
    })

    if (!data) return <p>Not found. Please connect to VPN</p>;
    const valid = data.validToken;



    //const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <Router>
            <Switch>
                <Route exact path="/">{valid ?
                    <Mainpage />
                    : <Login />

                }
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}