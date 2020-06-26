import { deepClone } from '@utils/helpers'
import { createSelector } from 'reselect'

const getCategoriesData = state => state.searchProduct.categoryData
const getCategoriesOrder = state => state.searchProduct.categoryOrder
const getProductData = (state, productId) =>
  state.searchProduct.productData[productId]

export const makeMapCategories = () => {
  return createSelector(
    [getCategoriesOrder, getCategoriesData],
    (order, data) => {
      return order.map(or => data[or])
    },
  )
}

export const makeSelectedSearchProduct = () => {
  return createSelector([getProductData], product => {
    return product
  })
}
