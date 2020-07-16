import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  Font,
  PressAbbleDiv,
  Div,
  TouchableWithoutFeedback,
} from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { Checkbox } from '@components/atoms/checkbox'
import { helveticaBlackBold, fontStyle } from '@components/commont-styles'
import CartCard from '@components/molecules/cart-card'
import CartEmptyState from '@components/molecules/cart-empty-state'
import TotalPayCart from '@components/molecules/total-pay-cart'
import { cartListData } from '@hocs/data/cart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeCart, removeCartOrder } from '@modules/cart/action'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import { navigate } from '@src/root-navigation'
import { getUserAddressById } from '@modules/address/action'
import CartListLoader from '@components/atoms/loaders/cart-list'
import { getAllTransactionCount } from '@modules/transaction/action'
import CouponAlert from '@components/molecules/coupon-alert'

const styles = StyleSheet.create({
  solidDivider: {
    paddingBottom: 16,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: colors.black50,
  },
  cartMargin: {
    marginLeft: 16,
    marginRight: 16,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
})
const CartHoc = cartListData(CartCard)

class Cart extends React.Component<any, any> {
  state = {
    selectedVariant: [],
    isShowOrderAlert: true,
  }

  skip = 0
  lastSkip = 0

  shouldComponentUpdate(nextProps, nextState) {
    const { selectedVariant, isShowOrderAlert } = this.state
    const { transactionCount } = this.props
    if (selectedVariant !== nextState.selectedVariant) {
      return true
    }
    if (isShowOrderAlert !== nextState.isShowOrderAlert) {
      return true
    }
    if (transactionCount !== nextProps.transactionCount) {
      return true
    }

    return false
  }
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.getUserAddressById()
      this.props.getAllTransactionCount({ status: 'unpaid,waiting' })
    }
    this._chooseAll()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.carts !== this.props.carts) {
      let _selected = [...this.props.carts]

      this.setState({
        selectedVariant: _selected,
      })
    }
  }
  _keyExtractor = (item, index) => '' + item + index

  _renderItem = ({ item, index }) => {
    let isChecked = this.state.selectedVariant.find(v => v === item)
    isChecked = isChecked !== undefined ? true : false
    return (
      <CartHoc
        key={`cart-${index}`}
        cartId={item}
        style={{ paddingHorizontal: 16 }}
        index={index}
        isChecked={isChecked}
        chooseCart={this.onChooseCartByItem}
        removeSelectedVariant={this.onRemoveSelectedVariant}
        isAuth={this.props.isAuth}
      />
    )
  }

  _removeCart = () => {
    const { carts, removeCart, isAuth, removeCartOrder } = this.props

    if (isAuth) {
      carts &&
        carts.map(cart => {
          removeCart(cart)
        })
    } else {
      carts &&
        carts.map(cart => {
          removeCartOrder(cart)
        })
    }
    this.setState({
      selectedVariant: [],
    })
  }

  _chooseAll = () => {
    const { carts } = this.props
    const { selectedVariant } = this.state

    let _selected = []

    if (carts.length === selectedVariant.length) {
      _selected = []
    } else {
      _selected = [...carts]
    }
    this.setState({
      selectedVariant: _selected,
    })
  }

  isAllWarehouseSeled = (warehouse, carts) =>
    warehouse.length
      ? warehouse.reduce((sum, _dat, idx) => {
          return Boolean(sum * carts.includes(_dat))
        }, true)
      : false

  onRemoveSelectedVariant = cartId => {
    const { selectedVariant } = this.state
    const newSelectedVariant = selectedVariant.filter(value => value !== cartId)
    this.setState({
      selectedVariant: [...newSelectedVariant],
    })
  }

  onChooseCartByItem = cartId => () => {
    const { selectedVariant } = this.state
    let isChecked = selectedVariant.find(v => v === cartId)
    isChecked = isChecked !== undefined ? true : false
    let selected = [...selectedVariant]
    if (isChecked) {
      selected = selected.filter(item => item !== cartId)
    } else {
      selected = [...selected, cartId]
    }
    this.setState({
      selectedVariant: [...selected],
    })
  }

  onChooseCartByWarehouse = sectionCart => () => {
    const { selectedVariant } = this.state
    let isChecked = this.isAllWarehouseSeled(sectionCart, selectedVariant)

    if (!isChecked) {
      let newSelectedVariant = [...this.state.selectedVariant, ...sectionCart]
      newSelectedVariant = [...new Set(newSelectedVariant)]
      this.setState({
        selectedVariant: newSelectedVariant,
      })
    } else {
      const newSelected = selectedVariant.filter(_var => {
        return !sectionCart.includes(_var)
      })
      this.setState({
        selectedVariant: newSelected,
      })
    }
  }

  handleSeeOrder = () => {
    navigate('Screens', {
      screen: 'PaymentList',
      params: {
        selectedFilter: ['unpaid', 'waiting'],
        hideHeader: true,
      },
    })
  }

  handleCloseOrderAlert = () => {
    this.setState({
      isShowOrderAlert: false,
    })
  }

  _header = () => {
    const { carts, transactionCount, isAuth } = this.props
    const { selectedVariant, isShowOrderAlert } = this.state
    const isChecked = carts.length === selectedVariant.length

    const pendingTransaction = Object.keys(transactionCount).reduce(
      (acc, dat) => {
        acc += transactionCount[dat]
        return acc
      },
      0,
    )
    if (carts.length > 0) {
      return (
        <>
          {isShowOrderAlert && isAuth && (
            <View
              style={{
                backgroundColor: colors.black50,
                margin: 16,
                marginBottom: 0,
                padding: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 13,
                  lineHeight: 17,
                  flex: 9,
                }}>
                You have {pendingTransaction} order(s) waiting for payment,
                <TouchableWithoutFeedback onPress={this.handleSeeOrder}>
                  <Text style={{ fontWeight: '700' }}>{` click here `}</Text>
                </TouchableWithoutFeedback>
                to complete your purchase
              </Text>
              <TouchableOpacity onPress={this.handleCloseOrderAlert}>
                <IconFa name="times" size={16} color={colors.black70} />
              </TouchableOpacity>
            </View>
          )}

          <CouponAlert
            style={{ marginHorizontal: 16, marginVertical: 16 }}
            selectedCart={this.state.selectedVariant.join()}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              ...styles.solidDivider,
            }}>
            <PressAbbleDiv onPress={this._chooseAll}>
              <View style={{ flexDirection: 'row', ...styles.cartMargin }}>
                <Checkbox isChecked={isChecked} onPress={this._chooseAll} />
                <View style={{ marginLeft: 16 }}>
                  <Text
                    style={{ ...styles.helvetica14, color: colors.black100 }}>
                    Choose All
                  </Text>
                </View>
              </View>
            </PressAbbleDiv>
            <PressAbbleDiv onPress={this._removeCart}>
              <View style={styles.cartMargin}>
                <Text
                  style={{
                    ...styles.helveticaBold14,
                    fontWeight: '700',
                    color: colors.black80,
                    textDecorationLine: 'underline',
                  }}>
                  Remove
                </Text>
              </View>
            </PressAbbleDiv>
          </View>
        </>
      )
    }
    return <></>
  }

  _sectionHeader = item => {
    const { selectedVariant } = this.state
    let isChecked = this.isAllWarehouseSeled(item.section.data, selectedVariant)

    return (
      <PressAbbleDiv onPress={this.onChooseCartByWarehouse(item.section.data)}>
        <Div
          _width="100%"
          flexDirection="row"
          _padding="25px 16px"
          alignItems="flex-start"
          justifyContent="flex-start"
          bg="white">
          <Checkbox
            isChecked={isChecked}
            onPress={this.onChooseCartByWarehouse(item.section.data)}
            style={{ marginRight: 16 }}
          />
          <IconFa name="warehouse" size={14} color={colors.black80} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ ...styles.helvetica14, color: colors.black80 }}>
              {item.section.title}
            </Text>
          </View>
        </Div>
      </PressAbbleDiv>
    )
  }

  _emptyComponent = () => {
    return (
      <View style={{ ...styles.cartMargin }}>
        <CartEmptyState />
      </View>
    )
  }

  _onCheckout = (item, totalPrice) => () => {
    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      if (this.props.addresses.length > 0) {
        navigate('Screens', {
          screen: 'Checkout',
          params: { cartsId: item, totalPrice: totalPrice },
        })
      } else {
        navigate('Screens', {
          screen: 'AddNewAddressManual',
          params: {
            afterSubmit: {
              screen: 'Checkout',
              params: { cartsId: item, totalPrice: totalPrice },
            },
          },
        })
      }
    }
  }

  _fetchMore = () => {
    if (!this.props.cartsLoading) {
      const newSkip = this.skip + 1

      if (newSkip > this.lastSkip) {
        this.skip = newSkip
        this.lastSkip = newSkip
      }
      if (this.props.cartsLoading) {
        return
      }
      // if (30 > this.props.carts.length) {
      //   this.props.getAllCart()
      // }
    }
  }

  render() {
    const { footer, stateCarts, carts, cartsLoading, products } = this.props
    const { selectedVariant } = this.state
    // need refacotr with selector
    let data = []
    let groupData = carts.reduce((total, currentValue) => {
      let selectedItem = stateCarts[currentValue]
      let warehouse = selectedItem && selectedItem.variant.product.address
      if (total[warehouse.id]) {
        total[warehouse.id].data.push(currentValue)
      } else {
        total[warehouse.id] = {
          title: warehouse.label + ' - ' + warehouse.city.name,
          data: [currentValue],
        }
      }
      return total
    }, {})

    data = Object.keys(groupData).map(k => groupData[k])

    const enableCheckout = selectedVariant.reduce((isAvail, value) => {
      isAvail *=
        stateCarts[value].is_stock_available * stateCarts[value].is_available
      return Boolean(isAvail)
    }, true)

    if (cartsLoading && this.skip === 0) {
      return <CartListLoader style={{ marginHorizontal: 16 }} />
    }
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          style={{ flex: 1 }}
          sections={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          scrollEnabled={!!products.length || !!data.length}
          renderSectionHeader={this._sectionHeader}
          ListHeaderComponent={this._header}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponent={footer && footer}
          ListEmptyComponent={this._emptyComponent}
          onEndReachedThreshold={0.97}
          onEndReached={this._fetchMore}
        />
        {carts.length > 0 && (
          <TotalPayCart
            items={selectedVariant}
            buttonText="Checkout"
            onCheckout={this._onCheckout}
            enableButton={enableCheckout || !this.props.isAuth}
          />
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { removeCart, removeCartOrder, getUserAddressById, getAllTransactionCount },
    dispatch,
  )

const mapStateToProps = (state: any) => {
  const isAuth = state.auth.isAuth
  let addresses = []
  let transactionCount = []
  if (isAuth) {
    addresses = state.addresses.order
    transactionCount = state.transaction.count
  }
  return {
    isAuth,
    addresses,
    products: state.productsSaved.order,
    stateCarts: state.carts.data,
    transactionCount,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
