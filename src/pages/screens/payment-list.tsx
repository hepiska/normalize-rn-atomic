import React, { Component } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Field from '@components/atoms/field'
import { getAllTransaction } from '@modules/transaction/action'
import PaymentCard from '@components/molecules/payment-card'
import { capilEachWord } from '@utils/helpers'
import { colors } from '@utils/constants'
import { transactionListData } from '@hocs/data/payment'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchFilter from '@components/organisms/search-filter'

const PayMentCardWithData = transactionListData(PaymentCard)

class OrderList extends Component<any, any> {
  state = {
    searchKey: '',
    selectedFilter: this.props.filterOptions,
  }
  timeout = null
  limit = 5
  skip = 0
  lastskip = 0

  componentDidMount() {
    this._freshfetch()
  }

  _selectFilter = item => {
    let selectedFilter = [...this.state.selectedFilter]
    if (item.value === 'all') {
      selectedFilter = this.props.filterOptions
    } else {
      selectedFilter = [item.value]
    }
    this.setState({ selectedFilter })
  }
  _onSearchChange = text => {
    if (this.timeout) {
      this.timeout = null
    }

    this.setState({ searchKey: text }, () => {
      this.timeout(() => {}, 500)
    })
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
  }

  _fetchData = skip => {
    const { searchKey, selectedFilter } = this.state
    const { route } = this.props
    let selectesStatus = selectedFilter.join(',')
    if (route.params?.hideHeader) {
      selectesStatus = route.params?.selectedFilter
    }

    this.props.getAllTransaction({
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
      status: selectesStatus,
    })
  }

  _renderFilter = () => {
    const { selectedFilter } = this.state
    const { filterOptions, route } = this.props
    if (route.params?.hideHeader) {
      return null
    }
    const options = [
      { name: 'All', value: 'all' },
      ...filterOptions.map(_filter => ({
        name: capilEachWord(_filter),
        value: _filter,
      })),
    ]

    return (
      <SearchFilter
        placeholder="Search With Invoice Number"
        selectedFilter={
          selectedFilter?.length === filterOptions.length
            ? ['all']
            : selectedFilter
        }
        onSearchChange={this._onSearchChange}
        onfilterSelected={this._selectFilter}
        filterItems={options}
        searchKey={this.state.searchKey}
      />
    )
  }
  _renderItem = ({ item }) => {
    return <PayMentCardWithData transactionId={item} />
  }
  _fetchMore = () => {
    if (!this.props.transactionLoading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.transactionLoading) {
        return
      }
      console.log('=====', this.skip)
      this._fetchData(this.skip)

      // if (30 > this.props.transactions.length) {
      //   this._fetchData(this.skip)
      // }
    }

    // if (!this.props.transactionLoading) {
    //   this.limit = this.limit + 1
    //   this._fetchData(this.limit)
    // }
  }

  _keyExtractor = (item, id) => `trans-${item} -${id}`
  render() {
    const { transactions, transactionLoading } = this.props
    return (
      <>
        <NavbarTop leftContent={['back']} title="Payment List" />
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ paddingTop: 12, paddingHorizontal: 16 }}
            onRefresh={this._freshfetch}
            refreshing={transactionLoading}
            ListHeaderComponent={this._renderFilter}
            data={transactions}
            onEndReached={this._fetchMore}
            onEndReachedThreshold={0.99}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    filterOptions: state.transaction.transactionStatus,
    transactions: state.transaction.order,
    transactionLoading: state.transaction.loading,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllTransaction }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
