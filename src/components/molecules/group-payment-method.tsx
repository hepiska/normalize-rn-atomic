import React, { Component } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { Font } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import Tooltip from 'rn-tooltip'
import PaymentMethodCard from '@src/components/molecules/payment-method-card'
import {
  futuraBlackFont24,
  helveticaBlackFont12,
} from '@src/components/commont-styles'
import { paymentMethodListData } from '@hocs/data/payments-methods'
import IconMi from 'react-native-vector-icons/MaterialIcons'
const { width } = Dimensions.get('screen')

const PaymentMethodHoc = paymentMethodListData(PaymentMethodCard)

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ' rgba(26, 26, 26, 0.04)',
    borderRadius: 100,
    width: 32,
    height: 24,
  },
})

class GroupPaymentMethod extends Component<any, any> {
  changeTitle = title => {
    const _title = title.replace(/_/g, ' ')
    switch (_title) {
      case 'E Wallet':
        return 'E-Wallet'
      case 'Virtual Account':
        return 'Bank Transfer'
      default:
        return _title
    }
  }

  renderTitle = () => {
    const { title } = this.props
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Font {...futuraBlackFont24}>{this.changeTitle(title)}</Font>
        {title === 'Virtual_Account' && (
          <Tooltip
            actionType="press"
            popover={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Font {...helveticaBlackFont12} _margin="0">
                  Each bank account have different service payment fee
                </Font>
                <IconMi name="cancel" size={14} color={colors.black100} />
              </View>
            }
            height={35}
            withOverlay={false}
            backgroundColor={colors.black10}
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              left: 16,
            }}
            width={width - 32}>
            <View {...styles.iconContainer}>
              <IconMi
                name="account-balance-wallet"
                size={12}
                color={colors.black100}
              />
            </View>
          </Tooltip>
        )}
      </View>
    )
  }

  render() {
    const { item, style, transactionId } = this.props

    return (
      <View {...style} style={{ marginTop: 24 }}>
        {this.renderTitle()}
        {item.map((_item, key) => {
          return (
            <PaymentMethodHoc
              key={key}
              paymentMethodId={_item}
              index={key}
              transactionId={transactionId}
            />
          )
        })}
      </View>
    )
  }
}

export default GroupPaymentMethod
