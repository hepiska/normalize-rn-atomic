import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const transactionListMap = (state, ownProps) => {
  const { transactionId } = ownProps
  const transaction = state.transaction.data[transactionId]

  return {
    transaction,
  }
}

export function transactionListData(WrappedComponent) {
  return connect(transactionListMap, null)(WrappedComponent)
}
