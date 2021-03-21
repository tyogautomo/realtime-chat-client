import { STORE_ROOM_MESSAGES, STORE_NEW_MESSAGE } from '../actionTypes';

const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ROOM_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case STORE_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export { messageReducer };
