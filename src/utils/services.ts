import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'
const BASE_URL = Config.BASE_URL
const GOOGLE_PLACE_URI = 'https://maps.googleapis.com/maps/api/place'
const GOOGLE_MAPS = 'https://maps.googleapis.com/maps/api'

export const request = axios.create({ baseURL: BASE_URL })

request.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export const reqGetDanaAcount = request({ url: '/account/dana' }).then(res => {
  return res.data.data
})

export const reqPostConnectDana = (data: any) =>
  request({
    url: '/account/dana',
    method: 'POST',
    data,
  }).then(res => {
    return res.data.data
  })

export const reqPostWithdraw = (amount: number) =>
  request({
    url: '/account/earnings/withdrawals',
    method: 'POST',
    data: { amount },
  }).then(res => {
    return res.data.data
  })

export const googePlaceReq = axios.create({ baseURL: GOOGLE_PLACE_URI })
export const googeMapsReq = axios.create({ baseURL: GOOGLE_MAPS })
export const shonetLocation = axios.create({ baseURL: BASE_URL + '/locations' })

export const midtransService = axios.create({ baseURL: Config.MIDTRANS_URI })
