import * as types from "../actionTypes";

const Users = (
  state = { isLoading: false, errMessage: null, users: null },
  action
) => {
  switch (action.type) {
    // case types.LOAD_USERS:
    //   return { isLoading: true,errMessage: null, users: null };
    case types.USERS_LOADED:
      return { isLoading: false, errMessage: null, users: action.payload.users, pageCount: action.payload.nPages };
    // case types.USERS_LOADED_FAILED:
    //   return { isLoading: false, errMessage: action.payload, users: null };
    default:
      return state;
  }
};
export default Users;
