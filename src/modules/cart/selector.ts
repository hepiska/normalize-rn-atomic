import { createSelector } from 'reselect'

const getCart = (state, props) => state.carts.data[props.cartId]

export const makeSelectorCarts = () =>
  createSelector([getCart], products => {
    return products
  })

const getTotalCarts = state => {
  const summary = state.carts.order.reduce(
    (acc, _data) => {
      const newacc = { ...acc }

      const cur_cart = state.carts.data[_data]
      newacc.total_transactions += cur_cart.variant.price * cur_cart.qty
      newacc.total_cart += cur_cart.qty
      return newacc
    },
    {
      total_cart: 0,
      total_transactions: 0,
    },
  )
  return summary
}

export const makeCartSummary = () =>
  createSelector([getTotalCarts], summary => {
    return summary
  })
