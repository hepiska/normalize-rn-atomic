import { createSelector } from 'reselect'

const getTransactionPayment = (state, transactionId) =>
  state.transactionsPayments.data[transactionId]

export const makeGetTransactionPayment = () =>
  createSelector([getTransactionPayment], transactionPayment => {
    return transactionPayment
  })
