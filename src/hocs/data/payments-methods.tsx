import { connect } from 'react-redux'

const paymentsMethodsListMap = (state, ownProps) => {
  const paymentMethodId = ownProps.paymentMethodId
  const paymentMethod = state.transactionsPayments.data[paymentMethodId]
  console.log('HOC paymentMethodId ---', paymentMethodId)
  console.log('HOC paymentMethod ---', paymentMethod)
  return {
    paymentMethod,
  }
}
export function paymentMethodListData(WrappedComponent) {
  return connect(paymentsMethodsListMap, null)(WrappedComponent)
}
