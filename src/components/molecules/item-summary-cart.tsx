import React from 'react'
import { StyleSheet, ViewStyle, View } from 'react-native'
import { connect } from 'react-redux'
import RNTooltips from 'react-native-tooltips'
import { Font } from '@components/atoms/basic'
import {
  helveticaBlackFont12,
  helveticaBlackFont14,
  helveticaBlackTitleBold,
} from '@components/commont-styles'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import ProductSummaryCart from './product-summary-cart'
import { cartListData } from '@hocs/data/cart'
import CourierCart from './courier-cart'
import { Checkbox } from '../atoms/checkbox'
import ContentExpandable from '@components/molecules/content-expandable'
import { bindActionCreators } from 'redux'

const CartHoc = cartListData(ProductSummaryCart)

interface ItemSummaryCartType {
  style?: ViewStyle
  item: any
  index: string | number
  totalPrice?: number
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  warehouse: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  shipmentCourier: {
    marginTop: 24,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'rgba(26, 26, 26, 0.04);',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

class ItemSummaryCart extends React.PureComponent<ItemSummaryCartType, any> {
  state = {
    isProtectDelivery: true,
  }

  onProtectDelivery = () => {
    this.setState({
      isProtectDelivery: !this.state.isProtectDelivery,
    })
  }

  render() {
    const { style, item, index, totalPrice } = this.props
    const { isProtectDelivery } = this.state
    return (
      <View
        {...style}
        {...styles.container}
        style={{ marginTop: index !== 0 ? 40 : 24 }}>
        <View {...styles.warehouse}>
          <Icon name="warehouse" size={14} color={colors.black80} />
          <Font {...helveticaBlackFont14} style={{ paddingLeft: 8 }}>
            {item.title}
          </Font>
        </View>
        {item.data.map((_item, key) => {
          return <CartHoc cartId={_item} key={key} index={key} />
        })}

        {/* shipment courier */}
        <View style={{ marginTop: 30 }}>
          <Font {...helveticaBlackTitleBold} color={colors.black80}>
            Shipment Courier
          </Font>
          <View {...styles.shipmentCourier}>
            <Icon name="business-time" size={16} color={colors.black100} />
            <Font {...helveticaBlackFont12} _margin="0 0 0 16px">
              Shipment duration starts when items have been received by the
              courier
            </Font>
          </View>
          <CourierCart
            style={{ marginTop: 16 }}
            name="Paxel Same Day"
            // isPreffered
            price={0}
            onPress={() => {}}
          />
        </View>

        {/* Shipping insurance */}
        <View style={{ marginTop: 32, alignItems: 'flex-start' }}>
          <Font {...helveticaBlackTitleBold} color={colors.black80}>
            Shipping insurance
          </Font>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
            }}>
            <Checkbox
              isChecked={isProtectDelivery}
              onPress={this.onProtectDelivery}
              text="Delivery Protection"
              fontStyle={{
                ...helveticaBlackFont14,
                marginLeft: 8,
              }}
              style={{
                flexDirection: 'row',
              }}
            />
            <View style={{ marginLeft: 8 }}>
              <IconMi name="help" size={14} color={colors.black100} />
              <RNTooltips
                text={'Long Press Description'}
                visible
                target={
                  <IconMi name="help" size={14} color={colors.black100} />
                }
                // parent={this.state.parent}
              />
            </View>
          </View>
        </View>

        {/* Sub Total */}
        <ContentExpandable
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Font {...helveticaBlackTitleBold} color={colors.black80}>
                Sub Total
              </Font>
              {isProtectDelivery && (
                <View style={{ marginLeft: 8 }}>
                  <IconMi
                    name="verified-user"
                    size={12}
                    color={colors.blue60}
                  />
                </View>
              )}
            </View>
          }
          rightTitle={
            <Font
              {...helveticaBlackTitleBold}
              color={colors.black80}
              _margin="0 18px 0 0">
              {formatRupiah(totalPrice)}
            </Font>
          }
          content="Halo halo"
          id={`sub-total-${item.data}`}
          // key={`product-detail-${idx}`}
          // id={'expanable' + idx}
          isFirst
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const dataCartPerWarehouse = ownProps.item.data

  const totalPrice = dataCartPerWarehouse.reduce((total, item) => {
    const singleItem = state.carts.data[item]
    const price = singleItem.variant.price
    const quantity = singleItem.qty
    total += price * quantity
    return total
  }, 0)

  return {
    totalPrice,
  }
}

export default connect(mapStateToProps, null)(ItemSummaryCart)
