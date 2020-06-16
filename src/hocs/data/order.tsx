import { connect } from 'react-redux'
import { makeSelectedOrder } from '@src/modules/order/selector'
import { makeSelectedProducts } from '@src/modules/product/selector'
import { makeSelectedBrands } from '@src/modules/brand/selector'

const orderListMap = (state, ownProps) => {
  const getOrders = makeSelectedOrder()
  const getProducts = makeSelectedProducts()
  const getBrands = makeSelectedBrands()

  const order = getOrders(state, ownProps.orderId)
  const products = order?.product
  const oneProduct = getProducts(state, products[0])
  const brand = getBrands(state, oneProduct.brand)

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
