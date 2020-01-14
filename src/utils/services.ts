import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const BASE_URL = 'https://api.shonet.dev'


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
  }
);

