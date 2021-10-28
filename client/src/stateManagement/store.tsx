import { createStore, Store } from "redux";
import { rootReducer } from "./reducers";
import { AppState } from "./types";


function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    // expose store when run in Cypress,
    // @ts-ignore
if (window.Cypress) {
    // @ts-ignore
    window.store = store
  }
    return store;
}

//exports the store
export const store = configureStore();

