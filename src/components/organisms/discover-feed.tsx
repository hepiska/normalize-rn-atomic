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
import PostListItem from '@src/components/molecules/post-card'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import TopInsider from '@components/organisms/insider-top'
import Toast from '@components/molecules/toast'
import ProductTrending from '@components/organisms/product-trending'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import { colors } from '@utils/constants'
import { Instagram } from 'react-content-loader/native'
import PostCardFull from '@components/atoms/loaders/post-card-full'
import HorizontalList from './horizontal-list'
import { fetchRecommendedUser } from '@src/modules/user/action'
import { makeGetRecommendedUserOrder } from '@src/modules/user/selector'
import { getTrendingProduct } from '@src/modules/product/action'
import { productListData } from '@src/hocs/data/product'
import ProductCard from '@components/molecules/product-card-new'
import {
  makeGetRecommendedBeautyOrder,
  makeGetRecommendedFashionOrder,
} from '@src/modules/product/selector'
import { Font } from '../atoms/basic'
import { fontStyle } from '../commont-styles'

const PostItem = postListData(PostListItem)

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  itemStyle: {
    width: '100%',
    paddingBottom: 16,
  },
  productCard: {
    width: width / 2 - 16,
    minHeight: 220,
    margin: 8,
  },
  productWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

  _fetchUserRecommendation = () => {
    this.props.fetchRecommendedUser()
  }

  _fetchProductRecommendation = type => {
    this.props.getTrendingProduct(
      {
        limit: 6,
        offset: 0,
      },
      type,
    )
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
    // user recommendation, beauty product recommendation, and fashion product recommendation
    this._fetchUserRecommendation()
    this._fetchProductRecommendation('fashion')
    this._fetchProductRecommendation('beauty')
  }

  _emptyState = () => (
    <EmtyState
      title={`No Post`}
      description="You Dont Have Post in this Section"
    />
  )

  _renderItem = ({ item, index }) => {
    const {
      recommendedUserOrder,
      recommendedBeautyOrder,
      recommendedFashionOrder,
    } = this.props
    if (index === 3) {
      return (
        <View>
          {/* <TopInsider navigation={this.props.navigation} /> */}
          <PostItem
            style={styles.itemStyle}
            key={`horizontal-list-post-${index}`}
            fullscreen
            postId={item}
            idx={index}
          />
          {/* notes: recommended user horizontal list here using recommendedUserOrder */}
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
          <Font
            size={24}
            fontFamily={fontStyle.playfairBold.fontFamily}
            textAlign="center"
            _margin="20px 0px 25px 0px">
            Recommended Fashion Product
          </Font>
          <View style={styles.productWrapper}>
            {recommendedFashionOrder.map((_item, _index) => {
              return (
                <ProductWithCardHoc
                  productId={_item}
                  key={'feed-prod-fashion-list' + _item + _index}
                  style={styles.productCard}
                />
              )
            })}
          </View>
        </View>
      )
    }

    if (index === 9) {
      return (
        <View>
          {/* <ProductTrending navigation={this.props.navigation} /> */}
          <PostItem
            style={styles.itemStyle}
            key={`horizontal-list-post-${index}`}
            fullscreen
            postId={item}
            idx={index}
          />
          <Font
            size={24}
            fontFamily={fontStyle.playfairBold.fontFamily}
            textAlign="center"
            _margin="20px 0px 25px 0px">
            Recommended Beauty Product
          </Font>
          <View style={styles.productWrapper}>
            {recommendedBeautyOrder.map((_item, _index) => {
              return (
                <ProductWithCardHoc
                  productId={_item}
                  key={'feed-prod-beauty-list' + _item + _index}
                  style={styles.productCard}
                />
              )
            })}
          </View>
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
          backgroundColor: colors.black10,
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
  recommendedUserOrder: makeGetRecommendedUserOrder()(state),
  recommendedBeautyOrder: makeGetRecommendedBeautyOrder()(state),
  recommendedFashionOrder: makeGetRecommendedFashionOrder()(state),
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchFeed, fetchRecommendedUser, getTrendingProduct },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(FeedOrg)
