import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import Router from '@/Router';
import App from '@/containers/App';
import rootSaga from '@/sagas';
import rootReducer from '@/slices';
import history from '@/util/history';

import './index.styles.scss';

const sagaMiddlware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddlware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddlware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
