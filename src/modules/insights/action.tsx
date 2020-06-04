import { QueryParams } from '@utils/globalInterface'
import { setUserData } from '../user/action'
import { setTopPostData } from '../post-top/action'
import { API } from '../action-types'
import { getMe, deepClone } from '@src/utils/helpers'
import { schema, normalize } from 'normalizr'
import { getPostById } from '../post/action'

export const insightActionType = {
  SET_INSIGHT_DATA: 'insight/SET_INSIGHT_DATA',
  SET_INSIGHT_LOADING: 'insight/SET_INSIGHT_LOADING',
  ERROR: 'insight/ERROR',
  DEFAULT: 'insight/DEFAULT',
}

export const setInsightLoading = (data: any) => ({
  type: insightActionType.SET_INSIGHT_LOADING,
  payload: data,
})

export const setInsightData = (data: any) => ({
  type: insightActionType.SET_INSIGHT_DATA,
  payload: data,
})

export const getInsightSummary = params => ({
  type: API,
  payload: {
    url: `/users/` + getMe().id + '/insights/summary',
    requestParams: { params },
    startNetwork: () => setInsightLoading(true),
    success: data => {
      const newTopPost = new schema.Entity('top_posts')
      const normalizedPost = normalize(data.statistics.top_posts, [newTopPost])

      const postById = normalizedPost.result?.map(val => getPostById(val))

      let newInsight = deepClone(data)
      newInsight.statistics.top_posts = normalizedPost.result
      return [setInsightData(newInsight), postById, setInsightLoading(false)]
    },
    error: () => {
      return [setInsightLoading(false)]
    },
  },
})
