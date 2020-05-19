import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import { capilEachWord } from '@utils/helpers'
import SearchFilter from '@components/organisms/search-filter'
import { getUserPosts } from '@modules/user-post/action'
import PostListItem from '@components/molecules/post-cart-new'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'

const PostItem = postListData(PostListItem)

const { width, height } = Dimensions.get('screen')

class MyPost extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
  }

  limit = 5
  skip = 0
  lastskip = 0

  componentDidMount() {
    this._freshfetch()
  }

  _fetchData = skip => {
    const { selectedFilter } = this.state
    let selectedStatus = selectedFilter.join(',')

    this.props.getUserPosts({
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
      status: selectedStatus,
    })
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
      this._fetchData(this.skip)
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
    this._fetchData(this.skip)
  }

  _emptyState = () => (
    <EmtyState
      title={`No Post`}
      description="You Dont Have Post in this Section"
    />
  )
  filteritem = [
    { value: 'all', name: 'All Posts' },
    ...this.props.userPostStatus.map(_data => ({
      value: _data,
      name: capilEachWord(_data),
    })),
  ]
  _header = () => {
    const { selectedFilter } = this.state
    const displayedSelected =
      selectedFilter?.length === this.props.userPostStatus.length
        ? ['all']
        : selectedFilter

    return (
      <View style={{ backgroundColor: 'white' }}>
        <SearchFilter
          style={{ marginVertical: 8 }}
          selectedFilter={displayedSelected}
          onfilterSelected={this._selectFilter}
          filterItems={this.filteritem}
        />
      </View>
    )
  }
  _renderItem = ({ item, index }) => {
    return (
      <PostItem
        style={{ width: '100%', marginVertical: 8 }}
        key={`horizontal-list-post-${index}`}
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

  render() {
    const { posts, scrollEnabled } = this.props
    return (
      <View style={{ width }}>
        <List
          data={posts}
          onScroll={this._hanleScroll}
          style={{ paddingHorizontal: 8 }}
          onEndReached={this._fetchMore}
          scrollEnabled={scrollEnabled}
          ListEmptyComponent={this._emptyState}
          layoutType="mansory"
          columnStyle={{ flex: 1, marginHorizontal: 8 }}
          numColumns={2}
          header={this._header}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userPostStatus: state.userPosts.status,
  posts: state.userPosts.order,
  loading: state.userPosts.loading,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyPost)
