import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { getAllCart } from '../cart/action'

export const transactionPaymentActionType = {
  FETCH: 'transaction_payment/FETCH',
  SET_TRANSACTION_PAYMENT_DATA:
    'transaction_payment/SET_TRANSACTION_PAYMENT_DATA',
  SET_TRANSACTION_PAYMENT_ORDER:
    'transaction_payment/SET_TRANSACTION_PAYMENT_ORDER',
  FETCH_START: 'transaction_payment/FETCH_START',
  SET_TRANSACTION_PAYMENT_LOADING:
    'transaction_payment/SET_TRANSACTION_PAYMENT_LOADING',
  CLEAR_PAYMENT: 'transaction_payment/CLEAR_PAYMENT',
  ERROR: 'transaction_payment/ERROR',
  DEFAULT: 'transaction_payment/DEFAULT',
}

export const fetTransactionPayment = (params: QueryParams) => ({
  type: transactionPaymentActionType.FETCH,
  payload: params,
})

export const setTransactionPaymentData = (data: any) => {
  if (data) {
    return {
      type: transactionPaymentActionType.SET_TRANSACTION_PAYMENT_DATA,
      payload: data,
    }
  }
  return {
    type: transactionPaymentActionType.DEFAULT,
    payload: data,
  }
}

export const setTransactionPaymentOrder = (data: any) => ({
  type: transactionPaymentActionType.SET_TRANSACTION_PAYMENT_ORDER,
  payload: data,
})

export const setTransactionPaymentLoading = (data: any) => ({
  type: transactionPaymentActionType.SET_TRANSACTION_PAYMENT_LOADING,
  payload: data,
})

export const getTransactionPaymentById = id => ({
  type: API,
  payload: {
    url: `transactions/${id}/payments`,
    schema: [schema.transactionPayment],
    startNetwork: () => setTransactionPaymentLoading(true),
    success: data => {
      return [
        setTransactionPaymentData(data.entities.transactions_payments),
        setTransactionPaymentOrder(data.result),
        getAllCart(),
        setTransactionPaymentLoading(false),
      ]
    },
  },
})
