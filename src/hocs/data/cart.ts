import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deepClone } from '@utils/helpers'
import { removeCart, changeCartQty } from '@modules/cart/action'

const cartListMap = (state, ownProps) => {
  const { cartId, productId } = ownProps
  let cart
  let brand
  let variant
  if (cartId) {
    cart = state.carts.data[cartId]
    brand = cart.brand
    variant = deepClone(cart.variant)

    if (variant.attribute_values) {
      variant.attribute_values?.map(v => {
        v.label = state.productAttribute.data[v.attribute_id]?.label
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
    variant = deepClone(product.variant)

    if (variant.attribute_values) {
      variant.attribute_values?.map(v => {
        v.label = state.productAttribute.data[v.attribute_id]?.label
        return v
      })
    }
  }

  return {
    cart,
    brand,
    variant,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeCart, changeCartQty }, dispatch)

export function cartListData(WrappedComponent) {
  return connect(cartListMap, mapDispatchToProps)(WrappedComponent)
}
