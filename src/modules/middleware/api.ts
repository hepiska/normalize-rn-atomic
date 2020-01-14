import * as actions from '../action-types';
import { normalize } from 'normalizr';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
const BASE_URL = 'https://api.shonet.dev'


const request = axios.create({ baseURL: BASE_URL })

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

const api = ({ dispatch, getState }) => next => action => {

  if (action.type !== actions.API) {
    return next(action);
  }

  const { requestParams = { url: '/', method: 'get', }, success, schema, label, startNetwork, endNetwork } = action.payload;

  if (startNetwork) {
    dispatch(startNetwork(label));
  }


  return request.request(requestParams)
    .then(data => {
      console.log("data", data)
    })

  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     if (schema) {
  //       data = normalize(data, schema);
  //       console.log('norm', data)
  //     }

  //     dispatch(success(data));

  //     dispatch(endNetwork(label));
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     dispatch(endNetwork(label))
  //   })
};

export default api;
