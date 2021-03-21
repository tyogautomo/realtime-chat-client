import axios from '../axios';
import {
    REQ_LOGIN,
    REQ_LOGIN_FAILED,
    REQ_LOGIN_SUCCESS,
    REQ_REGISTER,
    REQ_REGISTER_FAILED,
    REQ_REGISTER_SUCCESS,
    STORE_ACTIVE_ROOMS,
    CONNECT_SOCKET,
    UPDATE_ACTIVE_ROOMS,
} from '../actionTypes';
import { SocketManager } from '../../socket/socketManager';

const requestRegister = (payload) => async (dispatch) => {
    try {
        dispatch({ type: REQ_REGISTER });
        const response = await axios.post('/user', payload);
        const status = response.status;
        const data = response.data;
        if (status === 201) {
            dispatch({ type: REQ_REGISTER_SUCCESS, data });
        } else {
            dispatch({ type: REQ_REGISTER_FAILED, errResponse: response });
        }
    } catch (error) {
        dispatch({
            type: REQ_REGISTER_FAILED,
            errResponse: error.message || error,
        });
    }
};

const requestLogin = (payload) => async (dispatch) => {
    try {
        dispatch({ type: REQ_LOGIN });
        const response = await axios.post('/user/signin', payload);
        const status = response.status;
        const data = response.data;
        if (status === 200) {
            dispatch({ type: REQ_LOGIN_SUCCESS, data });
        } else {
            dispatch({ type: REQ_LOGIN_FAILED, errResponse: response });
        }
    } catch (error) {
        dispatch({
            type: REQ_LOGIN_FAILED,
            errResponse: error.message || error,
        });
    }
};

const initSocket = () => (dispatch, getState) => {
    const { userReducer: { user } } = getState();

    const socketManager = new SocketManager();
    socketManager.connect('http://10.0.2.2:3000');
    socketManager.socket.emit('get active chats', user._id);
    socketManager.socket.on('get active chats', activeChats => {
        dispatch(storeActiveRooms(activeChats));
    });
    dispatch({ type: CONNECT_SOCKET, socketManager });
};

const storeActiveRooms = (activeChats) => dispatch => {
    dispatch({
        type: STORE_ACTIVE_ROOMS,
        activeChats,
    });
};

const updateActiveRooms = (activeChat) => dispatch => {
    dispatch({
        type: UPDATE_ACTIVE_ROOMS,
        activeChat,
    });
};

export {
    requestRegister,
    requestLogin,
    storeActiveRooms,
    updateActiveRooms,
    initSocket,
};
