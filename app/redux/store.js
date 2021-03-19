/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import appReducers from './reducers';

const composeEnhancers = compose;

const store = createStore(
    appReducers,
    composeEnhancers(applyMiddleware(thunk))
);

export { store };
