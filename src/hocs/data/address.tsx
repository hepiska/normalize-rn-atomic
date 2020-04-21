import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editAddress, removeAddress } from '@modules/address/action'

const addressListMap = (state, ownProps) => {
  const { addressId } = ownProps
  const address = state.addresses.data[addressId]

  return {
    address,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editAddress, removeAddress }, dispatch)

export function addressListData(WrappedComponent) {
  return connect(addressListMap, mapDispatchToProps)(WrappedComponent)
}
