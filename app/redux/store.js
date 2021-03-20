import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import appReducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, appReducers);

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
