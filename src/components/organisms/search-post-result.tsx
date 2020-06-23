import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import SearchResultCard from '../molecules/search-result-card'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import PostCard from '@components/molecules/post-card'
import { postListData } from '@hocs/data/post'
import List from '@components/layouts/list-header'
import Pill from '@components/atoms/pill'
import PostLoader from '@components/atoms/loaders/post-card'
import { getSearchPost, clearSearchPost } from '@src/modules/search-post/action'

const PostHoc = postListData(PostCard)

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchPostType {
  style?: any
  searchKey?: string
  post?: any
  loading?: boolean
  isEndReached?: boolean
  onSearchChange?: (text: string) => void
  getSearchPost?: (params: Object) => void
  clearSearchPost?: () => void
  pagination?: any
}

const dummy = ['bajutidur', 'baju', 'bajurenang', 'bajusantai', 'bajajbajuri']

class SearchPostResult extends Component<SearchPostType, any> {
  skip = 0
  lastSkip = 0
  limit = 10

  componentWillUnmount() {
    this.skip = 0
    this.lastSkip = 0

    this.props.clearSearchPost()
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostHoc
        style={{ marginBottom: 16 }}
        key={`search-post-${index}`}
        postId={item}
        idx={index}
      />
    )
  }

  _fetchMore = () => {
    if (!this.props.loading && !this.props.isEndReached) {
      const newskip = this.skip + 1
      if (newskip > this.lastSkip) {
        this.skip = newskip
        this.lastSkip = newskip
      }
      if (this.props.loading) {
        return
      }
      this._fetchData(this.skip)
    }
  }

  _fetchData = skip => {
    const params = {
      query: this.props.searchKey,
      limit: this.limit,
      // offset: this.limit * skip,
      offset: this.props.pagination?.offset || 0,
    }

    this.props.getSearchPost(params)
  }

  changeSearchKey = text => () => {
    this.props.onSearchChange(text)
  }
  render() {
    const { searchKey, style, post, loading, pagination } = this.props
    return (
      <View style={{ ...styles.container, ...style }}>
        {searchKey !== '' && (
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
                    <Text
                      style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
                  </Text>
                }
                rightContent={
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      color: colors.black70,
                    }}>
                    {`${pagination?.total || 0} items`}
                  </Text>
                }
                style={{
                  backgroundColor: colors.black50,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
              />
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
              <Text
                style={{
                  ...fontStyle.helveticaBold,
                  fontSize: 12,
                  color: colors.black80,
                }}>
                Tag Result
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled
                  horizontal>
                  {dummy.map((item, key) => (
                    <Pill
                      key={`tag-post-${key}`}
                      title={item}
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: colors.black50,
                        backgroundColor: colors.black10,
                        marginRight: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 8,
                      }}
                      item={
                        <Text style={{ ...fontStyle.helvetica, fontSize: 14 }}>
                          {`#${item}`}
                        </Text>
                      }
                      onPress={this.changeSearchKey(item)}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <List
              data={post}
              loading={loading}
              style={{ paddingTop: 8 }}
              mansoryLoader={<PostLoader />}
              scrollEnabled={true}
              rowStyle={{ paddingHorizontal: 8 }}
              layoutType="mansory"
              columnStyle={{ flex: 1, marginHorizontal: 8 }}
              numColumns={2}
              onEndReached={this._fetchMore}
              renderItem={this._renderItem}
              // onScroll={this._hanleScroll}
              // ListEmptyComponent={this._emptyState}
              // renderFooter={this._renderfooter}
              // ListFooterComponent={<View style={{ height: 200 }} />}
            />
          </>
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchPost,
      clearSearchPost,
    },
    dispatch,
  )
const mapStateToProps = state => ({
  post: state.searchPost.order,
  loading: state.searchPost.loading,
  isEndReached: state.searchPost.isEndReached,
  pagination: state.searchPost.pagination,
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchPostResult)
