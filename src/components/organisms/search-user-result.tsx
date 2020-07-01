import React, { PureComponent } from 'react'
import {
  Dimensions,
  ViewStyle,
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native'

import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { connect } from 'react-redux'
import FollowCard from '@components/molecules/follow-card'
import { searchUserListData } from '@hocs/data/user'
import FollowListLoader from '@components/atoms/loaders/follow-list'
import EmtyState from '@components/molecules/order-empty-state'
import List from '@components/layouts/list-header'
import { dispatch } from '@src/root-navigation'
import { StackActions } from '@react-navigation/native'

const UserHoc = searchUserListData(FollowCard)

const userCardHeight = 73

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchUserType {
  style?: any
  fetchMore?: () => void
  searchKey?: string
  loading?: boolean
  total?: number
  skip?: number
  user?: any
}

class SearchUserResult extends PureComponent<SearchUserType, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  onReachedEnd = () => {
    const { loading, fetchMore } = this.props
    if (!loading) {
      fetchMore()
    }
  }

  _handlePress = userId => () => {
    dispatch(StackActions.replace('UserDetail', { userId }))
  }

  renderItem = ({ item, index }) => {
    // return null
    return (
      <UserHoc
        userId={item}
        key={`search-user-${index}`}
        onPress={this._handlePress(item)}
        idx={index}
      />
    )
  }

  renderHeader = () => {
    const { searchKey, total } = this.props

    if (!searchKey) return null

    return (
      <View>
        <SearchResultCard
          leftContent={
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black80,
              }}>
              {`Results for `}
              <Text style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
            </Text>
          }
          rightContent={
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black70,
              }}>
              {`${total} items`}
            </Text>
          }
          style={{
            backgroundColor: colors.black50,
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        />
      </View>
    )
  }
  _renderFooterLoader = () => {
    const { loading } = this.props

    return (
      <View
        style={{ height: 200, width: '100%', backgroundColor: 'transparent' }}>
        {loading && <FollowListLoader style={{ margin: 16 }} />}
      </View>
    )
  }

  emtyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title = searchKey.length > 2 ? 'No User' : 'Please Fill keyword'
    const desc =
      searchKey.length > 2
        ? 'We Dont find any user for this Keyword'
        : 'Please Fill keyword'
    return <EmtyState title={title} description={desc} />
  }

  _keyExtractor = (item, key) => {
    return 'search-user-item' + item + key
  }

  render() {
    const { searchKey, style, user, loading } = this.props
    const data = searchKey.length > 2 ? user : []

    return (
      <View style={{ ...styles.container, ...style }}>
        <List
          data={data}
          ListHeaderComponent={this.renderHeader}
          onEndReachedThreshold={0.9}
          onEndReached={this.onReachedEnd}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={this.emtyComponent}
          ListFooterComponent={this._renderFooterLoader}
          getItemLayout={(data, index) => ({
            length: userCardHeight,
            offset: userCardHeight * index,
            index,
          })}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.searchUser.loading,
    total:
      state.searchUser.pagination?.total || state.searchUser.order.length || 0,
    user: state.searchUser.order,
  }
}
export default connect(mapStateToProps, null)(SearchUserResult)
