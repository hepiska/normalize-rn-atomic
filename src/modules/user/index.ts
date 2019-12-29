import { AnyAction, Reducer } from "redux";


export interface UserState {
  _id?: string,
  name?: string,
}


const initialState: UserState = {
};

const userReducer: Reducer<UserState> = (state: UserState = initialState, action: AnyAction) => {
  const newState = { ...state }
  return newState
}

// function userReducer(state: userState = initialState, action: AnyAction): userState {
//   const newState = { ...state }
//   return newState
// }


export default userReducer