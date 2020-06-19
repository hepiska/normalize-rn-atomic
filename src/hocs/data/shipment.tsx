import { connect } from 'react-redux'
import { makeSelectedShipments } from '@src/modules/shipment/selector'

const shipmentListMap = () => {
  const getShipment = makeSelectedShipments()

  return (state, ownProps) => {
    const shipment = getShipment(state, ownProps)

    return {
      shipment,
    }
  }
}
export function shipmentListData(WrappedComponent) {
  return connect(shipmentListMap, null)(WrappedComponent)
}
