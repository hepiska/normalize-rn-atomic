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

export const checkHex = hex => /^#[0-9A-F]{6}$/i.test(hex)
