import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { makeCloneProduct } from '@modules/selector-general'
import { addCartBeforeLogin } from '@modules/cart/action'

import { makeSelectedProducts } from '@modules/product/selector'
import { makeSelectedSearchProduct } from '@modules/search-product/selector'

import { makeIsSaved } from '@modules/product-saved/selector'
import { category } from '@src/modules/normalize-schema'

const productListMap = () => {
  const getSelectedProducts = makeSelectedProducts()
  const getIsSaved = makeIsSaved()
  const cloneProduct = makeCloneProduct()
  return (state, ownProps) => {
    const product = getSelectedProducts(state, ownProps.productId)
    if (!product) {
      return {}
    }

    const _product = cloneProduct(product)

    const isSaved = getIsSaved(state, ownProps)
    if (!_product) return {}
    return {
      product: _product,
      brand: state.brands.data[_product.brand],
      isSaved,
      isAuth: state.auth.isAuth,
      totalCart: Object.keys(state.carts.data).length || 0,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCartBeforeLogin,
      addProductSaved,
      deleteProductSaved,
    },
    dispatch,
  )
}

export function productListData(WrappedComponent) {
  return connect(productListMap, mapDispatchToProps)(WrappedComponent)
}

const productSearchListMap = () => {
  const getSelectedProducts = makeSelectedSearchProduct()
  const getIsSaved = makeIsSaved()
  const cloneProduct = makeCloneProduct()
  return (state, ownProps) => {
    const product = getSelectedProducts(state, ownProps.productId)
    if (!product) {
      return {}
    }
    const _product = cloneProduct(product || {})
    const isSaved = getIsSaved(state, ownProps)
    return {
      product: _product,
      isSaved: isSaved,
      isAuth: state.auth.isAuth,
      brand: _product.brand,
    }
  }
}

export function productSearchListData(WrappedComponent) {
  return connect(productSearchListMap, mapDispatchToProps)(WrappedComponent)
}
