import React, { Component } from 'react'
import { View, Text, StyleSheet, InteractionManager } from 'react-native'

import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { connect } from 'react-redux'
import FollowCard from '@components/molecules/follow-card'
import { searchUserListData } from '@hocs/data/user'
import FollowListLoader from '@components/atoms/loaders/follow-list'
import EmptyState from '@components/molecules/order-empty-state'
import List from '@components/layouts/list-header'
import { dispatch } from '@src/root-navigation'
import { StackActions } from '@react-navigation/native'
import { setSkip } from '@src/modules/global-search-ui/action'
import { bindActionCreators } from 'redux'

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
  skip?: {}
  activeTab: number
  setSkip: (obj: any) => void
  user?: any
}

class SearchUserResult extends Component<SearchUserType, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.total !== nextProps.total ||
      this.props.activeTab !== nextProps.activeTab ||
      this.props.loading !== nextProps.loading ||
      this.props.searchKey !== nextProps.searchKey ||
      this.props.user.length !== nextProps.user.length ||
      this.state.finishAnimation !== nextState.finishAnimation
    ) {
      return true
    }

    return false
  }

  onReachedEnd = () => {
    const { loading, skip, activeTab } = this.props
    const newSkip = { ...skip }

    if (!loading) {
      newSkip[activeTab] += 1

      this.props.setSkip(newSkip)
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
    const { loading, user } = this.props
    if (user.length < 10) {
      return null
    }

    return (
      <View
        style={{ height: 200, width: '100%', backgroundColor: 'transparent' }}>
        {loading && <FollowListLoader style={{ margin: 16 }} />}
      </View>
    )
  }

  emptyComponent = () => {
    const { searchKey, loading } = this.props

    if (loading) return null

    const title =
      searchKey.length > 2 ? 'No Result Found' : 'Please Fill keyword'
    const desc = searchKey.length > 2 ? '' : 'Please Fill keyword'
    return (
      <EmptyState
        title={
          <Text
            style={{
              ...fontStyle.playfairBold,
              fontSize: 24,
              color: colors.black100,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        }
        description={desc}
        img={require('@src/assets/placeholder/greeting-card-before-login.png')}
      />
    )
  }

  _keyExtractor = (item, key) => {
    return 'search-user-item' + item + key
  }

  render() {
    const { searchKey, style, user, loading } = this.props
    const data = searchKey.length > 2 ? user : []

    return (
      <View style={{ ...styles.container }}>
        <List
          data={data}
          ListHeaderComponent={this.renderHeader}
          onEndReachedThreshold={0.98}
          onEndReached={this.onReachedEnd}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={this.emptyComponent}
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
    searchKey: state.globalSearchUi.searchKey,
    skip: state.globalSearchUi.skip,
    activeTab: state.globalSearchUi.activeTab,
    loading: state.searchUser.loading,
    total:
      state.searchUser.pagination?.total || state.searchUser.order.length || 0,
    user: state.searchUser.order,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setSkip }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserResult)
