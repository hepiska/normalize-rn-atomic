import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deepClone } from '@utils/helpers'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { removeCart, changeCartQty } from '@modules/cart/action'
import { navigate } from '@src/root-navigation'
import { getProductById } from '@modules/product/action'
import { makeSelectorCarts } from '@src/modules/cart/selector'
import { makeSelectedProducts } from '@src/modules/product/selector'
import { makeSelectedBrands } from '@src/modules/brand/selector'
import { makeCloneProduct } from '@modules/selector-general'
import { makeIsSaved } from '@src/modules/product-saved/selector'

const cartListMap = () => {
  const getSelectedCarts = makeSelectorCarts()
  const getSelectedProducts = makeSelectedProducts()
  const getSelectedBrands = makeSelectedBrands()
  const getIsSaved = makeIsSaved()

  const cloneVariant = makeCloneProduct()
  return (state, ownProps) => {
    let cart
    let brand
    let variant
    let isSaved
    let product

    if (ownProps.cartId) {
      cart = getSelectedCarts(state, ownProps)
      brand = getSelectedBrands(state, cart.brand.id)
      variant = cloneVariant(cart.variant)
      isSaved = getIsSaved(state, cart.variant.product_id)
      product = getSelectedProducts(state, cart.variant.product_id)

      if (variant.attribute_values && product) {
        variant.attribute_values?.map(v => {
          const attribute = product.attributes.find(
            attribute => attribute.attribute_id === v.attribute_id,
          )
          v.label = attribute.label
          return v
        })
      }
    }

    if (ownProps.productId) {
      product = getSelectedProducts(state, ownProps.productId)
      brand = getSelectedBrands(state, product.brand)
      let qty = product.variant.qty
      cart = {}
      cart['qty'] = qty
      variant = cloneVariant(product.variant && product)
      if (variant.attribute_values) {
        variant.attribute_values?.map(v => {
          const attribute = product.attributes.find(
            attribute => attribute.attribute_id === v.attribute_id,
          )
          v.label = attribute.label
          return v
        })
      }
    }
    return {
      cart,
      brand,
      variant,
      isSaved,
      product,
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCart,
      changeCartQty,
      addProductSaved,
      deleteProductSaved,
      getProductById,
    },
    dispatch,
  )

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const onSave = stateProps.isSaved
    ? dispatchProps.deleteProductSaved
    : dispatchProps.addProductSaved

  return { ...stateProps, ...ownProps, ...dispatchProps, onSave }
}

export function cartListData(WrappedComponent) {
  return connect(cartListMap, mapDispatchToProps, mergeProps)(WrappedComponent)
}
