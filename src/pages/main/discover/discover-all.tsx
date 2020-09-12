import React from 'react'
import {
  View,
  Text,
  InteractionManager,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Amplitude from 'amplitude-js'
import { makeGetDiscoverPage } from '@src/modules/page/selector'
import { getPage } from '@src/modules/page/action'
import ShopLoader from '@components/atoms/loaders/shop'
import List from '@components/layouts/list-header'
import { colors } from '@src/utils/constants'
import { setScroll } from '@src/modules/post-discover/action'
import PostTop from './post-top'
import PostMid from './post-mid'
import Banner from './banner'
import HorizontalList from '@components/organisms/horizontal-list'
import RecommendList from '@components/molecules/recommend-follow-list'

interface DiscoverAllType {
  page?: any
  loading?: boolean
  getPage?: (pagename: string, params?: any) => void
  navigation?: any
}

const { width } = Dimensions.get('screen')

class DiscoverAll extends React.PureComponent<any, any> {
  state = {
    finishAnimation: false,
  }

  offset = 0

  componentDidMount() {
    Amplitude.getInstance().logEvent('discover')
    InteractionManager.runAfterInteractions(() => {
      this._fetchData()
      this.setState({ finishAnimation: true })
    })
  }

  _fetchData = () => {
    this.props.getPage('discover')
  }

  _renderItem = ({ item, index }) => {
    if (item.component === 'banner' && item.type === 'post') {
      return (
        <PostTop key={`post-top-discover-all-${index}`} posts={item.item_ids} />
      )
    } else if (item.component === 'banner' && item.type === 'image') {
      return (
        <Banner key={`banner-discover-all-${index}`} banners={item.images} />
      )
    } else if (
      item.component === 'section-horizontal-list' &&
      item.type === 'product'
    ) {
      return (
        <HorizontalList
          key={`discover-${item.component}-${index}`}
          navigation={this.props.navigation}
          data={item}
          style={{
            marginBottom: 30,
          }}
        />
      )
    } else if (
      item.component === 'section-horizontal-list' &&
      item.type === 'post'
    ) {
      return <PostMid key={`post-mid-discover-all-${index}`} item={item} />
    } else if (
      item.component === 'section-horizontal-list' &&
      item.type === 'user'
    ) {
      return <RecommendList key={`recommend-list-discover-all-${index}`} />
    } else {
      return <View key={`discover-empty-${index}`} />
    }
  }

  _handleScroll = event => {
    // if (e.nativeEvent.contentOffset.y < 2) {
    //   this.props.disableScroll && this.props.disableScroll()
    // }
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = currentOffset > this.offset ? 'down' : 'up'
    if (currentOffset > 0) {
      this.props.setScroll(direction)
    }
    this.offset = currentOffset
  }

  render() {
    const { page, loading } = this.props

    return (
      <View
        style={{
          width,
          flex: 1,
          backgroundColor: colors.white,
        }}>
        {!this.state.finishAnimation || (loading && <ShopLoader />)}
        {page.section && (
          <List
            data={page.section}
            renderItem={this._renderItem}
            layoutType="list"
            columnStyle={{ flex: 1, marginHorizontal: 8 }}
            numColumns={2}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this._fetchData}
                style={{ marginTop: 45 }}
              />
            }
            onScroll={this._handleScroll.bind(this)}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const getDiscoverPage = makeGetDiscoverPage()
  return {
    page: getDiscoverPage(state),
    loading: state.page.loading.discover,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPage, setScroll }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverAll)
