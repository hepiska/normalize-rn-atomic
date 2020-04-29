import Config from 'react-native-config'
import { ToastAndroid, Alert, Platform, Linking } from 'react-native'
import { uriSchreenMap } from './constants'
import { PERMISSIONS, check, request } from 'react-native-permissions'
import { store } from '@src/init-store'

const currencyNum = inp => {
  const a = inp
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('')
  return a
}

export const formatRupiah = value => {
  if (!value) {
    return 'Rp 0'
  }
  return `Rp ${currencyNum(String(value))}`
}

export const formatCur = value => {
  if (!value) {
    return '0'
  }
  return `${currencyNum(String(value))}`
}

export const moveToFront = (a: any, fn: Function) => {
  let non_matches = []
  var matches = a.filter(function(e: any, i: any, a: any) {
    let match = fn(e, i, a)
    if (!match) non_matches.push(e)
    return match
  })
  return matches.concat(non_matches)
}

export const capilEachWord = str =>
  str
    .split(' ')
    .map(word => {
      let firstChar = word[0].toUpperCase()

      return firstChar + word.substring(1, word.length)
    })
    .join(' ')

export const checkHex = hex => /^#[0-9A-F]{6}$/i.test(hex)

export const setImage = (uri, size, params?) => {
  const defaultParams = '&fit=clamp'
  let queryString = `?`
  if (size.width) {
    queryString += `&width=${size.width}`
  }
  if (size.height) {
    queryString += `&height=${size.height}`
  }
  if (params) {
    queryString += `${params}`
  } else {
    queryString += defaultParams
  }

  const res =
    uri
      .replace(Config.SHONET_AWS_IMAGE_BASE, Config.SHONET_IMGIX_IMAGE_BASE)
      .replace(/(\?.*)/, '') + queryString
  return res
}

export const parseUriToScreen = (navigation: any, uri: string) => {
  const [screen, param] = uri.split('/')
  const params = {}
  params[uriSchreenMap[screen].paramId] = param

  return navigation.navigate(uriSchreenMap[screen].path, params)
}

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const removeLineBreak = text => text.replace(/(\r\n|\n|\r)/gm, ' ')

export const splitCamelCaseToString = s => {
  return s
    .split(/(?=[A-Z])/)
    .map(function(p) {
      return p.charAt(0).toUpperCase() + p.slice(1)
    })
    .join(' ')
}

export const showAlert = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  } else {
    Alert.alert(message)
  }
}

export const checkLocationPermit = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      let isGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      if (isGranted !== 'granted') {
        isGranted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      }
      return isGranted === 'granted'
    }
    if (Platform.OS === 'android') {
      let isGranted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      if (isGranted !== 'granted') {
        isGranted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      }
      return isGranted === 'granted'
    }
    return false
  } catch (error) {
    throw error
  }
}

export const getMe = () => {
  if (store) return store.getState().auth.data.user || {}
  return {}
}

export const countdown = (date, callback) => {
  return setInterval(() => {
    const now = new Date()
    const distance = date.getTime() - now.getTime()
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    callback({ days, hours, minutes, seconds })
  }, 1000)
}

export const sendEmail = id => () => {
  const email = 'cs@theshonet.com'
  const subject = `Return / Exchange Order ID: ${id}`
  Linking.openURL(`mailto:${email}?subject=${subject}`)
}
