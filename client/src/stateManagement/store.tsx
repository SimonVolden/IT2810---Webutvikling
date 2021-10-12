import React from "react";
import { createStore, Store } from "redux";
import { rootReducer } from "./reducers";
import { AppState } from "./types";


function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}
//Hvis du vil bruke redux dev tools kan du erstatte undefined med
//(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

//Oppretter en store
export const store = configureStore();

