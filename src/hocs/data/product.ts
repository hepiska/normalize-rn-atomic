import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'

const productListMap = (state, ownProps) => {
  const { productId } = ownProps
  const product = state.products.data[productId]
  const variants = product.variants || []
  const primary = {
    ...product,
    ...variants.find(_var => _var.is_primary),
  }
  ownProps.onPress = () => navigate('ProductDetail', { productId })
  return {
    product: primary,
    brand: state.brands.data[product.brand],
    category: state.categories[state.products[productId]],
  }
}
export function productListData(WrappedComponent) {
  return connect(productListMap, null)(WrappedComponent)
}
