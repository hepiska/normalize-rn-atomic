import { connect } from 'react-redux'

const brandListMap = (state, ownProps) => {
  const { brandId } = ownProps
  const brand = state.brands.data[brandId]

  return {
    brand,
  }
}
export function brandListData(WrappedComponent) {
  return connect(brandListMap, null)(WrappedComponent)
}
