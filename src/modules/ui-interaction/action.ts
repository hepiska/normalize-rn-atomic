export const productFilterType = {
  CHANGE_VALUE: 'ui-interaction/CHANGE_VALUE',
}

export const changeValue = (data: any) => ({
  type: productFilterType.CHANGE_VALUE,
  payload: data,
})
