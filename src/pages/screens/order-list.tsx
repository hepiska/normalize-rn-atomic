import React, { Component } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import { View, Text, FlatList, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Field from '@components/atoms/field'
import {
  changeFilter,
  changeSearchKey,
  getAllOrder,
} from '@modules/order/action'
import { capitalEachWord } from '@utils/helpers'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchFilter from '@components/organisms/search-filter'
import { orderListData } from '@hocs/data/order'
import OrderCard from '@components/molecules/order-card'
import OrderListLoader from '@components/atoms/loaders/one-column-card'
import OrderListPageLoader from '@components/atoms/loaders/order-list'
import OrderEmptyState from '@src/components/molecules/order-empty-state'
import OneColumnListLoader from '@components/atoms/loaders/one-column-card'

const OrderHoc = orderListData(OrderCard)

class OrderList extends Component<any, any> {
  constructor(props) {
    super(props)

    const selectedFilter =
      this.props.route.params && this.props.route.params.selectedFilter
        ? [this.props.route.params.selectedFilter]
        : this.props.filterOptions
    this.state = {
      searchKey: '',
      selectedFilter,
      finishAnimation: false,
    }
  }

  timeout = null
  limit = 5
  skip = 0
  lastSkip = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._freshfetch()
    })
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
    this.lastSkip = 0
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
      this._fetchData(this.skip)
      // if (30 > this.props.orders.length) {
      //   this._fetchData(this.skip)
      // }
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
        name: capitalEachWord(_filter),
        value: _filter,
      })),
    ]

    return (
      <SearchFilter
        itemStyle={{ paddingVertical: 8, paddingHorizontal: 12 }}
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
    const style: any = {}

    if (index === 0) {
      style.marginTop = 0
    }

    return <OrderHoc orderId={item} style={style} />
  }

  _emptyComponent = () => {
    return (
      <OrderEmptyState
        title="No Order yet..."
        description="Let’s find out product you love at shop page"
      />
    )
  }
  _renderFooter = () => {
    const { loading, orders } = this.props
    if (orders.length < 6) {
      return null
    }

    return (
      <View style={{ height: 360, marginVertical: 32 }}>
        {loading && this.skip !== 0 && <OneColumnListLoader />}
      </View>
    )
  }

  _keyExtractor = (item, index) => '' + item + index
  render() {
    const { orders } = this.props
    const { finishAnimation } = this.state

    return (
      <>
        <NavbarTop
          leftContent={['back']}
          title="Order List"
          saveAreaStyle={{ backgroundColor: 'white' }}
        />
        {finishAnimation ? (
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
              ListFooterComponent={this._renderFooter}
              scrollIndicatorInsets={{ right: 1 }}
            />
          </View>
        ) : (
          <OrderListPageLoader style={{ margin: 16 }} />
        )}
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
