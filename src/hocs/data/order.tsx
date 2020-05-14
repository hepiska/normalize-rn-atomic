import { connect } from 'react-redux'

const orderListMap = (state, ownProps) => {
  const orderId = ownProps.orderId
  const order = state.orders.data[orderId]
  const products = order?.product
  const oneProduct = state.products.data[products[0]]
  const brand = state.brands.data[oneProduct.brand]

  return {
    order,
    oneProduct,
    products,
    brand,
  }
}
export function orderListData(WrappedComponent) {
  return connect(orderListMap, null)(WrappedComponent)
}
