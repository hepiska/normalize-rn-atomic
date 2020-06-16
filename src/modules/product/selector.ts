import { createSelector } from 'reselect'

const getProduct = (state, props) => state.products.data[props.productId]

export const makeSelectedProducts = () =>
  createSelector([getProduct], products => {
    return products
  })
