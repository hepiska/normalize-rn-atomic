import React from 'react'
import { View, Text, Dimensions, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchFilter from '@components/organisms/search-filter'
import MyScore from '@components/organisms/my-score'
import MyContent from '@components/organisms/my-content'
import MyAudience from '@components/organisms/my-audience'
import MyRevenue from '@components/organisms/my-revenue'
import dayjs from 'dayjs'
import { getInsightSummary } from '@modules/insights/action'

const { width } = Dimensions.get('screen')

class MyInsight extends React.Component<any, any> {
  state = {
    selectedFilter: ['score'],
  }
  filterOptions = [
    { name: 'My Score', value: 'score' },
    { name: 'Content', value: 'content' },
    { name: 'Audience', value: 'audience' },
    { name: 'Revenue', value: 'revenue' },
  ]

  componentDidMount() {
    const end = dayjs().format('YYYY-MM-DD')
    const start = dayjs()
      .subtract(7, 'day')
      .format('YYYY-MM-DD')
    const params = {
      start,
      end,
      insider_progress: '',
    }
    this.props.getInsightSummary(params)
  }

  _selectFilter = item => {
    let selectedFilter = [...this.state.selectedFilter]

    selectedFilter = [item.value]
    this.setState({ selectedFilter })
  }

  _header = () => {
    const { selectedFilter } = this.state

    return (
      <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
        <SearchFilter
          key="my-insight-filter"
          style={{ marginVertical: 8 }}
          selectedFilter={selectedFilter}
          onfilterSelected={this._selectFilter}
          filterItems={this.filterOptions}
        />
      </View>
    )
  }
  handleScroll = e => {
    if (e.nativeEvent.contentOffset.y < 2) {
      this.props.disableScroll && this.props.disableScroll()
    }
  }

  renderItem = () => {
    const { selectedFilter } = this.state
    const { user } = this.props
    const selected = selectedFilter[0]
    switch (selected) {
      case 'score':
        return <MyScore />
      case 'content':
        return <MyContent />
      case 'audience':
        return <MyAudience user={user} />
      case 'revenue':
        return <MyRevenue />
      default:
        return null
    }
  }
  render() {
    const { scrollEnabled } = this.props
    return (
      <View style={{ width, flex: 1 }}>
        {this._header()}
        <ScrollView
          key="my-post-list"
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={this.handleScroll}
          style={{ paddingHorizontal: 16 }}>
          {this.renderItem()}
        </ScrollView>
        <View style={{ height: 170 }} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data[state.auth.data.user.id] || state.auth.data.user,
  insights: state.insights.data,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getInsightSummary }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyInsight)
