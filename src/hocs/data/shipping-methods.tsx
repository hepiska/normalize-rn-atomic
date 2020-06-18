import { connect } from 'react-redux'
import { navigate, navigationInf } from '@src/root-navigation'
import { NavigationActions } from 'react-navigation'

const shippingMethodsListMap = () => {
  return (state, ownProps) => {
    const { shippingMethodId } = ownProps
    const courier = state.shippingMethods.data[shippingMethodId]

    return {
      courier,
    }
  }
}
export function shippingMethodsListData(WrappedComponent) {
  return connect(shippingMethodsListMap, null)(WrappedComponent)
}
