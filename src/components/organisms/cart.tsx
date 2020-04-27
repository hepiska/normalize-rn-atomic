import React, { Component } from 'react'
import { View, StyleSheet, SectionList } from 'react-native'
import { Font, PressAbbleDiv, Div } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'
import { Checkbox } from '@components/atoms/checkbox'
import {
  helveticaBlackFont14,
  helveticaBlackBold,
} from '@components/commont-styles'
import CartCard from '@components/molecules/cart-card'
import CartEmptyState from '@components/molecules/cart-empty-state'
import TotalPayCart from '@components/molecules/total-pay-cart'
import { cartListData } from '@hocs/data/cart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeCart } from '@modules/cart/action'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import { navigate } from '@src/root-navigation'

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
        style={{ ...styles.cartMargin }}
        index={index}
        isChecked={isChecked}
        chooseCart={this.onChooseCartByItem}
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
              <Font {...helveticaBlackFont14} style={{ marginLeft: 16 }}>
                Choose All
              </Font>
            </View>
          </PressAbbleDiv>
          <PressAbbleDiv onPress={this._removeCart}>
            <View {...styles.cartMargin}>
              <Font {...helveticaBlackBold} color={colors.blue60}>
                Remove
              </Font>
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
          // _margin="25px 0 0 0"
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
          <Font {...helveticaBlackFont14} style={{ paddingLeft: 8 }}>
            {item.section.title}
          </Font>
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
    const { carts, footer, data } = this.props
    const { selectedVariant } = this.state

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
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeCart }, dispatch)

const mapStateToProps = (state, ownProps) => {
  const dataCarts = ownProps.carts

  /* revisi: pindah ke dalam render sebelum return */
  let manipulatedData = []
  let groupData = dataCarts.reduce((total, currentValue) => {
    let selectedItem = state.carts.data[currentValue]
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
  manipulatedData = Object.keys(groupData).map(k => groupData[k])
  return {
    data: manipulatedData,
    totalCart: state.carts.order.length,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
