import { createSelector } from 'reselect'

const getProduct = (state, productId) => state.products.data[productId]

export const makeSelectedProducts = () =>
  createSelector([getProduct], products => {
    return products
  })
