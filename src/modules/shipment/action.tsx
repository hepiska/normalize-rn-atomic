import { store } from '@src/init-store'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const shipmentActionType = {
  FETCH: 'post/FETCH',
  SET_SHIPMENT_DATA: 'shipment/SET_SHIPMENT_DATA',
  SET_SHIPMENT_ORDER: 'shipment/SET_SHIPMENT_ORDER',
  FETCH_START: 'shipment/FETCH_START',
  SET_SHIPMENT_LOADING: 'shipment/SET_SHIPMENT_LOADING',
  ERROR: 'shipment/ERROR',
  SET_DEFAULT: 'shipment/DEFAULT',
  REMOVE_SHIPMENT_DATA: 'shipment/REMOVE_SHIPMENT_DATA',
  REMOVE_SHIPMENT_ORDER: 'shipment/REMOVE_SHIPMENT_ORDER',
}

export const setShipmentData = (data: any, warehouse_id: any) => {
  if (data) {
    const payload = {}
    payload[warehouse_id] = data
    return {
      type: shipmentActionType.SET_SHIPMENT_DATA,
      payload,
    }
  }
  return {
    type: shipmentActionType.SET_DEFAULT,
  }
}

export const setShipmentOrder = (data: any, warehouse_id: any) => {
  if (data) {
    const payload = {}
    payload[warehouse_id] = data

    const result = {
      type: shipmentActionType.SET_SHIPMENT_ORDER,
      payload: {
        key: warehouse_id,
        data,
      },
    }
    return result
  }
  return {
    type: shipmentActionType.SET_DEFAULT,
  }
}

export const setShipmentLoading = (data: any) => ({
  type: shipmentActionType.SET_SHIPMENT_LOADING,
  payload: data,
})

export const removeShipmentData = () => ({
  type: shipmentActionType.REMOVE_SHIPMENT_DATA,
})

export const removeShipmentOrder = () => ({
  type: shipmentActionType.REMOVE_SHIPMENT_ORDER,
})

export const getOptionShipment = (
  variant_ids,
  qtys,
  address_id,
  warehouse_id,
) => ({
  type: API,
  payload: {
    // url: `/shipments/cost?variant_ids=${variant_ids.toString()}&qtys=${qtys.toString()}&address_id=${address_id}`,
    url: '/shipments/cost',
    requestParams: {
      params: {
        variant_ids: variant_ids.toString(),
        qtys: qtys.toString(),
        address_id,
      },
    },
    schema: [schema.shipment],
    startNetwork: () => {
      return setShipmentLoading(true)
    },
    success: data => {
      return data
        ? [
            setShipmentData(data.entities.shipment, warehouse_id),
            setShipmentOrder(data.result, warehouse_id),
            setShipmentLoading(false),
          ]
        : [setShipmentLoading(false)]
    },
  },
})

export const changeOptionShipment = (
  variant_ids,
  shipping_method_id,
  address_id,
) => {
  return {
    type: API,
    payload: {
      url: `/carts/shipments`,
      requestParams: {
        method: 'PUT',
        data: {
          variant_ids,
          shipping_method_id,
          address_id,
        },
      },
      startNetwork: () => setShipmentLoading(true),
      success: data => {
        return [setShipmentLoading(false)]
      },
      error: err => {
        return [setShipmentLoading(false)]
      },
    },
  }
}
