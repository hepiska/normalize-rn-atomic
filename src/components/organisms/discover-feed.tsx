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
import PostCardJournal from '@src/components/molecules/post-card-journal'
import PostCardCollection from '@src/components/molecules/post-card-collection'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import TopInsider from '@components/organisms/insider-top'
import Toast from '@components/molecules/toast'
import ProductTrending from '@components/organisms/product-trending'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import { colors } from '@utils/constants'
import { Instagram } from 'react-content-loader/native'
import PostCardFull from '@components/atoms/loaders/post-card-full'
import { productListData } from '@src/hocs/data/product'
import ProductCard from '@components/molecules/product-card-new'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import RecommendList from '../molecules/recommend-follow-list'
import { makeGetFeedPosts } from '@src/modules/post/selector'
import ProductRecommendation from './product-recommendation'

const PostItemJournal = postListData(PostCardJournal)
const PostItemCollection = postListData(PostCardCollection)

const { width, height } = Dimensions.get('screen')

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
  productCard: {
    width: width / 2 - 16,
    minHeight: 220,
    margin: 8,
  },
  productWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
})

const ProductWithCardHoc = productListData(ProductCard)

class FeedOrg extends React.PureComponent<any, any> {
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

  _onPressBanner = () => {
    // notes: supposedly to social commerce page
    // this.props.navigation
  }

  _renderPostCard = (item, index) => {
    if (item.post_type === 'article') {
      // PostItem = postListData(PostCardJournal)
      return (
        <PostItemJournal
          style={styles.itemStyle}
          key={`horizontal-list-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
        />
      )
    } else if (item.post_type === 'collection') {
      // PostItem = postListData(PostCardCollection)
      return (
        <PostItemCollection
          style={styles.itemStyle}
          key={`horizontal-list-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
        />
      )
    } else {
      return (
        <PostItemJournal
          style={styles.itemStyle}
          key={`horizontal-list-post-${index}`}
          fullscreen
          postId={item.id}
          idx={index}
        />
      )
    }
  }

  _renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this._onPressBanner}>
            <ImageAutoSchale
              source={{
                uri:
                  'https://shonet.imgix.net/banners/sos-com-banner.jpeg?q=75&w=800',
              }}
              width={width}
            />
          </TouchableWithoutFeedback>
          {this._renderPostCard(item, index)}
        </View>
      )
    }
    if (index === 3) {
      return (
        <View>
          {/* <TopInsider navigation={this.props.navigation} /> */}
          {this._renderPostCard(item, index)}
          {/* notes: recommended user horizontal list here using recommendedUserOrder */}
          <RecommendList />
        </View>
      )
    }
    if (index === 6) {
      return (
        <View>
          {/* <HorizontalListLookBook navigation={this.props.navigation} /> */}
          {this._renderPostCard(item, index)}
          <ProductRecommendation
            category="fashion"
            title="Recommended Fashion Product"
          />
        </View>
      )
    }

    if (index === 9) {
      return (
        <View>
          {/* <ProductTrending navigation={this.props.navigation} /> */}
          {this._renderPostCard(item, index)}
          <ProductRecommendation
            category="beauty"
            title="Recommended Beauty Product"
          />
        </View>
      )
    }

    return this._renderPostCard(item, index)
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

const mapStateToProps = state => {
  // posts: state.feed.order,
  // NOTES: NEED CONFIRM WITH MAS EGO ABOUT PERFORMACE IMPACT
  const getFeedPosts = makeGetFeedPosts()
  return {
    posts: getFeedPosts(state),
    loading: state.feed.loading,
    pagination: state.feed.pagination,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFeed }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FeedOrg)
