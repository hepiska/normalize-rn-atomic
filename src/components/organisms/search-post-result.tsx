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
import EmptyState from '@components/molecules/order-empty-state'
import SearchPostLoader from '@components/atoms/loaders/search-post-loader'
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
    height: 100,
    width: '100%',
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
  skip?: number
  tag?: Array<string>
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

  componentWillUnmount() {
    if (this.props.isTagSearch) {
      this.props.onSearchChange('')
      this.props.clearSearchPost()
    }
  }

  onReachEnd = () => {
    const { loading, fetchMore } = this.props
    if (!loading) {
      fetchMore()
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
    const title = searchKey.length > 2 ? 'No User' : 'Please Fill keyword'
    const desc =
      searchKey.length > 2
        ? 'We Dont find any user for this Keyword'
        : 'Please Fill keyword'
    return <EmptyState title={title} description={desc} />
  }

  _renderFooterLoader = () => {
    return (
      <View style={styles.containerFooterLoader}>
        <SearchPostLoader
          style={{ marginHorizontal: 16, marginVertical: 32 }}
        />
      </View>
    )
  }

  render() {
    const { searchKey, style, post, loading } = this.props
    const data = searchKey.length > 2 ? post : []
    return (
      <View style={{ ...styles.container, ...style }}>
        <List
          key="my-post-result"
          style={{ flex: 1 }}
          data={data}
          loading={loading}
          header={this.renderHeader}
          onEndReachedThreshold={0.99}
          onEndReached={this.onReachEnd}
          ListEmptyComponent={this.emptyState}
          ListFooterComponent={this._renderFooterLoader}
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
      clearSearchPost,
      setTagSearch,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    post: state.searchPost.order,
    loading: state.searchPost.loading,
    total:
      state.searchPost.pagination?.total || state.searchPost.order.length || 0,
    tag: state.searchPost.tagData,
    isTagSearch: state.searchPost.isTagSearch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPostResult)
