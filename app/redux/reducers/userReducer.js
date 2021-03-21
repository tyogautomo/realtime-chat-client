import {
    REQ_LOGIN,
    REQ_LOGIN_FAILED,
    REQ_LOGIN_SUCCESS,
    REQ_REGISTER,
    REQ_REGISTER_SUCCESS,
    REQ_REGISTER_FAILED,
    STORE_ACTIVE_ROOMS,
    CONNECT_SOCKET,
} from '../actionTypes';
import { SocketManager } from '../../socket/socketManager';

const initialState = {
    socketManager: new SocketManager(),
    isRequestRegister: false,
    isRequestLogin: false,
    errResponseRegister: null,
    errResponseLogin: null,
    user: {
        username: '',
        activeChats: [],
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQ_REGISTER:
            return {
                ...state,
                isRequestRegister: true,
                errResponseRegister: null,
            };
        case REQ_REGISTER_SUCCESS:
            return {
                ...state,
                isRequestRegister: false,
            };
        case REQ_REGISTER_FAILED:
            return {
                ...state,
                isRequestRegister: false,
                errResponseRegister: action.errResponse,
            };
        case REQ_LOGIN: {
            return {
                ...state,
                isRequestLogin: true,
                errResponseLogin: null,
            };
        }
        case REQ_LOGIN_SUCCESS:
            return {
                ...state,
                isRequestLogin: false,
                user: action.data,
            };
        case REQ_LOGIN_FAILED:
            return {
                ...state,
                isRequestLogin: false,
                errResponseLogin: action.errResponse,
            };
        case STORE_ACTIVE_ROOMS: {
            const updatedUser = { ...state.user };
            updatedUser.activeChats = action.activeChats;
            return {
                ...state,
                user: updatedUser,
            };
        }
        case CONNECT_SOCKET: {
            return {
                ...state,
                socketManager: action.socketManager,
            };
        }
        default:
            return state;
    }
};

export { userReducer };
