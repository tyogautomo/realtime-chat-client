import thunk from 'redux-thunk';
import JSOG from 'jsog';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import appReducers from './reducers';

const JSOGTransform = createTransform(
    (inboundState, key) => JSOG.encode(inboundState),
    (outboundState, key) => JSOG.decode(outboundState),
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
    transforms: [JSOGTransform],
};

const persistedReducer = persistReducer(persistConfig, appReducers);

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
