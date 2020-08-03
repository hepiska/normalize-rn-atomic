import CONFIG from 'react-native-config'
import { Platform } from 'react-native'
import { getQueryParamObj } from './helpers'

export const firebaseCredential =
  CONFIG.FIREBASE_ENV === 'dev'
    ? {
        appId:
          Platform.OS === 'android'
            ? '1:581479277593:android:270fcb874b639cbc8bf688'
            : '1:581479277593:ios:f8f2cadef1aafda28bf688',
        apiKey: CONFIG.FIREBASE_API_KEY,
        databaseURL: 'https://the-shonet-dev.firebaseio.com',
        messagingSenderId: '581479277593',
        storageBucket: 'the-shonet-dev.appspot.com',
        projectId: 'the-shonet-dev',
      }
    : {
        appId:
          Platform.OS === 'android'
            ? '1:1005565794086:android:7ae58655f89fc09aba53e7'
            : '1:1005565794086:ios:7ae58655f89fc09aba53e7',
        apiKey: CONFIG.FIREBASE_API_KEY,
        databaseURL: 'https://the-shonet-app.firebaseio.com',
        messagingSenderId: '1005565794086',
        storageBucket: 'the-shonet-app.appspot.com',
        projectId: 'the-shonet-app',
      }

export const uriToScreen = uri => {
  const cleanuri = uri.replace(CONFIG.SHONET_URI + '/', '')
  const uriScreenMapFunc = {
    register: (uri, params) => {
      return {
        root: 'Screens',
        obj: { screen: 'LoginRegister', params: params },
      }
    },
    collections: (uri, params) => {
      const slug = uri.split('/')[1]
      return {
        root: 'Screens',
        obj: {
          screen: 'CollectionProductList',
          params: { ...params, collectionsSlug: slug },
        },
      }
    },
  }

  const [path, paramsStr] = cleanuri.split('?')
  const params = getQueryParamObj(paramsStr)
  return (
    uriScreenMapFunc[path](params) ||
    uriScreenMapFunc[path.split('/')[0]](params)
  )
}
