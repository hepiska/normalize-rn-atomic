import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  RefreshControl,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import Amplitude from 'amplitude-js'
import { capitalEachWord } from '@utils/helpers'
import { fetchFeed } from '@modules/post-feed/action'
import PostCard from '@src/components/molecules/post-card-collection'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import TopInsider from '@components/organisms/insider-top'
import Toast from '@components/molecules/toast'
import ProductTrending from '@components/organisms/product-trending'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import { colors } from '@utils/constants'
import { Instagram } from 'react-content-loader/native'
import PostCardFull from '@components/atoms/loaders/post-card-full'

const PostItem = postListData(PostCard)

const styles = StyleSheet.create({
  itemStyle: {
    //condition styles for vertical post-card-collection
    paddingBottom: 16,
    marginBottom: 32,
    //condition styles for vertical post-card-journal
    // marginBottom: 32,
    // width: '100%',
    // borderBottomColor: colors.black50,
    // borderBottomWidth: 1,
  },
})

const { width, height } = Dimensions.get('screen')

class FeedOrg extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
    finishAnimation: false,
  }

  limit = 5
  skip = 0
  lastskip = 0

  componentDidMount() {
    Amplitude.getInstance().logEvent('feed')
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshfetch()
    })
  }

  _fetchData = (skip, next_token) => {
    const params: any = {
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
      next_token,
    }

    this.props.fetchFeed(params)
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.transactionLoading) {
        return
      }
      this._fetchData(this.skip, this.props.pagination.next_token)
    }
  }

  _selectFilter = item => {
    let selectedFilter = [...this.state.selectedFilter]
    if (item.value === 'all') {
      selectedFilter = this.props.userPostStatus
    } else {
      selectedFilter = [item.value]
    }
    this.setState({ selectedFilter }, () => {
      this._freshfetch()
    })
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip, null)
  }

  _emptyState = () => (
    <EmtyState
      title={`No Post`}
      description="You Dont Have Post in this Section"
    />
  )

  _renderItem = ({ item, index }) => {
    if (index === 3) {
      return (
        <View>
          {/* <TopInsider navigation={this.props.navigation} /> */}
          <PostItem
            style={styles.itemStyle}
            key={`horizontal-list-post-${index}`}
            postId={item}
            idx={index}
          />
        </View>
      )
    }
    if (index === 6) {
      return (
        <View>
          {/* <HorizontalListLookBook navigation={this.props.navigation} /> */}

          <PostItem
            style={styles.itemStyle}
            key={`horizontal-list-post-${index}`}
            fullscreen
            postId={item}
            idx={index}
          />
        </View>
      )
    }

    if (index === 9) {
      return (
        <View>
          <ProductTrending navigation={this.props.navigation} />
          <PostItem
            style={styles.itemStyle}
            key={`horizontal-list-post-${index}`}
            fullscreen
            postId={item}
            idx={index}
          />
        </View>
      )
    }

    return (
      <PostItem
        style={styles.itemStyle}
        key={`horizontal-list-post-${index}`}
        fullscreen
        postId={item}
        idx={index}
      />
    )
  }

  _hanleScroll = e => {
    if (e.nativeEvent.contentOffset.y < 2) {
      this.props.disableScroll && this.props.disableScroll()
    }
  }

  _renderFooterLoader = () => {
    const { loading } = this.props
    return (
      <View
        style={{
          height: 300,
          width: '100%',
        }}>
        {loading && <PostCardFull />}
      </View>
    )
  }

  _refreshControl = () => {
    const { loading } = this.props
    const firstLoading = loading && !this.skip
    return (
      <RefreshControl onRefresh={this._freshfetch} refreshing={firstLoading} />
    )
  }

  render() {
    const { posts, scrollEnabled, loading } = this.props
    const firstLoading = loading && !this.skip
    return (
      <View
        style={{
          width,
          flex: 1,
          backgroundColor: colors.white,
        }}>
        {this.state.finishAnimation && firstLoading ? (
          <PostCardFull />
        ) : (
          <>
            <List
              data={posts}
              loading={loading}
              refreshControl={
                <RefreshControl
                  onRefresh={this._freshfetch}
                  refreshing={firstLoading}
                />
              }
              onScroll={this._hanleScroll}
              onEndReached={this._fetchMore}
              scrollEnabled={scrollEnabled}
              ListEmptyComponent={this._emptyState}
              layoutType="list"
              columnStyle={{ flex: 1, marginHorizontal: 8 }}
              numColumns={2}
              ListFooterComponent={this._renderFooterLoader}
              renderItem={this._renderItem}
            />
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.feed.order,
  loading: state.feed.loading,
  pagination: state.feed.pagination,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFeed }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FeedOrg)
