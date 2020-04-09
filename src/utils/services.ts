import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'
const BASE_URL = Config.BASE_URL

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
