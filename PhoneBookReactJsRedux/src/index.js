import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App.js";
import {BrowserRouter, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import './styles/App.css';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./store/rootReducer";
import {syncHistoryWithStore} from 'react-router-redux';
import AppContainer from "./components/app/AppContainer";
import logger from 'redux-logger'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <AppContainer/>
        </Router>
    </Provider>,
    document.getElementById("root"));