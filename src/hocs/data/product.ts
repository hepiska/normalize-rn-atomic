import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { navigate } from '@src/root-navigation'
import { addCart } from '@modules/cart/action'
import { deepClone } from '@utils/helpers'

const productListMap = (state, ownProps) => {
  const { productId } = ownProps
  const product = state.products.data[productId]

  const _product = deepClone(product)

  if (_product.attributes) {
    _product.attributes = _product.attributes.map(v => {
      return state.productAttribute.data[v]
    })
  }

  const isSaved = !!state.productsSaved.data[productId]
  if (!_product) return {}
  // const product = ownProps.product
  ownProps.onPress = () => {
    navigate('Screens', { screen: 'ProductDetail', params: { productId } })
  }
  return {
    product: _product,
    brand: state.brands.data[_product.brand],
    isSaved,
    // brand: product.brand,
    category: state.categories[state.products[productId]],
    isAuth: state.auth.isAuth,
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
