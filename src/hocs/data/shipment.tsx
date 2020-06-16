import { connect } from 'react-redux'
import { makeSelectedShipments } from '@src/modules/shipment/selector'

const shipmentListMap = (state, ownProps) => {
  const getShipment = makeSelectedShipments()
  const shipment = getShipment(state, ownProps)

  return {
    shipment,
  }
}
export function shipmentListData(WrappedComponent) {
  return connect(shipmentListMap, null)(WrappedComponent)
}
