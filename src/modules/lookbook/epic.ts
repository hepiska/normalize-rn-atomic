import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, mapTo, delay, map } from 'rxjs/operators';
import { from } from 'rxjs'
import { lookbookActionType, fetchLookbookFinish, } from './action'
import { request } from '@utils/services'
import { normalize } from 'normalizr';
import * as schema from '@modules/normalize-schema'

const fetcLookbookEpic = action$ => action$.pipe(
  ofType(lookbookActionType.FETCH),
  delay(1000),
  mapTo({ type: lookbookActionType.FETCH_START }),
  mergeMap(action => {
    return from(request.request({
      url: '/lookbooks',
      params: { action }
    })).pipe(map(res => {
      const normalizeData = normalize(res.data.data, [schema.lookbooks])
      return fetchLookbookFinish({
        data: normalizeData.entities.lookbooks,
        order: normalizeData.result,
        pagination: res.data.pagination
      })
    }))
  })
)


export default combineEpics(
  fetcLookbookEpic
)