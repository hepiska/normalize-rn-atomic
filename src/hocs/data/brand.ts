import { connect } from 'react-redux'
import { navigate, navigationInf } from '@src/root-navigation'
import { NavigationActions } from 'react-navigation'
import { makeSelectedBrands } from '@modules/brand/selector'

const brandListMap = (state, ownProps) => {
  const getBrands = makeSelectedBrands()
  const brand = getBrands(state, ownProps.brandId)

  if (!brand) return null
  return {
    brand,
  }
}
export function brandListData(WrappedComponent) {
  return connect(brandListMap, null)(WrappedComponent)
}
