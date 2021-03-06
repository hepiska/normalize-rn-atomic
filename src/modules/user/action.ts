import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getMe } from '@src/utils/helpers'
import { navigate } from '@src/root-navigation'
import { Alert } from 'react-native'

export const userActionType = {
  FETCH: 'post/FETCH',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SET_USER_ORDER: 'user/SET_USER_ORDER',
  SET_SPECIFIC_USER_ORDER: 'user/SET_SPECIFIC_USER_ORDER',
  SET_USER_ORDER_PAGINATION: 'user/SET_USER_ORDER_PAGINATION',
  SET_SPECIFIC_USER_ORDER_PAGINATION: 'user/SET_SPECIFIC_USER_ORDER_PAGINATION',
  SET_USER_NOTIFICATION: 'user/SET_USER_NOTIFICATION',
  ADD_USER_ORDER: 'user/ADD_USER_ORDER',
  CLEAR_USER_ORDER: 'user/CLEAR_USER_ORDER',
  REMOVE_USER_ORDER: 'user/REMOVE_USER_ORDER',
  CHANGE_FOLLOW_DATA: 'user/CHANGE_FOLLOW_DATA',
  FETCH_START: 'user/FETCH_START',
  SET_USER_LOADING: 'user/SET_USER_LOADING',
  SET_USER_LOADINGS: 'user/SET_USER_LOADINGS',
  SET_TRENDING_INSIDER_ORDER: 'user/SET_TRENDING_INSIDER_ORDER',
  SET_INSIDER_DATA: 'user/SET_INSIDER_DATA',
  ERROR: 'user/ERROR',
  DEFAULT: 'user/DEFAULT',
  SET_RECOMMENDED_USER_ORDER: 'user/SET_RECOMMENDED_USER_ORDER',
}

export const setUserData = (data: any) => {
  if (data) {
    return {
      type: userActionType.SET_USER_DATA,
      payload: data,
    }
  }
  return {
    type: userActionType.DEFAULT,
    payload: data,
  }
}

const setUserLoadings = (data: { name: string; value: boolean }) => {
  return {
    type: userActionType.SET_USER_LOADINGS,
    payload: data,
  }
}

export const setUserOrder = (data: any) => ({
  type: userActionType.SET_USER_ORDER,
  payload: data,
})

export const setSpecificUserOrder = (data: any) => ({
  type: userActionType.SET_SPECIFIC_USER_ORDER,
  payload: data,
})

export const clearUserOrder = () => ({
  type: userActionType.CLEAR_USER_ORDER,
})

export const setUserOrderPagination = (data: any) => ({
  type: userActionType.SET_USER_ORDER_PAGINATION,
  payload: data,
})

export const setSpecificUserOrderPagination = (data: any) => ({
  type: userActionType.SET_SPECIFIC_USER_ORDER_PAGINATION,
  payload: data,
})

export const setuserTrendingOrder = data => ({
  type: userActionType.SET_TRENDING_INSIDER_ORDER,
  payload: data,
})
export const setUserNotification = (data: any) => ({
  type: userActionType.SET_USER_NOTIFICATION,
  payload: data,
})

// notes: mungkin bisa di hapus, gatau pakai ga
export const addUserOrder = (data: any) => ({
  type: userActionType.ADD_USER_ORDER,
  payload: data,
})

// notes: mungkin bisa di hapus, gatau pakai ga
export const removeUserOrder = (data: any) => ({
  type: userActionType.REMOVE_USER_ORDER,
  payload: data,
})

export const setUserLoading = (data: Boolean) => ({
  type: userActionType.SET_USER_LOADING,
  payload: data,
})

export const setRecommendedUserOrder = (data: any) => ({
  type: userActionType.SET_RECOMMENDED_USER_ORDER,
  payload: data,
})

export const getUser = (data, id_type) => {
  return {
    type: API,
    payload: {
      url: `/users/${data}`,
      schema: schema.user,
      requestParams: {
        params: {
          id_type,
        },
      },
      startNetwork: () => {
        return setUserLoading(true)
      },
      endNetwork: () => {
        return setUserLoading(false)
      },
      success: data => {
        return [
          setUserData(data.entities.user),
          // setUserOrder(data.result),
          setUserLoading(false),
        ]
      },
      error: err => {
        return setUserLoading(false)
      },
    },
  }
}

export const editUserProfile = (data: any) => ({
  type: API,
  payload: {
    url: `/users/` + getMe().id,
    requestParams: {
      method: 'PUT',
      data,
    },
    startNetwork: () => setUserLoading(true),
    success: data => {
      return [
        setUserData(data),
        getUser(getMe().id, 'id'),
        setUserLoading(false),
      ]
    },
    error: err => {
      return [setUserLoading(false)]
    },
  },
})

export const getFollowerFollowing = (params: any, type: string, userid) => {
  const id = userid || getMe().id
  return {
    type: API,
    payload: {
      url: `/users/` + id + `/${type}`,
      schema: [schema.user],
      requestParams: {
        params,
      },
      startNetwork: () => setUserLoading(true),
      success: (data, { pagination }) => {
        if (params.offset === 0) {
          if (userid) {
            //specific user
            return [
              setUserData(data.entities.user),
              setSpecificUserOrder({ userid, order: data.result }),
              setUserLoading(false),
            ]
          } else {
            // auth user
            return [
              setUserData(data.entities.user),
              setUserOrder(data.result),
              setUserLoading(false),
            ]
          }
        }

        if (data && data.result.length) {
          if (userid) {
            return [
              setUserData(data.entities.user),
              setSpecificUserOrderPagination({
                userid,
                order: data.result,
                pagination,
              }),
              setUserLoading(false),
            ]
          } else {
            return [
              setUserData(data.entities.user),
              setUserOrderPagination({ order: data.result, pagination }),
              setUserLoading(false),
            ]
          }
        }
      },
      error: err => {
        return [setUserLoading(false)]
      },
    },
  }
}

export const unfollowUser = (id: any) => ({
  type: API,
  payload: {
    url: '/users/' + id + '/follow',
    requestParams: {
      method: 'DELETE',
    },
    startNetwork: () => setUserLoading(true),
    success: () => [
      getUser(getMe().id, 'id'),
      changeFollowData({ is_followed: false, user_id: id }),
      setUserLoading(false),
    ],
    error: error => [setUserLoading(false)],
  },
})

export const getTrendingInsider = params => {
  const composeParams = { ...params, group: 'insider' }
  return {
    type: API,
    payload: {
      url: '/users/trending',
      requestParams: { params: composeParams },
      schema: [schema.user],
      startNetwork: () => {
        return setUserLoadings({ name: 'trendingInsider', value: true })
      },
      endNetwork: () => {
        return setUserLoadings({ name: 'trendingInsider', value: false })
      },
      success: data => {
        return [
          setUserData(data.entities.user),
          setuserTrendingOrder(data.result),
        ]
      },
    },
  }
}

export const followUser = (id: any) => ({
  type: API,
  payload: {
    url: '/users/' + id + '/follow',
    requestParams: {
      method: 'POST',
    },
    startNetwork: () => setUserLoading(true),
    success: () => {
      return [
        getUser(getMe().id, 'id'),
        changeFollowData({ is_followed: true, user_id: id }),
        setUserLoading(false),
      ]
    },
    error: error => {
      return [setUserLoading(false)]
    },
  },
})

export const changeFollowData = data => ({
  type: userActionType.CHANGE_FOLLOW_DATA,
  payload: data,
})

export const changePassword = (data: any) => ({
  type: API,
  payload: {
    url: '/account/password',
    requestParams: {
      method: 'PUT',
      data,
    },
    startNetwork: () => setUserLoading(true),
    success: () => {
      navigate('Screens', {
        screen: 'PasswordSecurity',
      })
      return [setUserLoading(false)]
    },
    error: data => {
      Alert.alert(data.response.data.meta.message)
      return [setUserLoading(false)]
    },
  },
})

export const getNotificationPreferences = () => {
  return {
    type: API,
    payload: {
      url: '/account/settings',
      startNetwork: () => setUserLoading(true),
      success: data => {
        return [setUserNotification(data), setUserLoading(false)]
      },
      error: error => {
        return [setUserLoading(false)]
      },
    },
  }
}

export const setNotificationSetting = (data: any) => {
  return {
    type: API,
    payload: {
      url: '/account/settings',
      requestParams: {
        method: 'PUT',
        data,
      },
      startNetwork: () => setUserLoading(true),
      success: data => {
        return [setUserNotification(data), setUserLoading(false)]
      },
      error: data => {
        return [setUserLoading(false)]
      },
    },
  }
}

export const setInsiderData = (data: any) => ({
  type: userActionType.SET_INSIDER_DATA,
  payload: data,
})

export const getInsiderStatus = () => {
  return {
    type: API,
    payload: {
      url: '/account/insiders/status',
      startNetwork: () => setUserLoading(true),
      success: data => {
        return [setInsiderData(data[0]), setUserLoading(false)]
      },
      error: error => {
        return [setUserLoading(false)]
      },
    },
  }
}

export const fetchRecommendedUser = () => {
  const id = getMe().id
  return {
    type: API,
    payload: {
      url: `/users/${id}/followings/recommendations`,
      schema: [schema.user],
      // requestParams: {
      //   params: {
      //     id_type,
      //   },
      // },
      startNetwork: () => {
        return setUserLoading(true)
      },
      endNetwork: () => {
        return setUserLoading(false)
      },
      success: data => {
        return [
          setUserData(data.entities.user),
          setRecommendedUserOrder(data.result),
          setUserLoading(false),
        ]
      },
      error: err => {
        return setUserLoading(false)
      },
    },
  }
}
