import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContentExpandable from '@components/molecules/content-expandable'
import { Font, ScrollDiv } from '@components/atoms/basic'
import {
  helveticaBlackFont12,
  helveticaBlackFont14,
  helveticaBlackTitleBold,
} from '@components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import { formatRupiah } from '@utils/helpers'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { Checkbox } from '../atoms/checkbox'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import PaymentCreditCard from '@components/molecules/payment-credit-card'
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
    return (
      <View {...styles.paddingLR16}>
        <View {...styles.totalBillDetail}>
          <Font
            {...helveticaBlackFont14}
            color={
              colors.black70
            }>{`Product Total • ${transaction.qty} Items`}</Font>
          <Font {...helveticaBlackFont14} color={colors.black70}>
            {formatRupiah(transaction.total_amount)}
          </Font>
        </View>
        <View {...styles.totalBillDetail}>
          <Font
            {...helveticaBlackFont14}
            color={colors.black70}>{`Shipping Cost`}</Font>
          <Font {...helveticaBlackFont14} color={colors.black70}>
            {formatRupiah(transaction.shipping_cost)}
          </Font>
        </View>
        <View {...styles.totalBillDetail}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Font
              {...helveticaBlackFont14}
              color={colors.black70}>{`Insurance Fee`}</Font>
            <View style={{ marginLeft: 8 }}>
              <IconMi name="verified-user" size={12} color={colors.blue60} />
            </View>
          </View>
          <Font {...helveticaBlackFont14} color={colors.black70}>
            {formatRupiah(transaction.total_insurance_cost)}
          </Font>
        </View>
        <View {...styles.totalBillDetail}>
          <Font
            {...helveticaBlackFont14}
            color={colors.black70}>{`Payment Fee`}</Font>
          <Font {...helveticaBlackFont14} color={colors.black70}>
            {formatRupiah(details.total_fee)}
          </Font>
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
            <Font {...helveticaBlackFont14} color={colors.black100}>
              • Payment will be directly open your Gojek Apps
            </Font>
            <Font
              {...helveticaBlackFont14}
              color={colors.black100}
              style={{ marginTop: 16 }}>
              • You can scan QR code
            </Font>
          </View>
        )
      case 'Dana':
        return (
          <View style={{ marginTop: 24, width: '100%' }}>
            <Font {...helveticaBlackFont14} color={colors.black100}>
              • Payment will be directly open your Dana Apps
            </Font>
            <Font
              {...helveticaBlackFont14}
              color={colors.black100}
              style={{ marginTop: 16 }}>
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
              {...helveticaBlackFont14}
              color={colors.black100}
              style={{ lineHeight: 20 }}>
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
          <Font {...helveticaBlackTitleBold} color={colors.black80}>
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

  handlePayment = () => {
    // console.log('handle payment')
    const { payTransaction, transaction, details } = this.props
    const { dataCreditCard } = this.state
    console.log('dataCreditCard ---', dataCreditCard, transaction, details)

    // payTransaction(transaction.id, details.id) -> buat yang tidak credit card
    // payTransaction(transaction.id, token) -> buat credit card
  }

  render() {
    const { details, style, order, transaction } = this.props
    const { isChecked, isDisabled, dataCreditCard } = this.state

    console.log('disable parent ---', isDisabled)
    let disableButton = true
    if (details.name.toLowerCase() !== 'credit card') {
      disableButton = !isChecked
    } else {
      if (!isDisabled && isChecked) {
        disableButton = false
      }
    }
    console.log('disableButton ---', disableButton)

    return (
      <>
        <ScrollDiv>
          <View {...style} {...styles.container} {...styles.paddingLR16}>
            <View {...styles.border}>
              <ContentExpandable
                paddingTitle="24px 16px"
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
              <Font
                _margin="0 0 0 8px"
                {...helveticaBlackFont12}
                color={colors.black70}
                style={{ lineHeight: 17 }}>
                By Continue to payment you agree to The Shonet{' '}
                <Font
                  style={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  Terms of Use
                </Font>{' '}
                and{' '}
                <Font
                  style={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  Privacy Policy
                </Font>
              </Font>
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
