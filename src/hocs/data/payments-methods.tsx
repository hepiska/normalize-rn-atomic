import { connect } from 'react-redux'

const paymentsMethodsListMap = (state, ownProps) => {
  const paymentMethodId = ownProps.paymentMethodId
  const paymentMethod = state.transactionsPayments.data[paymentMethodId]
  return {
    paymentMethod,
  }
}
export function paymentMethodListData(WrappedComponent) {
  return connect(paymentsMethodsListMap, null)(WrappedComponent)
}
