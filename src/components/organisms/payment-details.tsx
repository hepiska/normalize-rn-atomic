import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
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
    creditCardType: '',
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
            transaction.total_insurance_cost +
            this.calculateFee(),
        )}
      </Font>
    )
  }

  calculateFee = () => {
    const { creditCardType } = this.state
    const { transactionPaymentData } = this.props
    const matchedIndex = Object.keys(transactionPaymentData).findIndex(val => {
      return transactionPaymentData[val].name.includes(creditCardType)
    })

    // PLUS ONE CASE TRANSACTIONPAYMENTDATA INDEX STARTS FROM 1, NOT 0
    if (matchedIndex > 0) {
      return transactionPaymentData[matchedIndex + 1]?.total_fee
    }
    return 0
  }

  renderContentExpandable = () => {
    const { transaction, details } = this.props
    if (!transaction) {
      return null
    }
    return (
      <View style={{ ...styles.paddingLR16 }}>
        <View style={{ ...styles.totalBillDetail }}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Product Total • ${transaction.qty} Items`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(transaction.total_amount)}
          </Text>
        </View>
        <View style={{ ...styles.totalBillDetail }}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Shipping Cost`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {formatRupiah(transaction.shipping_cost)}
          </Text>
        </View>
        <View style={{ ...styles.totalBillDetail }}>
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
        <View style={{ ...styles.totalBillDetail }}>
          <Text
            style={{
              ...styles.helvetica14,
              color: colors.black70,
            }}>{`Payment Fee`}</Text>
          <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
            {details.group_payment === 'Credit Card'
              ? formatRupiah(this.calculateFee())
              : formatRupiah(details.total_fee)}
          </Text>
        </View>
      </View>
    )
  }

  getCreditCardValue = data => {
    const ccPrams = {}
    Object.keys(data).forEach(key => {
      if (key === 'card_number') {
        ccPrams[key] = data[key].value.replace(/[\s]/gi, '')
      } else {
        ccPrams[key] = data[key].value
      }
    })
    return ccPrams
  }

  getCCType = number => {
    let type
    let sliceOne = number.slice(0, 1)
    let sliceTwo = number.slice(0, 2)
    let sliceFour = number.slice(0, 4)
    let sliceSix = number.slice(0, 6)
    if ((sliceTwo == '34' || sliceTwo == '37') && number.length === 15) {
      type = 'American Express'
    } else if (
      parseInt(sliceFour) >= 3528 &&
      parseInt(sliceFour) <= 3589 &&
      number.length >= 16 &&
      number.length <= 19
    ) {
      type = 'JCB'
    } else if (
      ((parseInt(sliceTwo) >= 51 && parseInt(sliceTwo) <= 55) ||
        (parseInt(sliceSix) >= 222100 && parseInt(sliceSix) <= 272099)) &&
      number.length === 16
    ) {
      type = 'Mastercard'
    } else if (sliceOne == 4 && number.length >= 13 && number.length <= 19) {
      type = 'Visa'
    }
    return type
  }

  onChangeCreditCard = (disable, state) => {
    const ccData: any = this.getCreditCardValue(state)
    const type = this.getCCType(ccData.card_number) || ''

    this.setState({
      dataCreditCard: state,
      isDisabled: disable,
      creditCardType: type,
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
    } else if (details.name.toLowerCase() === 'virtual account') {
      name = details.channel + ' ' + details.name
    } else {
      name = `Credit Card`
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
            {`${name} ${this.state.creditCardType}`}
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

  handlePressTnc = () => {
    navigate('Screens', { screen: 'TermsCondition' })
  }
  handlePressPrivacyPolicy = () => {
    navigate('Screens', { screen: 'PrivacyPolicy' })
  }

  handlePayment = async () => {
    const { payTransaction, transaction, details } = this.props
    const { dataCreditCard } = this.state
    if (
      details.name.toLowerCase() === 'gopay' ||
      details.name.toLowerCase() === 'dana' ||
      details.name.toLowerCase() === 'virtual account'
    ) {
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
    if (
      details.name.toLowerCase() === 'gopay' ||
      details.name.toLowerCase() === 'dana' ||
      details.name.toLowerCase() === 'virtual account'
    ) {
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
            <View style={{ ...styles.border }}>
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
        <View style={{ ...styles.footer }}>
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
            <TouchableOpacity onPress={this.handleCheckPolicy}>
              <View style={{ width: '95%', marginLeft: 8 }}>
                <Text style={{ ...styles.helvetica12, color: colors.black70 }}>
                  By Continue to payment you agree to The Shonet{' '}
                  <Text
                    onPress={this.handlePressTnc}
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Terms of Use
                  </Text>
                  {` `}and {` `}
                  <Text
                    onPress={this.handlePressPrivacyPolicy}
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
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
const mapStateToProps = state => {
  return {
    transactionPaymentData: state.transactionsPayments.data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail)
