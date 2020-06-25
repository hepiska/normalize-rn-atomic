import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getMe } from '@src/utils/helpers'

export const notificationActionType = {
  FETCH: 'notification/FETCH',
  SET_NOTIFICATION_DATA: 'notification/SET_NOTIFICATION_DATA',
  SET_NOTIFICATION_ORDER: 'notification/SET_NOTIFICATION_ORDER',
  SET_NOTIFICATION_LOADING: 'notification/SET_NOTIFICATION_LOADING',
  CLEAR_NOTIFICATION: 'notification/CLEAR_NOTIFICATION',
  ERROR: 'notification/ERROR',
  DEFAULT: 'notification/DEFAULT',
}

export const setNotificationData = (data: any) => {
  if (data) {
    return {
      type: notificationActionType.SET_NOTIFICATION_DATA,
      payload: data,
    }
  }
  return {
    type: notificationActionType.DEFAULT,
    payload: data,
  }
}

export const setNotificationOrder = (data: any) => ({
  type: notificationActionType.SET_NOTIFICATION_ORDER,
  payload: data,
})

export const setNotificationLoading = (data: any) => ({
  type: notificationActionType.SET_NOTIFICATION_LOADING,
  payload: data,
})

export const getNotification = (params: any) => {
  return {
    type: API,
    payload: {
      url: '/notifications',
      schema: [schema.notification],
      requestParams: {
        params: {
          ...params,
        },
      },
      startNetwork: () => {
        return setNotificationLoading({ key: params.type, loading: true })
      },
      endNetwork: () => {
        return setNotificationLoading({ key: params.type, loading: false })
      },
      success: (data, { pagination }) => {
        return [
          setNotificationData({
            key: params.type,
            notification: data.entities.notification,
          }),
          setNotificationOrder({
            key: params.type,
            order: data.result,
            pagination,
          }),
          setNotificationLoading({ key: params.type, loading: false }),
        ]
      },
      error: err => {
        return setNotificationLoading({ key: params.type, loading: false })
      },
    },
  }
}
export const clearNotification = () => ({
  type: notificationActionType.CLEAR_NOTIFICATION,
})
