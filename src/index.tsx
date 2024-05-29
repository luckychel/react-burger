import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router }from 'react-router-dom';

import { compose, createStore, applyMiddleware } from 'redux';
import { thunk }  from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/store';
import { TWSStoreActions, socketMiddleware } from './services/socketMiddleware';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_DISCONNECT,
        WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_GET_MESSAGE, WS_USER_DISCONNECT
} from './services/constants';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_DISCONNECT
};
const wsUserActions: TWSStoreActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
  wsDisconnect: WS_USER_DISCONNECT
};

const customSocketMiddleware = socketMiddleware(wsActions);
const customSocketMiddlewareUser = socketMiddleware(wsUserActions);

export const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk, customSocketMiddleware, customSocketMiddlewareUser))); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
     <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
