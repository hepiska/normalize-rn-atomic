import { createSelector } from 'reselect'

const getCart = (state, props) => state.carts.data[props.cartId]

export const makeSelectorCarts = () =>
  createSelector([getCart], products => {
    return products
  })
