import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { makeCloneProduct } from '@modules/selector-general'

import { makeSelectedProducts } from '@modules/product/selector'
import { makeIsSaved } from '@modules/product-saved/selector'
import { category } from '@src/modules/normalize-schema'

const productListMap = (state, ownProps) => {
  const getSelectedProducts = makeSelectedProducts()
  const getIsSaved = makeIsSaved()
  const cloneProduct = makeCloneProduct()

  const product = getSelectedProducts(state, ownProps)

  const _product = cloneProduct(product)

  const isSaved = getIsSaved(state, ownProps)
  if (!_product) return {}
  return {
    product: _product,
    brand: state.brands.data[_product.brand],
    isSaved,
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

export function productListData(WrappedComponent) {
  return connect(productListMap, mapDispatchToProps)(WrappedComponent)
}
