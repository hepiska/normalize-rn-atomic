export const productFilterType = {
  CHANGE_VALUE: 'product-filter/CHANGE_VALUE',
  CHANGE_PRICE: 'product-filter/CHANGE_PRICE',
}

export const changeValue = (data: any) => ({
  type: productFilterType.CHANGE_VALUE,
  payload: data,
})

export const changePrice = (data: { type: string; value: number }) => {
  console.log(data)
  return {
    type: productFilterType.CHANGE_PRICE,
    payload: data,
  }
}

export const openFilter = (data: any) => [
  changeValue({ key: 'isOpen', value: true }),
  changeValue({ key: 'section', value: data }),
]
