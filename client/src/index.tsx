import {
  ApolloProvider
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import injectStyles from './styles';
import App from './components/App'
import { Provider } from 'react-redux';
import { store } from './stateManagement/store';
import { client } from './client';


// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
  <ApolloProvider client={client}>
    {/*<IsLoggedIn />*/}
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

