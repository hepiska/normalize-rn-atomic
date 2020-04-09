export const globalActionType = {
  CHANGE_ERROR: 'global/CHANGE_VALUE',
  CHANGE_WARNING: 'global/WARNING',
}

export const setGlobalError = (data: any) => ({
  type: globalActionType.CHANGE_ERROR,
  payload: data,
})

export const setGlobalWarning = (data: any) => ({
  type: globalActionType.CHANGE_ERROR,
  payload: data,
})
