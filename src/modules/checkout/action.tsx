import { store } from '@src/init-store'
import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { removeShipmentData, removeShipmentOrder } from '../shipment/action'
import { setOrderData, setOrderOrder, setActiveOrder } from '../order/action'
import { setActiveTransaction } from '../transaction/action'
import { navigate } from '@src/root-navigation'

export const checkoutActionType = {
  FETCH: 'post/FETCH',
  SET_CHECKOUT_ADDRESS_DATA: 'checkout/SET_CHECKOUT_ADDRESS_DATA',
  ADD_SHIPPING_METHOD_DATA: 'checkout/ADD_SHIPPING_METHOD_DATA',
  REMOVE_SHIPPING_DATA: 'checkout/REMOVE_SHIPPING_DATA',
  UPDATE_COURIER_DATA: 'checkout/UPDATE_COURIER_DATA',
  SET_CHECKOUT_ORDER: 'checkout/SET_CHECKOUT_ORDER',
  FETCH_START: 'checkout/FETCH_START',
  SET_CHECKOUT_LOADING: 'checkout/SET_CHECKOUT_LOADING',
  REMOVE_CHECKOUT_DATA: 'checkout/REMOVE_CHECKOUT_DATA',
  SET_ERROR: 'checkout/SET_ERROR',
  SET_DEFAULT: 'checkout/DEFAULT',
}

export const setCheckoutAddressData = (data: any) => {
  return {
    type: checkoutActionType.SET_CHECKOUT_ADDRESS_DATA,
    payload: data,
  }
}

export const removeShippingData = (data: any) => {
  return {
    type: checkoutActionType.REMOVE_SHIPPING_DATA,
    payload: data,
  }
}

export const addShippingMethodData = (data: any) => {
  return {
    type: checkoutActionType.ADD_SHIPPING_METHOD_DATA,
    payload: data,
  }
}

export const updateCourier = (data: any) => {
  return {
    type: checkoutActionType.UPDATE_COURIER_DATA,
    payload: data,
  }
}

export const setErrorCheckout = (data: any) => {
  return {
    type: checkoutActionType.SET_ERROR,
    payload: data,
  }
}

export const setCheckoutOrder = (data: any) => ({
  type: checkoutActionType.SET_CHECKOUT_ORDER,
  payload: data,
})

export const setCheckoutLoading = (data: any) => ({
  type: checkoutActionType.SET_CHECKOUT_LOADING,
  payload: data,
})

export const removeCheckoutAddressData = () => ({
  type: checkoutActionType.REMOVE_CHECKOUT_DATA,
})

export const payNow = (cart_ids, user_address_id) => {
  const params = {
    cart_ids,
    user_address_id,
  }
  return {
    type: API,
    payload: {
      url: '/orders',
      requestParams: {
        method: 'POST',
        data: { ...params },
      },
      schema: schema.payment,
      startNetwork: () => [
        setCheckoutLoading(true),
        setActiveTransaction(null),
      ],
      success: data => {
        navigate('Screens', {
          screen: 'PaymentMethod',
        })
        return [
          setOrderData(data.entities.payment),
          setOrderOrder(data.result),
          setActiveTransaction(data.result),
          removeCheckoutAddressData(),
          removeShipmentData(),
          removeShipmentOrder(),
          setCheckoutLoading(false),
        ]
      },
      error: err => {
        return [setErrorCheckout(err), setCheckoutLoading(false)]
      },
    },
  }
}
