import { GET_ALL_USERS, GET_USER_SESSION } from "../action";

const initialState = {
  allUsers: [],
  userSession: {},
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
    default:
      return state;
  }
};

export default rootReducer;
