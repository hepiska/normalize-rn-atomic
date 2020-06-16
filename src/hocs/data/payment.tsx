import { connect } from 'react-redux'
import { makeGetTransaction } from '@modules/transaction/selector'

const transactionListMap = (state, ownProps) => {
  const getTransaction = makeGetTransaction()
  const transaction = getTransaction(state, ownProps.transactionId)

  return {
    transaction,
  }
}

export function transactionListData(WrappedComponent) {
  return connect(transactionListMap, null)(WrappedComponent)
}
