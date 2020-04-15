import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deepClone } from '@utils/helpers'
import { removeCart, changeCartQty } from '@modules/cart/action'

const cartListMap = (state, ownProps) => {
  const { cartId } = ownProps
  const cart = state.carts.data[cartId]
  const brand = cart.brand

  let variant = deepClone(cart.variant)

  if (variant.attribute_values) {
    variant.attribute_values?.map(v => {
      v.label = state.productAttribute.data[v.attribute_id]?.label
      return v
    })
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
