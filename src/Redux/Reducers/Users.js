import * as types from "../actionTypes";

const Users = (
  state = { isLoading: false, errMessage: null, users: null },
  action
) => {
  switch (action.type) {
    
    case types.USERS_LOADED:
      return { isLoading: false, errMessage: null, users: action.payload.users, pageCount: action.payload.nPages };
    
    case types.USER_REMOVE_S:
      return { 
        ...state,
        users: state.users.filter((user)=> user._id !== action.payload),
        isLoading: false, 
      }
    default:
      return state;
  }
};
export default Users;
