import Config from 'react-native-config'

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

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const splitCamelCaseToString = s => {
  return s
    .split(/(?=[A-Z])/)
    .map(function(p) {
      return p.charAt(0).toUpperCase() + p.slice(1)
    })
    .join(' ')
}
