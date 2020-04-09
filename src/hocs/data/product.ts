import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'

const productListMap = (state, ownProps) => {
  const { productId } = ownProps
  const product = state.products.data[productId]
  if (!product) return {}
  // const product = ownProps.product
  ownProps.onPress = () => {
    navigate('ProductDetail', { productId })
  }
  return {
    product: product,
    brand: state.brands.data[product.brand],
    // brand: product.brand,
    category: state.categories[state.products[productId]],
  }
}
export function productListData(WrappedComponent) {
  return connect(productListMap, null)(WrappedComponent)
}
