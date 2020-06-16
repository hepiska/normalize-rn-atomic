import { connect } from 'react-redux'
import { makeGetTransactionPayment } from '@src/modules/transactions-payments/selector'

const paymentsMethodsListMap = (state, ownProps) => {
  const getTransactionMethod = makeGetTransactionPayment()
  const paymentMethod = getTransactionMethod(state, ownProps.paymentMethodId)

  return {
    paymentMethod,
  }
}
export function paymentMethodListData(WrappedComponent) {
  return connect(paymentsMethodsListMap, null)(WrappedComponent)
}
