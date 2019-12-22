interface userState {
  _id?: string,
  name?: string,
}

interface actionType {
  type: string,
  payload: any
}
const initialState: userState = {
};

function userReducer(state: userState = initialState, action: actionType): userState {
  const newState = { ...state }
  return newState
}


export default userReducer