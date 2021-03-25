import {
  STORE_ROOM_MESSAGES,
  STORE_NEW_MESSAGE,
  SET_CURRENT_ROOM,
  REMOVE_CURRENT_ROOM,
} from '../actionTypes';

const initialState = {
  messages: [],
  currentRecipient: {
    _id: null,
    username: null,
  },
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ROOM_MESSAGES:
      return {
        ...state,
        messages: action.messages?.reverse(),
      };
    case STORE_NEW_MESSAGE: {
      const currentRecipient = state.currentRecipient.username;
      const senderUsername = action.message.sender.username;
      const currentUsername = action.currentUsername;
      if ((currentRecipient === senderUsername) || (senderUsername === currentUsername)) {
        return {
          ...state,
          messages: [action.message, ...state.messages],
        };
      }
      return state;
    }
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRecipient: action.currentRecipient,
      };
    case REMOVE_CURRENT_ROOM:
      return {
        ...state,
        currentRecipient: {
          _id: null,
          username: null,
        },
      };
    default:
      return state;
  }
};

export { messageReducer };
