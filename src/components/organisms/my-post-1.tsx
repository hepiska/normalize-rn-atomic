import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import { capitalEachWord } from '@utils/helpers'
import SearchFilter from '@components/organisms/search-filter'
import { getUserPosts } from '@modules/user-post/action'
import PostListItem from '@src/components/molecules/post-card'
import { postListData } from '@hocs/data/post'
import EmtyState from '@components/molecules/order-empty-state'
import PostLoader from '@components/atoms/loaders/post-card'

const PostItem = postListData(PostListItem)

const { width, height } = Dimensions.get('screen')

class MyPost extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
  }

  limit = 20
  skip = 0
  lastskip = 0

  componentDidMount() {
    this._freshfetch()
  }

  _fetchData = skip => {
    const { selectedFilter } = this.state
    let selectedStatus = selectedFilter[0]
    const params: any = {
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
    }

    if (
      selectedStatus === 'published' ||
      selectedStatus === 'draft' ||
      selectedStatus === 'archived'
    ) {
      params.status = selectedStatus
    }

    if (
      selectedStatus === 'instagram' ||
      selectedStatus === 'article' ||
      selectedStatus === 'collection' ||
      selectedStatus === 'youtube'
    ) {
      params.type = selectedStatus
    }

    this.props.getUserPosts(params)
  }

  _fetchMore = () => {
    if (!this.props.loading && !this.props.isEndReached) {
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
      name: capitalEachWord(_data),
    })),
    { name: 'Photos', value: 'photo' },
    { name: 'Jurnals', value: 'jurnal' },
    { name: 'Articles', value: 'article' },
    { name: 'Collections', value: 'collection' },
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
          key="my-post-filter"
          style={{ marginVertical: 8, marginLeft: 8 }}
          itemStyle={{ paddingVertical: 8, paddingHorizontal: 12 }}
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

  render() {
    const { posts, loading, y, style, getListRef, ...props } = this.props
    return (
      <View style={{ flex: 1, ...style }}>
        <List
          getListRef={getListRef}
          data={posts}
          key="my-post-list"
          y={y}
          mansoryLoader={<PostLoader />}
          refreshing={loading}
          onRefresh={() => {}}
          style={{ paddingHorizontal: 8 }}
          onEndReached={this._fetchMore}
          nestedScrollEnabled={true}
          ListEmptyComponent={this._emptyState}
          layoutType="mansory"
          columnStyle={{ flex: 1, marginHorizontal: 8 }}
          numColumns={2}
          header={this._header}
          ListFooterComponent={<View style={{ height: 40 }} />}
          renderItem={this._renderItem}
          {...props}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userPostStatus: state.userPosts.status,
  posts: state.userPosts.order,
  isEndReached: state.userPosts.isEndReached,
  loading: state.userPosts.loading,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyPost)
