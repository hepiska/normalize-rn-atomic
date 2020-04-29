import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showAlert, formatRupiah, countdown } from '@utils/helpers'
import { getTransactionById } from '@modules/transaction/action'
import { GradientButton, OutlineButton } from '@components/atoms/button'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { CommonActions } from '@react-navigation/native'
import dayjs from 'dayjs'
import NavbarTop from '@src/components/molecules/navbar-top'

let utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

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
    marginTop: 16,
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

class PaymentWebView extends Component<any, any> {
  count = null
  interval = null
  state: any = {
    countdownTimer: {
      minutes: 0,
      seconds: 0,
    },
  }

  async componentDidMount() {
    const { transactionId, transaction } = this.props

    if (transactionId) {
      this.callApi
      this.interval = setInterval(this.callApi, 10000)
    }

    const endTimer = dayjs()
      .add(1, 'minute')
      .format()

    this.count = countdown(
      new Date(endTimer),
      data => {
        this.setState({
          countdownTimer: data,
        })
      },
      () => {
        clearInterval(this.count)
        clearInterval(this.interval)
        this._toTransactionDetail()
      },
    )
  }

  componentDidUpdate() {
    if (this.props.transaction.status.toLowerCase() === 'waiting') {
      this._toTransactionDetail()
    }
  }

  _toTransactionDetail = () => {
    const { transaction } = this.props
    const status = transaction.status.toLowerCase()
    const routes = [
      { name: 'Main', params: { screen: 'Profile' } },
      { name: 'Screens', params: { screen: 'PaymentList' } },
    ]
    if (status === 'waiting') {
      routes.push({
        name: 'Screens',
        params: {
          screen: 'PaymentWaiting',
          params: {
            transactionId: transaction.id,
            details: transaction.provider_payment_method,
            holdOpenWeb: true,
          },
        },
      })
    }
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes: routes,
      }),
    )
  }

  _toShop = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main', params: { screen: 'Shop' } }],
      }),
    )
  }

  _toOrder = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Main', params: { screen: 'Profile' } },
          { name: 'Screens', params: { screen: 'OrderList' } },
        ],
      }),
    )
  }

  _toCart = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Main', params: { screen: 'Shop' } },
          { name: 'Screens', params: { screen: 'Cart' } },
        ],
      }),
    )
  }

  callApi = () => {
    this.props.getTransactionById(this.props.transactionId)
  }

  _renderComponent = status => {
    const { countdownTimer } = this.state
    const { transaction } = this.props
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Image
              source={require('@src/assets/icons/payment-success.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{ ...fontStyle.futuraDemi, fontSize: 24, marginTop: 32 }}>
              Payment Success
            </Text>
            {transaction && transaction.invoice && (
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 14,
                  color: colors.black70,
                  marginTop: 16,
                }}>
                {transaction.invoice}
              </Text>
            )}

            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black80,
                marginTop: 16,
              }}>
              {transaction && dayjs(transaction.updated_at).format('')}
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                padding: 16,
                width: '100%',
              }}>
              <OutlineButton
                style={{
                  ...styles.button,

                  borderColor: colors.blue60,
                }}
                onPress={this._toOrder}
                fontStyle={{
                  color: colors.blue60,
                  ...fontStyle.helveticaBold,
                }}
                title="Check Your Order Status"
              />
              <GradientButton
                onPress={this._toShop}
                {...colors.ActivePurple}
                title="Shop Again"
                fontStyle={styles.buttonText}
                style={styles.button}
              />
            </View>
          </View>
        )
      case 'canceled':
        return (
          <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
            <Image
              source={require('@src/assets/icons/payment-failed.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{ ...fontStyle.futuraDemi, fontSize: 24, marginTop: 32 }}>
              Sorry, Your Payment is Failed
            </Text>
            {transaction && transaction.invoice && (
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 14,
                  color: colors.black70,
                  marginTop: 16,
                }}>
                {transaction.invoice}
              </Text>
            )}
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black80,
                marginTop: 16,
              }}>
              {transaction &&
                dayjs(transaction.updated_at)
                  .utcOffset(8)
                  .format('MMMM D[th], HH:mm [WIB] ')}
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                padding: 16,
                width: '100%',
              }}>
              <OutlineButton
                style={{
                  borderColor: colors.blue60,
                  width: '100%',
                  height: 46,
                }}
                onPress={this._toCart}
                fontStyle={{ color: colors.blue60, ...fontStyle.helveticaBold }}
                title="Checkout Your Cart"
              />
            </View>
          </View>
        )
      default:
        return (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('@src/assets/icons/payment-waiting.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{ ...fontStyle.futuraDemi, fontSize: 24, marginTop: 32 }}>
              Waiting for Confirmation
            </Text>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 14,
                color: colors.black70,
                marginTop: 24,
              }}>
              We waiting confirmation payment from operator
            </Text>
            <Text
              style={{
                ...fontStyle.helveticaBold,
                fontSize: 14,
                color: colors.black100,
                marginTop: 24,
              }}>
              {`${countdownTimer?.minutes} Minutes: ${countdownTimer?.seconds} Seconds`}
            </Text>
          </View>
        )
    }
  }
  _redirect = navState => {
    if (navState.url.includes(Config.SHONET_URI)) {
    }
  }
  render() {
    const { route, transaction } = this.props
    return (
      <>
        <NavbarTop
          title="Payment"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <View style={{ flex: 1, marginTop: 32 }}>
          {this._renderComponent(transaction.status || 'unpaid')}
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactionById,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.route.params?.transactionId) {
    return {}
  }

  const transactionId = ownProps.route.params.transactionId
  const transaction = state.transaction.data[transactionId]

  return {
    transactionId,
    transaction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWebView)
