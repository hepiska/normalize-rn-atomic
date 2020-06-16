import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import { capitalEachWord } from '@utils/helpers'
import { getUserPosts } from '@modules/user-post/action'
import { fetchDicover } from '@modules/post-discover/action'
import PostListItem from '@src/components/molecules/post-card-new'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import { colors } from '@utils/constants'
import SearchFilter from '@components/organisms/search-filter'
import TwoColumnListLoader from '@components/atoms/loaders/two-column-card'

const PostItem = postListData(PostListItem)

const { width, height } = Dimensions.get('screen')

class DiscoverOrg extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
    isWaitfilter: false,
  }

  limit = 15
  skip = 0
  lastskip = 0

  componentDidMount() {
    this._freshfetch()
  }

  _fetchData = (skip, next_token) => {
    const params: any = {
      limit: this.limit,
      next_token,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
    }

    this.props.fetchDicover(params)
  }

  filterOptions = [
    { value: 'posts', name: 'Posts' },
    { name: 'Product', value: 'products' },
    { name: 'Photos', value: 'photo' },
    { name: 'Jurnals', value: 'jurnal' },
    { name: 'Articles', value: 'article' },
    { name: 'Collections', value: 'collection' },
  ]

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
    this.setState({ selectedFilter, isWaitfilter: false }, () => {
      this._freshfetch()
    })
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip, null)
  }

  _emptyState = () => {
    return (
      <EmtyState
        title={`No Post`}
        description="You Dont Have Post in this Section"
      />
    )
  }

  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        style={{ marginBottom: 16 }}
        key={`horizontal-list-post-${index}`}
        postId={item}
        idx={index}
      />
    )
  }
  _filterCliked = () => {
    this.setState({ isWaitfilter: true })
  }
  _header = () => {
    const { selectedFilter } = this.state

    return (
      <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
        <SearchFilter
          onfilterClicked={this._filterCliked}
          style={{ marginBottom: 16 }}
          itemStyle={{ backgroundColor: 'white' }}
          selectedFilter={selectedFilter}
          onfilterSelected={this._selectFilter}
          filterItems={this.filterOptions}
        />
      </View>
    )
  }
  _hanleScroll = e => {
    if (e.nativeEvent.contentOffset.y < 2) {
      this.props.disableScroll && this.props.disableScroll()
    }
  }
  _renderfooter = () => {
    const { loading } = this.props
    // const firsLoading = loading && !this.skip
    if (loading) {
      return <TwoColumnListLoader />
    }
    return null
  }

  render() {
    const { posts, scrollEnabled, loading } = this.props
    const { isWaitfilter } = this.state
    const firsLoading = (loading || isWaitfilter) && !this.skip
    // const data = firsLoading && isWaitfilter ? [] : posts
    return (
      <View
        style={{
          width,
          flex: 1,
          paddingTop: 4,
          backgroundColor: colors.white,
        }}>
        {firsLoading && (
          <View
            style={{
              width,
              height,
              position: 'absolute',
              top: 62,
              left: 0,
              backgroundColor: colors.white,
              zIndex: 200,
            }}>
            <TwoColumnListLoader />
          </View>
        )}

        <List
          data={posts}
          loading={loading}
          style={{ paddingTop: 8 }}
          onScroll={this._hanleScroll}
          onEndReached={this._fetchMore}
          scrollEnabled={scrollEnabled}
          rowStyle={{ paddingHorizontal: 8 }}
          ListEmptyComponent={this._emptyState}
          renderFooter={this._renderfooter}
          layoutType="mansory"
          ListHeaderComponent={this._header}
          columnStyle={{ flex: 1, marginHorizontal: 8 }}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 200 }} />}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userPostStatus: state.userPosts.status,
  posts: state.discover.order,
  pagination: state.discover.pagination,
  loading: state.discover.loading,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchDicover }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverOrg)
