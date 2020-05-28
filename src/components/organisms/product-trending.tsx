import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTrendingProduct } from '@modules/product/action'
import { bindActionCreators } from 'redux'
import HorizontalList from '@components/organisms/horizontal-list'
import UserCard from '@components/molecules/user-card'
import { userListData } from '@hocs/data/user'

const UserWithHoc = userListData(UserCard)

const ProductTrending = (props: any) => {
  React.useEffect(() => {
    props.getTrendingProduct({ limit: 10, offset: 0 })
  }, [])
  const data = {
    title: 'Just For You',
    type: 'product',
    products: props.products,
  }
  return (
    <View style={{ paddingVertical: 16, backgroundColor: 'white' }}>
      <HorizontalList data={data} navigation={props.navigation} />
    </View>
  )
}

const mapStateToProps = state => ({ products: state.products.trendingOrder })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTrendingProduct }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductTrending)
