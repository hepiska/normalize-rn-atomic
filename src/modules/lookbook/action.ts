import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'

export const lookbookActionType = {
  FETCH: 'LOOKBOOK/FETCH',
  FETCH_FINISH: 'LOOKBOOK/FETCH_FINISH',
  FETCH_START: 'LOOKBOOK/FETCH_START',
  ERROR: 'LOOKBOOK/ERROR',
}


export const fetchLookbook = (params: QueryParams) => ({ type: lookbookActionType.FETCH, payload: params })
export const lookBookApi = (params) => ({
  type: API,
  payload: {
    url: '/lookbooks',
    requestParams: { params }
  }
})


export const fetchLookbookStart = () => ({ type: lookbookActionType.FETCH_FINISH })
export const fetchLookbookFinish = (data: any) => ({ type: lookbookActionType.FETCH_FINISH, payload: data })
export const fetchLookbookError = (data: any) => ({ type: lookbookActionType.ERROR, payload: data })

