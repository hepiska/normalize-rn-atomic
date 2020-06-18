import { connect } from 'react-redux'
import { makeGetTransactionPayment } from '@src/modules/transactions-payments/selector'

const paymentsMethodsListMap = () => {
  const getTransactionMethod = makeGetTransactionPayment()

  return (state, ownProps) => {
    const paymentMethod = getTransactionMethod(state, ownProps.paymentMethodId)

    return {
      paymentMethod,
    }
  }
}
export function paymentMethodListData(WrappedComponent) {
  return connect(paymentsMethodsListMap, null)(WrappedComponent)
}
