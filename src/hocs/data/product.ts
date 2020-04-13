import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { navigate } from '@src/root-navigation'

const productListMap = (state, ownProps) => {
  const { productId } = ownProps
  const product = state.products.data[productId]
  const isSaved = !!state.productsSaved.data[productId]
  if (!product) return {}
  // const product = ownProps.product
  ownProps.onPress = () => {
    navigate('ProductDetail', { productId })
  }
  return {
    product: product,
    brand: state.brands.data[product.brand],
    isSaved,
    // brand: product.brand,
    category: state.categories[state.products[productId]],
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addProductSaved,
      deleteProductSaved,
    },
    dispatch,
  )
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const onSave = stateProps.isSaved
    ? dispatchProps.deleteProductSaved
    : dispatchProps.addProductSaved

  return { ...stateProps, ...ownProps, onSave }
}

export function productListData(WrappedComponent) {
  return connect(
    productListMap,
    mapDispatchToProps,
    mergeProps,
  )(WrappedComponent)
}
