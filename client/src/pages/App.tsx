import React from "react";
import Mainpage from "./Mainpage";
import SignUp from "./Signup";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import { DocumentNode, gql, useQuery } from '@apollo/client';
import { useSelector } from "react-redux";
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

/**
 * Sends the user to the correct page.
 * @returns Login page, or Signup page, or Mainpage
 */
export default function App(): JSX.Element {
    const likeData = useQuery<QueryData, QueryVars>(GET_LIKED_BY_USER, { variables: { token: String(localStorage.getItem("access-token")) } }).data
    const data = useQuery<TokenData, TokenVars>(VALID_TOKEN, { variables: { token: String(localStorage.getItem("access-token")) } }).data

    const signup = useSelector((state: AppState) => state.signup)


    if (!likeData) return <p>Not found. Please connect to VPN</p>;

    const beers = likeData.getLikedByUser
    beers.forEach(beer => {
        localStorage.setItem(String(beer), "true");
    })

    if (!data) return <p>Not found. Please connect to VPN</p>;
    const valid = data.validToken;


    return (
        <Router>
            <Switch>
                <Route exact path="/prosjekt4">{valid ?
                    <Mainpage />
                    : (signup ? <SignUp /> : <Login />)
                }
                </Route>
                <Route exact path="/prosjekt4/signup">
                    <SignUp />
                </Route>
                <Route exact path="/prosjekt4/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}