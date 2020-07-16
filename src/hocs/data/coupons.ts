import { connect } from 'react-redux'
import { makeSelectedCoupons } from '@src/modules/coupons/selector'

const couponsListmap = () => {
  const getCoupons = makeSelectedCoupons()

  return (state, ownProps) => {
    const coupon = getCoupons(state, ownProps.couponId || ownProps.couponID)
    return {
      coupon,
    }
  }
}
export function couponsData(WrappedComponent) {
  return connect(couponsListmap, null)(WrappedComponent)
}
