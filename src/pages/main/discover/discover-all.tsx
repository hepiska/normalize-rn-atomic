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
import PostTop from './post-top'

interface DiscoverAllType {
  page?: any
  loading?: boolean
  getPage?: (pagename: string, params?: any) => void
}

const { width } = Dimensions.get('screen')

class DiscoverAll extends React.PureComponent<DiscoverAllType, any> {
  state = {
    finishAnimation: false,
  }

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
    // console.log('render item', item)
    if (item.component === 'banner' && item.type === 'post') {
      return <PostTop posts={item.item_ids} />
    }
    return (
      <View>
        <Text>LOL</Text>
      </View>
    )
  }

  render() {
    const { page, loading } = this.props

    if (!this.state.finishAnimation || loading) {
      return <ShopLoader />
    }

    return (
      <View
        style={{
          width,
          flex: 1,
          backgroundColor: colors.white,
        }}>
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
              />
            }
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

const mapDispatchToProps = dispatch => bindActionCreators({ getPage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverAll)
