const currencyNum = (inp) => {
  const a = inp.split("").reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('')
  return a
}

export const formatRupiah = (value) => {
  if (!value) {
    return 'Rp 0'
  }
  return `Rp ${currencyNum(String(value))}`
}

export const formatCur = (value) => {
  if (!value) {
    return '0'
  }
  return `${currencyNum(String(value))}`
}
