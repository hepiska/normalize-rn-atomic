import React, { Component } from 'react'
import NavbarTop from '@components/molecules/navbar-top'
import { View, FlatList, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllTransaction } from '@modules/transaction/action'
import PaymentCard from '@components/molecules/payment-card'
import { capitalEachWord } from '@utils/helpers'
import { colors } from '@utils/constants'
import { transactionListData } from '@hocs/data/payment'
import SearchFilter from '@components/organisms/search-filter'
import OrderEmptyState from '@src/components/molecules/order-empty-state'
import { OutlineButton } from '@src/components/atoms/button'
import { fontStyle } from '@src/components/commont-styles'
import { navigate } from '@src/root-navigation'
import PaymentCardLoader from '@src/components/atoms/loaders/payment-card-loader'
import PaymentListPageLoader from '@components/atoms/loaders/payment-list'

const PayMentCardWithData = transactionListData(PaymentCard)

class PaymentList extends Component<any, any> {
  state = {
    searchKey: '',
    selectedFilter: this.props.filterOptions,
    finishAnimation: false,
  }
  timeout = null
  limit = 30
  skip = 0
  lastskip = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._freshfetch()
      this.setState({ finishAnimation: true })
    })
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
    let selectedStatus = selectedFilter.join(',')
    if (route.params?.hideHeader) {
      selectedStatus = route.params?.selectedFilter
    }

    this.props.getAllTransaction({
      limit: this.limit,
      offset: this.limit * skip,
      sort_by: 'date',
      sort_direction: 'desc',
      status: selectedStatus.join(),
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
        name: capitalEachWord(_filter),
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
    const { transactionLoading } = this.props

    if (transactionLoading && this.skip === 0) {
      return <PaymentCardLoader style={{ marginVertical: 16 }} />
    }
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

  _gotoOrderList = () => {
    navigate('Screens', {
      screen: 'OrderList',
      params: {
        selectedFilter: 'all',
      },
    })
  }

  _emptyComponent = () => {
    return (
      <OrderEmptyState
        title="No Payment Yet"
        description="Or maybe your payment is already complete, and we move it to your order list"
        button={
          <View>
            <OutlineButton
              style={{ borderColor: colors.blue50, height: 40 }}
              title="Check Your Order Status"
              fontStyle={{
                ...fontStyle.helveticaBold,
                fontSize: 12,
                color: colors.blue50,
                marginLeft: 0,
              }}
              onPress={this._gotoOrderList}
            />
          </View>
        }
      />
    )
  }

  _renderFooter = () => {
    const { transactionLoading } = this.props

    return (
      <View style={{ height: 360 }}>
        {transactionLoading && this.skip !== 0 && (
          <PaymentListPageLoader style={{ marginHorizontal: 16 }} />
        )}
      </View>
    )
  }

  _keyExtractor = (item, id) => `trans-${item} -${id}`
  render() {
    const { transactions, transactionLoading } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop leftContent={['back']} title="Payment List" />
        {finishAnimation ? (
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ paddingTop: 12, paddingHorizontal: 16 }}
              onRefresh={this._freshfetch}
              refreshing={transactionLoading}
              ListHeaderComponent={this._renderFilter}
              ListEmptyComponent={this._emptyComponent}
              ListFooterComponent={this._renderFooter}
              data={transactions}
              // onEndReached={this._fetchMore}
              onEndReachedThreshold={0.99}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              scrollIndicatorInsets={{ right: 1 }}
            />
          </View>
        ) : (
          <PaymentListPageLoader style={{ marginHorizontal: 16 }} />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList)
