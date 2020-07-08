import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import PostCard from '@components/molecules/post-card'
import { searchPostListData } from '@hocs/data/post'
import List from '@components/layouts/list-header'
import Pill from '@components/atoms/pill'
import {
  getSearchPost,
  clearSearchPost,
  setTagSearch,
} from '@src/modules/search-post/action'
import { resetSkip, setSkip } from '@modules/global-search-ui/action'

import EmptyState from '@components/molecules/order-empty-state'
import SearchPostLoader from '@components/atoms/loaders/search-post-loader'
import PostListLoader from '@components/atoms/loaders/post-card-list'
import PostLoader from '@components/atoms/loaders/post-card'
import { dispatch } from '@src/root-navigation'
import { StackActions } from '@react-navigation/native'

const PostHoc = searchPostListData(PostCard)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  tagResult: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  tagResultText: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
    color: colors.black80,
  },
  pills: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black50,
    backgroundColor: colors.black10,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  pillsText: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  containerFooterLoader: {
    height: 300,
    marginTop: 80,
    backgroundColor: 'transparent',
  },
})

interface SearchPostType {
  style?: any
  searchKey?: string
  post?: any
  loading?: boolean
  fetchMore?: () => void
  total?: number
  activeTab?: number
  skip?: {}
  tag?: Array<string>
  setSkip: (skip: any) => void
  isTagSearch?: boolean
  setTagSearch?: (data: boolean) => void
  onSearchChange?: (text: string) => void
  resetSkip?: (activeTab: number) => void
  clearSearchPost?: () => void
}

class SearchPostResult extends Component<SearchPostType, any> {
  skip = 0
  lastSkip = 0
  limit = 10

  componentWillUnmount() {
    if (this.props.isTagSearch) {
      this.props.onSearchChange('')
      this.props.clearSearchPost()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.total !== nextProps.total ||
      this.props.activeTab !== nextProps.activeTab ||
      this.props.loading !== nextProps.loading ||
      this.props.post.length !== nextProps.post.length ||
      this.props.searchKey !== nextProps.searchKey
    ) {
      return true
    }
    return false
  }
  _handlePress = postId => () => {
    dispatch(StackActions.replace('PostDetail', { postId }))
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostHoc
        style={{ marginBottom: 16 }}
        key={`search-post-${index}`}
        postId={item}
        idx={index}
        onPress={this._handlePress(item)}
      />
    )
  }

  onReachEnd = () => {
    const { loading, skip, activeTab } = this.props
    const newSkip = { ...skip }
    if (!loading) {
      newSkip[activeTab] += 1

      this.props.setSkip(newSkip)
    }
  }

  onTagPress = item => () => {
    const { isTagSearch, setTagSearch, onSearchChange, resetSkip } = this.props
    setTagSearch(!isTagSearch)
    onSearchChange('#' + item)
    resetSkip(3)
  }

  renderHeader = () => {
    const { searchKey, total, tag, isTagSearch } = this.props

    if (!searchKey) return null

    return (
      <>
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
        {!isTagSearch ? (
          <View style={styles.tagResult}>
            <Text style={styles.tagResultText}>Tag Result</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEnabled
                horizontal>
                {tag.map((item, key) => (
                  <Pill
                    key={`tag-post-${key}`}
                    title={item}
                    style={styles.pills}
                    item={<Text style={styles.pillsText}>{`#${item}`}</Text>}
                    onPress={this.onTagPress(item)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={{ paddingVertical: 10, backgroundColor: 'white' }} />
        )}
      </>
    )
  }

  emptyState = () => {
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
        img={require('@src/assets/placeholder/empty-post.png')}
      />
    )
  }

  _renderFooterLoader = () => {
    const { searchKey, style, post, loading, skip } = this.props
    const firsLoading = loading && skip < 3
    return (
      <View style={styles.containerFooterLoader}>
        {firsLoading && (
          <PostListLoader style={{ marginTop: 16, marginHorizontal: 16 }} />
        )}
      </View>
    )
  }

  render() {
    const { searchKey, style, post, loading, skip } = this.props
    const data = searchKey.length > 2 ? post : []

    return (
      <View style={{ ...styles.container, ...style }}>
        <List
          key="my-post-result"
          style={{ flex: 1 }}
          data={data}
          loading={loading}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this._renderFooterLoader}
          onEndReachedThreshold={0.99}
          onEndReached={this.onReachEnd}
          ListEmptyComponent={this.emptyState}
          mansoryLoader={<PostLoader />}
          rowStyle={{ paddingHorizontal: 8, flex: 1 }}
          layoutType="mansory"
          columnStyle={{ flex: 1, marginHorizontal: 8 }}
          numColumns={2}
          renderItem={this._renderItem}
          nestedScrollEnabled={true}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchPost,
      resetSkip,
      clearSearchPost,
      setTagSearch,
      setSkip,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    searchKey: state.globalSearchUi.searchKey,
    skip: state.globalSearchUi.skip,
    activeTab: state.globalSearchUi.activeTab,
    post: state.searchPost.order,
    loading: state.searchPost.loading,
    total:
      state.searchPost.pagination?.total || state.searchPost.order.length || 0,
    tag: state.searchPost.tagData,
    isTagSearch: state.searchPost.isTagSearch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPostResult)
