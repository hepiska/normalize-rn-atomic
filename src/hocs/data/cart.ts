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

const cartListMap = (state, ownProps) => {
  const { cartId, productId } = ownProps
  let cart
  let brand
  let variant
  let isSaved
  let product
  if (cartId) {
    cart = state.carts.data[cartId]
    brand = cart.brand
    variant = deepClone(cart.variant)
    isSaved = !!state.productsSaved.data[cart.variant.product_id]
    product = state.products.data[cart.variant.product_id]
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

  if (productId) {
    const product = state.products.data[productId]
    brand = state.brands.data[product.brand]
    let qty = product.variant.qty
    cart = {}
    cart['qty'] = qty
    variant = deepClone(product.variant && product)
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

  ownProps.gotoProductDetail = () => {
    const _productId = product.id
    navigate('Screens', {
      screen: 'ProductDetail',
      params: { productId: _productId },
    })
  }

  return {
    cart,
    brand,
    variant,
    isSaved,
    product,
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
