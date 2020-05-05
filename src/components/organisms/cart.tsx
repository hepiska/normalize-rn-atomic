import React, { Component } from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import { Font, PressAbbleDiv, Div } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { Checkbox } from '@components/atoms/checkbox'
import { helveticaBlackBold, fontStyle } from '@components/commont-styles'
import CartCard from '@components/molecules/cart-card'
import CartEmptyState from '@components/molecules/cart-empty-state'
import TotalPayCart from '@components/molecules/total-pay-cart'
import { cartListData } from '@hocs/data/cart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeCart } from '@modules/cart/action'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import { navigate } from '@src/root-navigation'
import CartListLoader from '@components/atoms/loaders/cart-list'

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

class Cart extends Component<any, any> {
  state = {
    selectedVariant: [],
  }

  componentDidMount() {
    this._chooseAll()
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
      />
    )
  }

  _removeCart = () => {
    const { carts, removeCart } = this.props

    carts &&
      carts.map(cart => {
        removeCart(cart)
      })
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

  _header = () => {
    const { carts } = this.props
    const { selectedVariant } = this.state
    const isChecked = carts.length === selectedVariant.length
    if (carts.length > 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
          {...styles.solidDivider}>
          <PressAbbleDiv onPress={this._chooseAll}>
            <View {...styles.cartMargin} style={{ flexDirection: 'row' }}>
              <Checkbox isChecked={isChecked} onPress={this._chooseAll} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ ...styles.helvetica14, color: colors.black100 }}>
                  Choose All
                </Text>
              </View>
            </View>
          </PressAbbleDiv>
          <PressAbbleDiv onPress={this._removeCart}>
            <View {...styles.cartMargin}>
              <Text style={{ ...styles.helveticaBold14, color: colors.blue60 }}>
                Remove
              </Text>
            </View>
          </PressAbbleDiv>
        </View>
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
      <View {...styles.cartMargin}>
        <CartEmptyState />
      </View>
    )
  }

  _onCheckout = (item, totalPrice) => () => {
    navigate('Screens', {
      screen: 'Checkout',
      params: { cartsId: item, totalPrice: totalPrice },
    })
  }

  render() {
    const { footer, stateCarts, carts, cartsLoading } = this.props
    const { selectedVariant } = this.state

    let data = []
    let groupData = carts.reduce((total, currentValue) => {
      let selectedItem = stateCarts[currentValue]
      let warehouse = selectedItem && selectedItem.variant.product.address
      if (total[warehouse.id]) {
        total[warehouse.id].data.push(currentValue)
      } else {
        total[warehouse.id] = {
          title: warehouse.label,
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

    if (data.length === 0 && cartsLoading) {
      return <CartListLoader />
    }
    return (
      <>
        <SectionList
          sections={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._sectionHeader}
          ListHeaderComponent={this._header}
          stickyHeaderIndices={[0]}
          ListFooterComponent={footer && footer}
          ListEmptyComponent={this._emptyComponent}
        />
        <TotalPayCart
          items={selectedVariant}
          buttonText="Checkout"
          onCheckout={this._onCheckout}
          enableButton={enableCheckout}
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeCart }, dispatch)

const mapStateToProps = (state: any) => {
  return {
    stateCarts: state.carts.data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
