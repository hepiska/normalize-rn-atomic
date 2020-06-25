import Config from 'react-native-config'
import { ToastAndroid, Alert, Platform, Linking } from 'react-native'
import { uriSchreenMap, colors } from './constants'
import { PERMISSIONS, check, request } from 'react-native-permissions'
import { store } from '@src/init-store'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'

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

export const capitalEachWord = str =>
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
    queryString += `&width=${Math.round(size.width)}`
  }
  if (size.height) {
    queryString += `&height=${Math.round(size.height)}`
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

export const queryStringToObj = qs => {
  qs = qs.replace('?', '')

  const result = qs.split('&').reduce((obj, keyvalue) => {
    const [key, value] = keyvalue.split('=')
    obj[key] = value
    return obj
  }, {})
  return result
}

export const getMe = () => {
  if (store) return store.getState().auth.data.user || {}
  return {}
}

export const countdown = (date, callback, onEndCallback?) => {
  return setInterval(() => {
    const now = new Date()
    const distance = date.getTime() - now.getTime()

    if (distance <= 1 && onEndCallback) {
      onEndCallback()
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    if (distance >= 1) {
      callback({ days, hours, minutes, seconds })
    }
  }, 1000)
}

export const sendEmail = (id?, sub?) => () => {
  const email = 'cs@theshonet.com'
  const subject = sub || `Return / Exchange Order ID: ${id}`
  Linking.openURL(`mailto:${email}?subject=${subject}`)
}

export const getDetailContent = (type: string, content: any) => {
  if (
    type === 'description' ||
    type === 'care-label' ||
    type === 'size-and-fit'
  ) {
    var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i)
    var isContentHTML = isHTML(content)

    if (isContentHTML) {
      return content
    }
    /* ini yang csv (comma separated value) */
    let result = content || []
    if (result && result.length) {
      result = result.split(';')
      result = result.map(item => `<li>${item.trim()}</li>`)
    }

    return `<ul>${result.join('')}</ul>`
  } else {
    return `<p>${content}</p>`
  }
}

export const calculateYear = year => {
  const now = dayjs()
  const min_dob = now.subtract(year, 'year')
  return min_dob.toISOString()
}

export const calculateDay = day => {
  const now = dayjs()
  const _day = dayjs(day)

  let convertion = ''
  let res = 0
  let year = now.diff(_day, 'year')
  let month = now.diff(_day, 'month')
  let days = now.diff(_day, 'day')
  let hour = now.diff(_day, 'hour')
  let minute = now.diff(_day, 'minute')
  let second = now.diff(_day, 'second')

  if (year < 1) {
    if (month < 1) {
      if (days < 1) {
        if (hour < 1) {
          if (minute < 0) {
            res = second
            convertion = 'seconds'
          } else {
            res = minute
            convertion = 'minutes'
          }
        } else {
          res = hour
          convertion = 'hours'
        }
      } else {
        res = days
        convertion = 'days'
      }
    } else {
      res = month
      convertion = 'months'
    }
  } else {
    res = year
    convertion = 'years'
  }

  return 'about ' + res + ' ' + convertion + ' ago'
}

export const calculateTimeDifference = date => {
  const now = dayjs()
  const _day = dayjs(date)

  let year = now.diff(_day, 'year')
  let month = now.diff(_day, 'month')
  let week = now.diff(_day, 'week')
  let days = now.diff(_day, 'day')
  let hours = now.diff(_day, 'hour')

  return { year, month, week, days, hours, now }
}

export const removeHeaderWebviewScript = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
  var mainWrapper = document.getElementsByClassName("main-wrapper");
  if(mainWrapper[0]){
    mainWrapper[0].style.paddingTop = "15px";
  }
  var footer = document.getElementsByClassName("footer-nav"); 
  if( footer[0]){
    footer[0].remove();

  }
})()
true;
`

export const removeHeaderWebviewCreateJurnalScript = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
 
  header[0].style.paddingTop="16px"
  if(mainWrapper[0]){
    mainWrapper[0].style.paddingTop = "8px";
  }
  var footer = document.getElementsByClassName("footer-nav"); 
  if( footer[0]){
    footer[0].remove();

  }
})()
true;
`

export const urlScreenMap = url => {
  const clearUrl = url.replace(Config.SHONET_URI, '')
  const arrUrl = clearUrl.split('/').filter(a => Boolean(a))
  return arrUrl
}

export const injectTokenScript = (id_token, user) => {
  const token: { exp: number } = jwtDecode(id_token)
  const expiresAt = JSON.stringify(token.exp * 1000)
  user = JSON.stringify(user)

  if (!id_token) {
    return '(function(){})()'
  }
  return `
    (function(){
      
      window.document.cookie="tokenId=${id_token}"
      window.localStorage.setItem("tokenId", "${id_token}")
      window.localStorage.setItem("user", JSON.stringify(${user}))
      window.localStorage.setItem("expiresAt","${expiresAt}")

    })();
    true;
  `
}

export const clearLocalStorageScript = () => {
  return `
  (function(){
    document.cookie=null
    localStorage.clear()

  })();
  true;
`
}
