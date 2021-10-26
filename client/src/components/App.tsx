import React, { useState } from "react";
import { Provider } from 'react-redux';
import { store } from "../stateManagement/store";
import Mainpage from "./Mainpage";
import SignUp from "../pages/Signup";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from "../pages/Login";
import { DocumentNode, gql, useQuery } from '@apollo/client';
import Loading from "./loading";

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


export default function App(): JSX.Element {

    const { data, loading, error } = useQuery<TokenData, TokenVars>(VALID_TOKEN, { variables: { token: String(localStorage.getItem("access-token")) } })

    console.log(localStorage.getItem("access-token"))
    if (!data) return <p>Not found</p>;
    const valid = data.validToken;

    console.log(valid)
    console.log(data)
    console.log(typeof (data?.validToken))


    //const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <Router>
            <Switch>
                <Route exact path="/">{valid ?
                    <Provider store={store}>
                        <Mainpage />
                    </Provider>
                    : <Redirect to="/login" />
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