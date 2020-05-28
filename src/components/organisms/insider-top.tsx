import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getTrendingInsider } from '@modules/user/action'
import { bindActionCreators } from 'redux'
import HorizontalList from '@components/layouts/horizontal-list'
import UserCard from '@components/molecules/user-card'
import { userListData } from '@hocs/data/user'

const UserWithHoc = userListData(UserCard)

const TopInsider = (props: any) => {
  React.useEffect(() => {
    props.getTrendingInsider({ limit: 10, offset: 0 })
  }, [])
  const renderItem = ({ item, index }) => {
    return <UserWithHoc userId={item} />
  }
  return (
    <View style={{ marginVertical: 8 }}>
      <HorizontalList
        title="Top Insiders"
        loading={props.loading}
        data={props.insider}
        renderItem={renderItem}
        flatlistprops={{
          contentContainerStyle: { alignItems: 'center' },
        }}
      />
    </View>
  )
}

const mapStateToProps = state => ({
  insider: state.user.trendingOrder,
  loading: state.user.loadings.trendingInsider,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTrendingInsider }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TopInsider)
