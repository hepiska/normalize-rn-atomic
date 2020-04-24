import { connect } from 'react-redux'

const paymentListMap = (state, ownProps) => {
  const { orderId } = ownProps
  const order = state.orders.data[orderId]
  const transaction = state.transaction.data[orderId]

  return {
    order,
    transaction,
  }
}
export function paymentListData(WrappedComponent) {
  return connect(paymentListMap, null)(WrappedComponent)
}
