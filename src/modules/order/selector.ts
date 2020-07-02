import { createSelector } from 'reselect'

const getOrders = (state, orderId) => state.orders.data[orderId]

export const makeSelectedOrder = () =>
  createSelector([getOrders], order => {
    return order
  })

export const selectOrderCount = state => ({ count: state.orders.count })
