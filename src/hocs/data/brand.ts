import { connect } from 'react-redux'
import { navigate, navigationInf } from '@src/root-navigation'
import { NavigationActions } from 'react-navigation'
import {
  makeSelectedBrands,
  makeSelectedSearchBrands,
} from '@modules/brand/selector'

const brandListMap = () => {
  const getBrands = makeSelectedBrands()
  return (state, ownProps) => {
    const brand = getBrands(state, ownProps.brandId)

    if (!brand) return null
    return {
      brand,
    }
  }
}

const searchbrandListMap = () => {
  const getBrands = makeSelectedSearchBrands()
  return (state, ownProps) => {
    const brand = getBrands(state, ownProps.brandId)
    if (!brand) return null
    return {
      brand,
    }
  }
}

export function brandListData(WrappedComponent) {
  return connect(brandListMap, null)(WrappedComponent)
}

export function searchBrandListData(WrappedComponent) {
  return connect(searchbrandListMap, null)(WrappedComponent)
}
