import { createSelector } from 'reselect'
import { deepClone } from '@utils/helpers'

const getCoupons = (state, couponId) => state.coupons.data[couponId]

export const makeSelectedCoupons = () => {
  return createSelector(getCoupons, coupon => {
    return coupon
  })
}
