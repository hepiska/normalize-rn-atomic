import { createSelector } from 'reselect'

const getTransaction = (state, transactionId) =>
  state.transaction.data[transactionId]

export const makeGetTransaction = () =>
  createSelector([getTransaction], transaction => {
    return transaction
  })

export const getTransactionCountSelector = state => ({
  count: state.transaction.count,
})
