import { createSelector } from 'reselect'

const getProduct = (state, productId) => state.products.data[productId]
const getSpecificQueryProduct = state => state.products.specificQueryProduct

export const makeSelectedProducts = () =>
  createSelector([getProduct], products => {
    return products
  })

export const makeGetSpecificQueryProduct = query =>
  createSelector([getSpecificQueryProduct], productQuery => {
    return productQuery[query]
  })
