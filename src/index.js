import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reduxWebsocket from '@giantmachines/redux-websocket';
import { BrowserRouter, Route } from 'react-router-dom';
import { rootSaga } from './sagas';
import { combinedReducer } from './reducers';
import App from './containers/App';

const sagaMiddleware = createSagaMiddleware();
const websocketMiddleware = reduxWebsocket();
const middlewares = [sagaMiddleware, websocketMiddleware];

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

render(
  /* jshint ignore:start */
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  /* jshint ignore:end */
  document.querySelector('#app')
);
