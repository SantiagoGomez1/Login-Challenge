import {
  GET_ALL_USERS,
  GET_USER_SESSION,
  GET_USER,
  GET_ALL_PUBLICATIONS,
} from "../action";

const initialState = {
  allUsers: [],
  allPublications: [],
  userSession: {},
  userDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_USER_SESSION:
      return {
        ...state,
        userSession: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_ALL_PUBLICATIONS:
      return {
        ...state,
        allPublications: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
