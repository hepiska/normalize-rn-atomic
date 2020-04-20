export const actionType = {
  SET_NEW_ADDRESS: 'newAddress/SET_NEW_ADDRESS',
  SET_RECEPIENT_INFO: 'newAddress/SET_RECEPIENT_INFO',
}

export const setnewaddress = data => ({
  type: actionType.SET_NEW_ADDRESS,
  payload: data,
})

// export const setGoogleAddress = data => ({
//   type: actionType.SET_RECEPIENT_INFO,
//   payload: data,
// })
