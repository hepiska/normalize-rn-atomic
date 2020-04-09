import { connect } from 'react-redux'
import { navigate } from '@src/root-navigation'

const brandListMap = (state, ownProps) => {
  const { brandId } = ownProps
  const brand = state.brands.data[brandId]

  ownProps.onPress = () => {
    navigate('ProductList', { brandId })
  }

  return {
    brand,
  }
}
export function brandListData(WrappedComponent) {
  return connect(brandListMap, null)(WrappedComponent)
}
