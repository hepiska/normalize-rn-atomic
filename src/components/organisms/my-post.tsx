import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import { capilEachWord } from '@utils/helpers'
import SearchFilter from '@components/organisms/search-filter'

const { width, height } = Dimensions.get('screen')

class MyPost extends React.Component<any, any> {
  state = {
    selectedFilter: this.props.userPostStatus,
  }
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
      <SearchFilter
        style={{ marginVertical: 8 }}
        selectedFilter={displayedSelected}
        filterItems={this.filteritem}
      />
    )
  }

  render() {
    return (
      <View style={{ width, paddingHorizontal: 16 }}>
        <List data={[]} header={this._header} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ userPostStatus: state.userPosts.status })
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyPost)
