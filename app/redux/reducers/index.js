import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { messageReducer } from './messageReducer';
import { searchReducer } from './searchReducer';

export default combineReducers({
    userReducer,
    messageReducer,
    searchReducer,
});
