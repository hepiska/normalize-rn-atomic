import { connect } from 'react-redux'

const productListMap = (state, ownProps) => {
  const { productId } = ownProps
  const product = state.products.data[productId]
  const variants = product.variants || []
  const primary = {
    ...product,
    ...variants.find(_var => _var.is_primary),
  }
  return {
    product: primary,
    brand: state.brands.data[product.brand],
    category: state.categories[state.products[productId]],
  }
}
export function productListData(WrappedComponent) {
  return connect(productListMap, null)(WrappedComponent)
}
