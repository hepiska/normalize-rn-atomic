export const actionType = {
  CHANGE_VALUE: 'ui-interaction/CHANGE_VALUE',
  OPEN_BANER: 'ui-interaction/OPEN_BANER',
  CHANGE_ACTIVE_BANER: 'ui-interaction/CHANGE_ACTIVE_BANER',
  CHANGE_RIGHT_SIDEBAR_SECTION: 'ui-interaction/CHANGE_RIGHT_SIDEBAR_SECTION',
  CHANGE_RIGHT_SIDEBAR: 'ui-interaction/OPEN_RIGHT_SIDEBAR',
  CHANGE_BANER_CONTENT: 'ui-interaction/CHANGE_BANER_CONTENT',
}

export const changeValue = (data: any) => ({
  type: actionType.CHANGE_VALUE,
  payload: data,
})

export const changesRightSideBar = data => {
  return { type: actionType.CHANGE_RIGHT_SIDEBAR, payload: data }
}

export const changeRightSideBarSection = data => {
  return { type: actionType.CHANGE_RIGHT_SIDEBAR_SECTION, payload: data }
}
