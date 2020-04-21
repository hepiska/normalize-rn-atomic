import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'

export const actionType = {
  SET_CART_DATA: 'cart/SET_CART_DATA',
  SET_CART_ORDER: 'cart/SET_CART_ORDER',
  ADD_ONE_CART_ORDER: 'cart/ADD_ONE_CART_ORDER',
  REMOVE_CART_ORDER: 'cart/REMOVE_CART_ORDER',
  SET_LOADING: 'cart/SET_LOADING',
  SET_ERROR: 'cart/SET_ERROR',
  ADD_CART: 'cart/ADD_CART_',
  REPLACE_ORDER: 'cart/REPLACE_ORDER',
  CHANGE_QTY_DATA: 'cart/CHANGE_QTY_DATA',
  REMOVE_CART: 'cart/REMOVE_CART',
}

export const setLoading = data => ({
  type: actionType.SET_LOADING,
  payload: data,
})

export const setCartOrder = data => ({
  type: actionType.SET_CART_ORDER,
  payload: data,
})

export const addOneCartOrder = data => ({
  type: actionType.ADD_ONE_CART_ORDER,
  payload: data,
})

export const replaceOrder = data => ({
  type: actionType.REPLACE_ORDER,
  payload: data,
})
export const changeQtyData = data => {
  return {
    type: actionType.CHANGE_QTY_DATA,
    payload: data,
  }
}

export const removeCartOrder = data => ({
  type: actionType.REMOVE_CART_ORDER,
  payload: data,
})

export const setCartData = data => ({
  type: actionType.SET_CART_DATA,
  payload: data,
})

export const getAllCart = () => ({
  type: API,
  payload: {
    schema: [schema.cart],
    url: '/carts',
    startNetwork: () => setLoading(true),
    success: (data, { pagination }) => {
      return [
        setCartData(data.entities.cart),
        setCartOrder({ order: data.result, pagination }),
        setLoading(false),
      ]
    },
  },
})

export const addCart = (data: {
  variant_id: number
  qty: number
  remark?: string
}) => ({
  type: API,

  payload: {
    schema: schema.cart,
    requestParams: {
      method: 'POST',
      data,
    },
    url: '/carts',
    startNetwork: () => setLoading(true),
    success: data => {
      return [
        setCartData(data.entities.cart),
        addOneCartOrder(data.result),
        setLoading(false),
      ]
    },
  },
})

export const removeCart = cart_id => ({
  type: API,
  payload: {
    url: '/carts/' + cart_id,
    requestParams: {
      method: 'DELETE',
    },
    startNetwork: () => setLoading(true),
    success: () => {
      return [removeCartOrder(cart_id), setLoading(false)]
    },
  },
})

export const changeVariant = ({ cart, variant_id }: any) => ({
  type: API,

  payload: {
    schema: schema.cart,
    requestParams: {
      method: 'POST',
      data: { variant_id, qty: cart.qty },
    },
    url: '/carts',
    startNetwork: () => setLoading(true),
    success: data => {
      return [
        setCartData(data.entities.cart),
        replaceOrder({ to: data.result, from: cart.id }),
        removeCart(cart.id),
        // addOneCartOrder(data.result),
      ]
    },
  },
})

export const changeCartQty = ({ qty, cart_id }) => ({
  type: API,
  payload: {
    url: '/carts/' + cart_id,
    requestParams: {
      method: 'PUT',
      data: {
        qty: qty,
      },
    },
    startNetwork: () => setLoading(true),
    success: data => {
      // console.log(data)
      return [changeQtyData({ qty, cart_id }), setLoading(false)]
    },
  },
})
