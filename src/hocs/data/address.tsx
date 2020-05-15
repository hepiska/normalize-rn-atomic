import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editAddress,
  removeAddress,
  getUserAddressById,
} from '@modules/address/action'
import { removeCheckoutAddressData } from '@modules/checkout/action'

const addressListMap = (state, ownProps) => {
  const { addressId } = ownProps
  let address = null
  if (addressId) {
    address = state.addresses.data[addressId]
  }

  return {
    address,
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
