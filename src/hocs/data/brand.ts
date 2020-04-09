import { connect } from 'react-redux'
import { navigate, navigationInf } from '@src/root-navigation'
import { NavigationActions } from 'react-navigation'

const brandListMap = (state, ownProps) => {
  const { brandId } = ownProps
  const brand = state.brands.data[brandId]

  ownProps.onPress = () => {
    // const navigation = navigationInf()
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'ProductList',

    //   params: {},

    //   action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
    // })
    navigate('ProductList', { brandsId: brandId, from: 'brands' })
  }

  return {
    brand,
  }
}
export function brandListData(WrappedComponent) {
  return connect(brandListMap, null)(WrappedComponent)
}
