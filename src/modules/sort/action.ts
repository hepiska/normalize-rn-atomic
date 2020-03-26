export const sortActionType = {
  SET_SELECTED: 'sort/SET_SELECTED',
}

export const setSelectedSort = (data: any) => ({
  type: sortActionType.SET_SELECTED,
  payload: data,
})
