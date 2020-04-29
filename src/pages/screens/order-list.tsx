import React, { Component } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Field from '@components/atoms/field'
import {
  changeFilter,
  changeSearchKey,
  getAllOrder,
} from '@modules/order/action'
import { capilEachWord } from '@utils/helpers'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchFilter from '@components/organisms/search-filter'
import { orderListData } from '@hocs/data/order'
import OrderCard from '@components/molecules/order-card'
import InviniteLoader from '@components/atoms/loaders/invinite'
import OrderEmptyState from '@src/components/molecules/order-empty-state'

const OrderHoc = orderListData(OrderCard)

class OrderList extends Component<any, any> {
  state = {
    searchKey: '',
    selectedFilter:
      [this.props.route.params.selectedFilter] || this.props.filterOptions,
  }
  timeout = null
  limit = 5
  skip = 0
  lastSkip = 0

  componentDidMount() {
    this._freshfetch()
  }

  _selectFilter = item => {
    let _selectedFilter = [...this.state.selectedFilter]
    if (item.value === 'all') {
      _selectedFilter = this.props.filterOptions
    } else {
      _selectedFilter = [item.value]
    }
    this.setState({ selectedFilter: _selectedFilter }, () => this._freshfetch())
  }
  _onSearchChange = text => {
    this.setState({ searchKey: text })
  }

  _freshfetch = () => {
    this.skip = 0
    this._fetchData(this.skip)
  }

  _fetchData = skip => {
    const { searchKey, selectedFilter } = this.state

    let selectedStatus = selectedFilter.join(',')

    const params = {
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
      status: selectedStatus,
    }

    if (searchKey !== '') {
      params['invoice_no'] = searchKey
    }

    this.props.getAllOrder({ ...params })
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newSkip = this.skip + 1
      if (newSkip > this.lastSkip) {
        this.skip = newSkip
        this.lastSkip = newSkip
      }

      if (this.props.loading) {
        return
      }

      if (30 > this.props.orders.length) {
        this._fetchData(this.skip)
      }
    }
  }

  submitEditing = () => {
    this._freshfetch()
  }

  _renderFilter = () => {
    const { selectedFilter } = this.state
    const { filterOptions } = this.props
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
        inputProps={{
          onSubmitEditing: this.submitEditing,
        }}
      />
    )
  }
  _renderItem = ({ item, index }) => {
    return (
      <OrderHoc
        orderId={item}
        style={{
          width: '100%',
        }}
      />
    )
  }

  _emptyComponent = () => {
    return (
      <View>
        <OrderEmptyState />
      </View>
    )
  }

  _keyExtractor = (item, index) => '' + item + index
  render() {
    const { orders } = this.props
    return (
      <>
        <NavbarTop leftContent={['back']} title="Order List" />
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            style={{ paddingHorizontal: 16, paddingTop: 12 }}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={this._renderFilter()}
            data={orders}
            renderItem={this._renderItem}
            onEndReached={this._fetchMore}
            onEndReachedThreshold={0.99}
            ListEmptyComponent={this._emptyComponent}
          />
          {/* {this.props.loading && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                justifyContent: 'center',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                height: 64,
              }}>
              <InviniteLoader />
            </View>
          )} */}
        </View>
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    filterOptions: state.orders.orderStatuses,
    orders: state.orders.order,
    loading: state.orders.loading,
    pagination: state.orders.pagination,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllOrder }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
