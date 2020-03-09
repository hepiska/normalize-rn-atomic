export const productFilterType = {
  CHANGE_VALUE: 'product-filter/CHANGE_VALUE',
}

export const changeValue = (data: any) => ({
  type: productFilterType.CHANGE_VALUE,
  payload: data,
})

export const openFilter = (data: any) => [
  changeValue({ key: 'isOpen', value: true }),
  changeValue({ key: 'section', value: data }),
]
