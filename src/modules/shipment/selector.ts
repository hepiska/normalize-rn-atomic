import { createSelector } from 'reselect'

const getShipment = (state, props) =>
  state.shipments.data[props.warehouseId][props.shipmentId]

export const makeSelectedShipments = () =>
  createSelector([getShipment], shipment => {
    return shipment
  })
