import { connect } from 'react-redux'
import { navigate, navigationInf } from '@src/root-navigation'
import { NavigationActions } from 'react-navigation'

const shipmentListMap = (state, ownProps) => {
  const { shipmentId, warehouseId } = ownProps
  const shipment = state.shipments.data[warehouseId][shipmentId]

  ownProps.onPress = () => {}

  return {
    shipment,
  }
}
export function shipmentListData(WrappedComponent) {
  return connect(shipmentListMap, null)(WrappedComponent)
}
