import {
  REQ_SEARCH_FRIENDS,
  REQ_SEARCH_FRIENDS_SUCCESS,
  REQ_SEARCH_FRIENDS_FAILED,
  EMPTY_SEARCH_FRIEND
} from '../actionTypes';

const initialState = {
  friendSearch: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_SEARCH_FRIENDS:
      return {
        ...state,
        isRequestSearchFriends: true,
        errRequestSearchFriends: null,
      };
    case REQ_SEARCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isRequestSearchFriends: false,
        friendSearch: action.data,
      };
    case REQ_SEARCH_FRIENDS_FAILED:
      return {
        ...state,
        isRequestSearchFriends: false,
        friendSearch: [],
        errRequestSearchFriends: action.errResponse,
      };
    case EMPTY_SEARCH_FRIEND:
      return {
        ...state,
        friendSearch: [],
      };
    default:
      return state;
  }
};

export { searchReducer };
