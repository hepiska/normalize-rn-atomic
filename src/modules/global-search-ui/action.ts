export const actionType = {
  SET_SEARCH_KEY: 'global_search_ui/SET_SEARCH_KEY',
  SET_SKIP: 'global_search_ui/SET_SKIP',
  SET_LIMIT_KEY: 'global_search_ui/SET_LIMIT',
  RESET_SKIP: 'global_search_ui/RESET_SKIP',
  SET_ACTIVE_TAB: 'global_search_ui/SET_ACTIVE_TAB',
}

export const setSearchKey = (data: string) => ({
  type: actionType.SET_SEARCH_KEY,
  payload: data,
})

export const setSkip = (data: any) => ({
  type: actionType.SET_SKIP,
  payload: data,
})

export const setActiveTab = (data: number) => ({
  type: actionType.SET_ACTIVE_TAB,
  payload: data,
})

export const resetSkip = (tab: number) => ({
  type: actionType.RESET_SKIP,
  data: tab,
})
