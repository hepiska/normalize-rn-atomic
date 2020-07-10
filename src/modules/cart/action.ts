import { API } from '../action-types'
import * as schema from '@modules/normalize-schema'
import { Alert } from 'react-native'

export const actionType = {
  SET_CART_DATA: 'cart/SET_CART_DATA',
  SET_CART_ORDER: 'cart/SET_CART_ORDER',
  ADD_ONE_CART_ORDER: 'cart/ADD_ONE_CART_ORDER',
  SET_CART_DATA_BEFORE_LOGIN: 'cart/SET_CART_DATA_BEFORE_LOGIN',
  SET_CART_ORDER_BEFORE_LOGIN: 'cart/SET_CART_ORDER_BEFORE_LOGIN',
  CHANGE_CART_DATA_BEFORE_LOGIN: 'cart/CHANGE_CART_DATA_BEFORE_LOGIN',
  REMOVE_CART_ORDER: 'cart/REMOVE_CART_ORDER',
  SET_LOADING: 'cart/SET_LOADING',
  SET_ERROR: 'cart/SET_ERROR',
  ADD_CART: 'cart/ADD_CART_',
  REPLACE_ORDER: 'cart/REPLACE_ORDER',
  CHANGE_QTY_DATA: 'cart/CHANGE_QTY_DATA',
  REMOVE_CART: 'cart/REMOVE_CART',
  REMOVE_CART_BEFORE_LOGIN: 'cart/REMOVE_CART_BEFORE_LOGIN',
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

export const removeCartOrder = data => {
  return {
    type: actionType.REMOVE_CART_ORDER,
    payload: data,
  }
}

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
    error: () => {
      return [setLoading(false)]
    },
  },
})

export const addCartBeforeLogin = data => {
  return [setCartDataBeforeLogin(data), setCartOrderBeforeLogin(data)]
}

export const changeCartDataBeforeLogin = data => {
  return {
    type: actionType.CHANGE_CART_DATA_BEFORE_LOGIN,
    payload: data,
  }
}

export const setCartDataBeforeLogin = data => {
  const _variant = {
    ...data.variant,
    product: {
      address: data.product.address,
      brand_name: data.product.brand.name,
      product_name: data.product.name,
      product_slug: data.product.slug,
    },
    product_id: data.product.id,
  }
  const manipulatedData = {
    address_id: data.product.address.id,
    brand: data.product.brand,
    brand_id: data.product.brand.id,
    is_available: data.variant.is_available,
    is_product_hidden: false,
    is_stock_available: true,
    id: data.id,
    qty: data.qty,
    remark: data.remark,
    shipping_methods: data.product.shipping_methods,
    user_id: null,
    variant: _variant,
    variant_id: data.variant_id,
  }
  return {
    type: actionType.SET_CART_DATA_BEFORE_LOGIN,
    payload: manipulatedData,
  }
}

export const setCartOrderBeforeLogin = data => ({
  type: actionType.SET_CART_ORDER_BEFORE_LOGIN,
  payload: data.id,
})

export const addCart = (
  data: {
    variant_id: number
    qty: number
    remark?: string
  },
  dispatchOnSuccess,
) => ({
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
      Alert.alert('Success', 'Success Add Product To Cart')
      const dispatchers = [setCartData(data.entities.cart), getAllCart()]
      if (dispatchOnSuccess) {
        dispatchers.push(dispatchOnSuccess)
      }
      return dispatchers
    },
    error: () => {
      return [setLoading(false)]
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
    error: () => {
      return [setLoading(false)]
    },
  },
})

export const changeVariantBeforeLogin = ({
  variant_id,
  variant,
  cart,
  product,
  brand,
}: any) => {
  const _variant = {
    ...variant,
    product: {
      address: product.address,
      brand_name: brand,
      product_name: product.name,
      product_slug: product.slug,
    },
    product_id: product.id,
  }
  const data = {
    ...cart,
    variant: _variant,
    variant_id,
  }
  return changeCartDataBeforeLogin(data)
}

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
        removeCart(cart.id),
        getAllCart(),
      ]
    },
    error: () => {
      return [setLoading(false)]
    },
  },
})

export const changeCartQty = ({ qty, cart_id }) => ({
  type: API,
  payload: {
    schema: schema.cart,
    url: '/carts/' + cart_id,
    requestParams: {
      method: 'PUT',
      data: {
        qty: qty,
      },
    },
    startNetwork: () => setLoading(true),
    success: data => {
      return [
        setCartData(data.entities.cart),
        changeQtyData({ qty, cart_id }),
        setLoading(false),
      ]
    },
    error: () => {
      return [setLoading(false)]
    },
  },
})

export const deleteCartBeforeLogin = (data: any) => ({
  type: actionType.REMOVE_CART_BEFORE_LOGIN,
  data,
})

export const synchronizeCart = (data: any) => {
  if (data && data.length > 0) {
    const dispacers = data.map(val =>
      addCart(
        {
          variant_id: val.variant_id,
          qty: val.qty,
        },
        deleteCartBeforeLogin(val.id),
      ),
    )

    return [...dispacers]
  }
  return [setLoading(false)]
}
