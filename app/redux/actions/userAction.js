import axios from '../axios';
import { AppState } from 'react-native';
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
    STORE_ROOM_MESSAGES,
    STORE_NEW_MESSAGE,
    ADD_ACTIVE_ROOM,
    REQ_USER_DATA,
    REQ_USER_DATA_SUCCESS,
    REQ_USER_DATA_FAILED,
    SET_CURRENT_ROOM,
    REMOVE_CURRENT_ROOM,
    ADD_NEW_FRIEND,
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

const requestUserData = () => async (dispatch, getState) => {
    try {
        const { userReducer: { user } } = getState();

        dispatch({ type: REQ_USER_DATA });
        const response = await axios.get(`/user/${user._id}`);
        const status = response.status;
        const data = response.data;
        if (status === 200) {
            dispatch({ type: REQ_USER_DATA_SUCCESS, data });
        } else {
            dispatch({ type: REQ_USER_DATA_FAILED, errResponse: response });
        }
    } catch (error) {
        dispatch({
            type: REQ_USER_DATA_FAILED,
            errResponse: error.message || error,
        });
    }
};

const initSocket = () => (dispatch, getState) => {
    const { userReducer: { user } } = getState();

    const socketManager = new SocketManager();
    socketManager.connect('http://10.0.2.2:3000');
    const socket = socketManager.socket;

    // initial emitter
    socket.emit('identity', user._id);
    socket.emit('get active chats', user._id);
    AppState.addEventListener('change', state => {
        if (state === 'background') {
            socket.emit('background app', user._id);
        } else if (state === 'active') {
            socket.emit('active app', user._id);
        }
    });

    // listener
    socket.on('get active chats', activeChats => {
        const roomIds = activeChats.map(room => room._id);
        socket.emit('join room', roomIds);
        dispatch(storeActiveRooms(activeChats));
    });
    socket.on('fetch messages', messages => {
        dispatch(storeMessages(messages));
    });
    socket.on('send message', ({ message, updatedRoom }) => {
        dispatch(updateActiveRooms(updatedRoom));
        dispatch(storeNewMessage(message));
    });
    socket.on('add friend', (friend) => {
        dispatch(addNewFriend(friend));
    });
    dispatch({ type: CONNECT_SOCKET, socketManager });
};

// only dispatcher
const storeActiveRooms = (activeChats) => (dispatch) => {
    dispatch({
        type: STORE_ACTIVE_ROOMS,
        activeChats,
    });
};

const updateActiveRooms = (activeChat) => (dispatch) => {
    dispatch({
        type: UPDATE_ACTIVE_ROOMS,
        activeChat,
    });
};

const storeMessages = (messages) => (dispatch) => {
    dispatch({
        type: STORE_ROOM_MESSAGES,
        messages,
    });
};

const storeNewMessage = (message) => (dispatch) => {
    dispatch({
        type: STORE_NEW_MESSAGE,
        message,
    });
};

const addNewFriend = (friend) => (dispatch) => {
    dispatch({
        type: ADD_NEW_FRIEND,
        friend,
    });
};

const initChat = ({ activeChat, isNewActive }) => (dispatch) => {
    if (isNewActive) {
        dispatch({
            type: ADD_ACTIVE_ROOM,
            activeChat,
        });
    }
};

const setCurrentRecipient = (currentRecipient) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_ROOM,
        currentRecipient,
    });
};

const removeCurrentRecipient = () => (dispatch) => {
    dispatch({ type: REMOVE_CURRENT_ROOM });
};

export {
    requestRegister,
    requestLogin,
    storeActiveRooms,
    updateActiveRooms,
    initSocket,
    initChat,
    requestUserData,
    setCurrentRecipient,
    removeCurrentRecipient,
};
