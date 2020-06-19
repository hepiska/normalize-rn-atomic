import { connect } from 'react-redux'
import { makeGetTransaction } from '@modules/transaction/selector'

const transactionListMap = () => {
  const getTransaction = makeGetTransaction()

  return (state, ownProps) => {
    const transaction = getTransaction(state, ownProps.transactionId)

    return {
      transaction,
    }
  }
}

export function transactionListData(WrappedComponent) {
  return connect(transactionListMap, null)(WrappedComponent)
}
