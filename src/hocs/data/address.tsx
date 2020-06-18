import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editAddress,
  removeAddress,
  getUserAddressById,
} from '@modules/address/action'
import { removeCheckoutAddressData } from '@modules/checkout/action'
import { makeSelectedAddresses } from '@src/modules/address/selector'

const addressListMap = () => {
  const getSelectedAddresses = makeSelectedAddresses()

  return (state, ownProps) => {
    const address = getSelectedAddresses(state, ownProps)

    if (!address) return null
    return {
      address,
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editAddress,
      removeAddress,
      removeCheckoutAddressData,
      getUserAddressById,
    },
    dispatch,
  )

export function addressListData(WrappedComponent) {
  return connect(addressListMap, mapDispatchToProps)(WrappedComponent)
}
