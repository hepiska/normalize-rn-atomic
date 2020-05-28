import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContentExpandable from '@components/molecules/content-expandable'
import { Font, ScrollDiv } from '@components/atoms/basic'
import {
  helveticaBlackFont12,
  helveticaBlackFont14,
  helveticaBlackTitleBold,
  fontStyle,
} from '@components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import { formatRupiah } from '@utils/helpers'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { Checkbox } from '../atoms/checkbox'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import PaymentCreditCard from '@components/molecules/payment-credit-card'
import { navigate } from '@src/root-navigation'
import OrderCard from '@components/molecules/order-card'
import { payTransaction } from '@modules/transaction/action'
import TextInputOutline from '@src/components/atoms/field-floating'

// interface PaymentDetailType {
//   style?: ViewStyle
//   shipment: any
//   onPress: () => void
//   index?: number
//   variantIds?: any
//   addressId?: any
//   warehouseId?: any
// }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 24,
    width: '100%',
  },
  paddingLR16: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  border: {
    borderColor: colors.black50,
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  totalBillDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  expandableContainer: {
    marginTop: 24,
  },
  expandableTitle: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
  footer: {
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
  textBoldUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  paddingBottom: {
    paddingBottom: 32,
  },
})

class PaymentDetail extends React.PureComponent<any, any> {
  state = {
    isChecked: false,
    dataCreditCard: {},
    isDisabled: true,
  }

  renderTitleExpandable = () => {
    return (
      <View {...styles.row}>
        <Font {...helveticaBlackTitleBold} color={colors.black80}>
          Total Bill
        </Font>
        <View style={{ marginLeft: 8 }}>
          <IconMi name="verified-user" size={12} color={colors.blue60} />
        </View>
      </View>
    )
  }

  renderRightTitleExpandable = () => {
    const { transaction, details } = this.props
    if (!transaction) {
      return null
    }
    return (
      <Font
        {...helveticaBlackTitleBold}
        color={colors.black80}
        _margin="0 18px 0 0">
        {formatRupiah(
          transaction.total_amount +
            transaction.shipping_cost +
            // transaction.total_insurance_cost +
            details.total_fee,
        )}
      </Font>
    )
  }

  renderContentExpandable = () => {
    const { transaction, details } = this.props
    if (!transaction) {
      return null
    }
    return (
      <View {...styles.paddingLR16}>
        <View {...styles.totalBillDetail}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Product Total • ${transaction.qty} Items`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(transaction.total_amount)}
          </Text>
        </View>
        <View {...styles.totalBillDetail}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Shipping Cost`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(transaction.shipping_cost)}
          </Text>
        </View>
        <View {...styles.totalBillDetail}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              {`Insurance Fee`}
            </Text>
            <View style={{ marginLeft: 8 }}>
              <IconMi name="verified-user" size={12} color={colors.blue60} />
            </View>
          </View>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(transaction.total_insurance_cost)}
          </Text>
        </View>
        <View {...styles.totalBillDetail}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Payment Fee`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(details.total_fee)}
          </Text>
        </View>
      </View>
    )
  }

  onChangeCreditCard = (disable, state) => {
    this.setState({
      dataCreditCard: state,
      isDisabled: disable,
    })
  }

  renderInformation = name => {
    switch (name) {
      case 'GoPay':
        return (
          <View style={{ marginTop: 24, width: '100%' }}>
            <Text style={{ ...styles.helvetica14, color: colors.black100 }}>
              • Payment will be directly open your Gojek Apps
            </Text>
            <View style={{ marginTop: 16 }}>
              <Text style={{ ...styles.helvetica14, color: colors.black100 }}>
                • You can scan QR code
              </Text>
            </View>
          </View>
        )
      case 'Dana':
        return (
          <View style={{ marginTop: 24, width: '100%' }}>
            <Font style={styles.helvetica14} color={colors.black100}>
              • Payment will be directly open your Dana Apps
            </Font>
            <Font
              color={colors.black100}
              style={{ marginTop: 16, ...styles.helvetica14 }}>
              • You can scan QR code
            </Font>
          </View>
        )
      case 'Credit Card':
        return (
          <PaymentCreditCard
            transaction={this.props.transaction}
            details={this.props.details}
            onChangeCreditCard={this.onChangeCreditCard}
          />
        )
      default:
        return (
          <View style={{ marginTop: 24, width: '100%' }}>
            <Font
              color={colors.black100}
              style={{ lineHeight: 20, ...styles.helvetica14 }}>
              • Copy virtual account number into your bank account and total
              payment will auto generate
            </Font>
          </View>
        )
    }
  }

  renderPaymentMethod = () => {
    const { details } = this.props
    let name
    if (details.name.toLowerCase() === 'gopay') {
      name = 'GoPay'
    } else if (details.name.toLowerCase() === 'dana') {
      name = 'Dana'
    } else if (details.name.toLowerCase() === 'credit card') {
      name = 'Credit Card'
    } else if (details.name.toLowerCase() === 'virtual account') {
      name = details.channel + ' ' + details.name
    }

    return (
      <>
        <View
          {...styles.row}
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 24,
          }}>
          <Font
            style={{ ...fontStyle.helveticaBold, fontSize: 16 }}
            color={colors.black80}>
            {name}
          </Font>
          <ImageAutoSchale
            source={
              typeof details.image === 'string'
                ? { uri: details.image }
                : details.image
            }
            width={56}
          />
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: colors.black50,
            height: 1,
            width: '100%',
            marginTop: 24,
          }}
        />
        {this.renderInformation(name)}
      </>
    )
  }

  handleCheckPolicy = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }

  handlePayment = async () => {
    const { payTransaction, transaction, details } = this.props
    const { dataCreditCard } = this.state
    if (details.name.toLowerCase() !== 'credit card') {
      await payTransaction(transaction.id, details.id)
      navigate('PaymentWaiting', { transactionId: transaction.id })
    } else {
      navigate('PaymentWebView', {
        transactionId: transaction.id,
        dataCreditCard,
        method: details,
        type: details.name.toLowerCase(),
      })
    }
    // await payTransaction(transaction.id, details.id, transaction.token_id)
    // payTransacti  on(transaction.id, details.id) -> buat yang tidak credit card
    // payTransaction(transaction.id, token) -> buat credit card
  }

  render() {
    const { details, style, order, transaction } = this.props
    const { isChecked, isDisabled, dataCreditCard } = this.state
    let disableButton = true
    if (details.name.toLowerCase() !== 'credit card') {
      disableButton = !isChecked
    } else {
      if (!isDisabled && isChecked) {
        disableButton = false
      }
    }
    return (
      <>
        <ScrollDiv>
          <View
            style={[
              styles.container,
              styles.paddingLR16,
              styles.paddingBottom,
              style,
            ]}>
            <View {...styles.border}>
              <ContentExpandable
                paddingTitleVertical={24}
                paddingTitleHorizontal={16}
                title={this.renderTitleExpandable()}
                rightTitle={this.renderRightTitleExpandable()}
                content={this.renderContentExpandable()}
                id={`payment-detail-expandable-${details.id}`}
                divider={
                  <View
                    style={{
                      borderStyle: 'dashed',
                      borderColor: colors.black50,
                      borderWidth: 1,
                      width: '100%',
                    }}
                  />
                }
              />
            </View>
            {this.renderPaymentMethod()}
          </View>
        </ScrollDiv>
        <View {...styles.footer}>
          {details.name.toLowerCase() === 'credit card' && (
            <View style={{ flexDirection: 'row', marginTop: 36 }}>
              <ImageAutoSchale
                source={require('@src/assets/icons/visa.png')}
                width={56}
              />
              <ImageAutoSchale
                source={require('@src/assets/icons/master-card.png')}
                width={56}
                style={{ marginLeft: 17 }}
              />
              <ImageAutoSchale
                source={require('@src/assets/icons/norton.png')}
                width={56}
                style={{ marginLeft: 17 }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              marginBottom: 24,
            }}>
            <Checkbox
              style={{ flexDirection: 'row' }}
              isChecked={isChecked}
              onPress={this.handleCheckPolicy}
            />
            <View style={{ width: '95%' }}>
              <View style={{ marginLeft: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black70 }}>
                  By Continue to payment you agree to The Shonet{' '}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Terms of Use
                  </Text>
                  {` `}and {` `}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <GradientButton
            leftIcon={
              <View style={{ marginRight: 8 }}>
                <Icon name="lock" color={colors.white} size={14} />
              </View>
            }
            onPress={this.handlePayment}
            {...colors.ActivePurple}
            title="Pay Now"
            fontStyle={styles.buttonText}
            style={styles.button}
            disabled={disableButton}
          />
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      payTransaction,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(PaymentDetail)
