export const actionType = {
  CHANGE_VALUE: 'ui-interaction/CHANGE_VALUE',
  OPEN_BANER: 'ui-interaction/OPEN_BANER',
  CHANGE_ACTIVE_BANER: 'ui-interaction/CHANGE_ACTIVE_BANER',
  CHANGE_BANER_CONTENT: 'ui-interaction/CHANGE_BANER_CONTENT',
}

export const changeValue = (data: any) => ({
  type: actionType.CHANGE_VALUE,
  payload: data,
})
