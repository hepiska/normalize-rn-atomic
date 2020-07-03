import { QueryParams } from '@utils/globalInterface'
import { API } from '../action-types'
import { getMe } from '@utils/helpers'
import * as schema from '@modules/normalize-schema'

export const transactionActionType = {
  FETCH: 'transaction/FETCH',
  SET_TRANSACTION_DATA: 'transaction/SET_TRANSACTION_DATA',
  SET_TRANSACTION_ORDER: 'transaction/SET_TRANSACTION_ORDER',
  FETCH_START: 'transaction/FETCH_START',
  SET_TRANSACTION_LOADING: 'transaction/SET_TRANSACTION_LOADING',
  CLEAR_TRANSACTION: 'transaction/CLEAR_TRANSACTION',
  SET_TRANSACTION_ORDER_PAGINATION:
    'transaction/SET_TRANSACTION_ORDER_PAGINATION',
  SET_COUNT_TRANSACTION: 'transaction/SET_COUNT_TRANSACTION',
  SET_ACTIVE_TRANSACTION: 'transaction/SET_ACTIVE_TRANSACTION',
  ERROR: 'transaction/ERROR',
  DEFAULT: 'transaction/DEFAULT',
}

export const fetTransactionPayment = (params: QueryParams) => ({
  type: transactionActionType.FETCH,
  payload: params,
})

const setTransactionCount = data => ({
  type: transactionActionType.SET_COUNT_TRANSACTION,
  payload: data,
})

export const setTransactionData = (data: any) => {
  if (data) {
    return {
      type: transactionActionType.SET_TRANSACTION_DATA,
      payload: data,
    }
  }
  return {
    type: transactionActionType.DEFAULT,
    payload: data,
  }
}

export const setTransactionOrder = (data: any) => ({
  type: transactionActionType.SET_TRANSACTION_ORDER,
  payload: data,
})

export const setActiveTransaction = data => ({
  type: transactionActionType.SET_ACTIVE_TRANSACTION,
  payload: data,
})

export const setTransactionOrderPagination = (data: any) => ({
  type: transactionActionType.SET_TRANSACTION_ORDER_PAGINATION,
  payload: data,
})

export const setTransactionLoading = (data: any) => ({
  type: transactionActionType.SET_TRANSACTION_LOADING,
  payload: data,
})

export const getAllTransaction = params => {
  return {
    type: API,
    payload: {
      url: `/users/` + getMe().id + `/transactions`,
      requestParams: { params },
      schema: [schema.transaction],
      startNetwork: () => setTransactionLoading(true),
      success: (data, { pagination }) => {
        if (params.offset === 0) {
          return [
            setTransactionData(data.entities.transaction),
            setTransactionOrder(data.result),
            setTransactionLoading(false),
          ]
        }
        if (data && data.result.length) {
          return [
            setTransactionData(data.entities.transaction),
            setTransactionOrderPagination({ order: data.result, pagination }),
            setTransactionLoading(false),
          ]
        }
        return setTransactionLoading(false)
      },
      error: err => {
        return [setTransactionLoading(false)]
      },
    },
  }
}

export const getAllTransactionCount = params => {
  return {
    type: API,
    payload: {
      url: `/users/` + getMe().id + `/transactions`,
      requestParams: { params: { ...params, limit: 100 } },
      success: data => {
        const count = {}

        if (!data) {
          return setTransactionCount({})
        }
        data.forEach(dat => {
          const status = dat.status.toLowerCase()
          if (count[status]) {
            count[status] = count[status] + 1
          } else {
            count[status] = 1
          }
        })
        return setTransactionCount({ ...count })
      },
    },
  }
}

export const getTransactionById = id => {
  return {
    type: API,
    payload: {
      url: `/transactions/${id}`,
      schema: schema.transaction,
      startNetwork: () => setTransactionLoading(true),
      success: data => {
        return [
          setTransactionData(data.entities.transaction),
          setActiveTransaction(data.result),
          setTransactionLoading(false),
        ]
      },
      error: err => {
        return [setTransactionLoading(false)]
      },
    },
  }
}

export const payTransaction = (trans_id, payment_method_id, token_id) => {
  const data: any = {
    payment_method_id,
  }
  if (token_id) {
    data.token_id = token_id
  }
  return {
    type: API,
    payload: {
      url: `/transactions/${trans_id}`,
      requestParams: {
        method: 'PUT',
        data,
      },
      startNetwork: () => setTransactionLoading(true),
      success: data => {
        const updatedData = {}
        updatedData[trans_id] = { id: trans_id, ...data }

        return [
          setTransactionData(updatedData),
          // setTransactionOrder(data.result),
          setTransactionLoading(false),
          // getTransactionById(trans_id),
        ]
      },
      error: err => {
        return [setTransactionLoading(false)]
      },
    },
  }
}
