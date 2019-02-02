import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import accountReducer from './reducers/accountReducer'
import conversionReducer from './reducers/conversionReducer'
import { Provider } from 'react-redux'


const rootReducer = combineReducers({accounts: accountReducer, conversions: conversionReducer})

const store =  createStore(rootReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
