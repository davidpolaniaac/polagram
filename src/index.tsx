import './index.css';

import * as reducers from './ducks';

import { applyMiddleware, combineReducers, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { reducer as formReducer } from 'redux-form';
import {loadUserInitialData} from './ducks/Users';
import reportWebVitals from './reportWebVitals';
import services from './services';
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const store = createStore(combineReducers({
  ...reducers,
  form: formReducer
}), applyMiddleware(thunk.withExtraArgument(services)));

const loadInitialData = () => store.dispatch(loadUserInitialData())

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App history={history} loadInitialData={loadInitialData}/>
      </Router>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
