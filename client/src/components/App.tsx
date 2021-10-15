import React from "react";
import { Provider } from 'react-redux';
import { store } from "../stateManagement/store";
import Mainpage from "./Mainpage";

export default function App(): JSX.Element {

    return(
        <Provider store={store}>
            <Mainpage/>
        </Provider>
    )
}