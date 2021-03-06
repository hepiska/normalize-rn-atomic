import React, { Component } from 'react'
import { View, StyleSheet, InteractionManager } from 'react-native'
import { ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { getTransactionPaymentById } from '@modules/transactions-payments/action'
import GroupPaymentMethod from '@components/molecules/group-payment-method'
import { colors } from '@src/utils/constants'
import { getTransactionById } from '@modules/transaction/action'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CommonActions } from '@react-navigation/native'
import PaymentLoader from '@src/components/atoms/loaders/payment-method-loader'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
  },
})

class PaymentMethodPage extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  async componentDidMount() {
    const {
      getTransactionPaymentById,
      getTransactionById,
      route,
      transactionId,
    } = this.props

    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })

      const _transactionId = route.params.transactionId || transactionId
      if (_transactionId) {
        getTransactionById(_transactionId)
        getTransactionPaymentById(_transactionId)
      }
    })
  }

  componentDidUpdate(prevProps) {
    const {
      getTransactionPaymentById,
      getTransactionById,
      transactionLoading,
      transactionId,
      transactionData,
    } = this.props
    if (!transactionLoading) {
      if (prevProps.transactionId !== this.props.transactionId) {
        getTransactionById(transactionId)
        getTransactionPaymentById(transactionId)
      }

      if (transactionData && transactionData?.provider_payment_method) {
        this.props.navigation.replace('Screens', {
          screen: 'PaymentWaiting',
          params: {
            transactionId,
            from: 'notification',
            holdOpenWeb: true,
          },
        })
      }
    }
  }

  _toPaymentList = () => {
    if (this.props.route.params.from === 'notification') {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main', params: { screen: 'Notifications' } }],
        }),
      )
    } else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Main', params: { screen: 'Shop' } },
            { name: 'Screens', params: { screen: 'PaymentList' } },
          ],
        }),
      )
    }
  }
  render() {
    const {
      transactionId,
      transactionPaymentOrder,
      transactionPaymentData,
    } = this.props

    const { finishAnimation } = this.state

    const groupingPayment = transactionPaymentOrder.reduce(
      (total, currentValue) => {
        const payment = transactionPaymentData[currentValue]
        const groupName = payment.group_payment.replace(/\s+/g, '_')
        let _groupName =
          groupName === 'Dana' || groupName === 'Gopay' ? 'E_Wallet' : groupName

        if (total[_groupName]) {
          total[_groupName].push(currentValue)
        } else {
          total[_groupName] = [currentValue]
        }
        return total
      },
      {},
    )

    return (
      <>
        <NavbarTop
          title="Payment Method"
          leftAction={
            <PressAbbleDiv
              onPress={this._toPaymentList}
              style={{ marginRight: 24, width: 46, height: 46 }}>
              <Icon
                name="chevron-left"
                size={20}
                onPress={this._toPaymentList}
              />
            </PressAbbleDiv>
          }
        />
        {finishAnimation ? (
          <ScrollDiv>
            <View style={{ ...styles.container }}>
              {Object.keys(groupingPayment).map((value, key) => {
                return (
                  <GroupPaymentMethod
                    key={`payment-method-${key}`}
                    item={groupingPayment[value]}
                    title={value}
                    transactionId={transactionId}
                  />
                )
              })}
            </View>
          </ScrollDiv>
        ) : (
          <PaymentLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactionPaymentById,
      getTransactionById,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const transactionId = state.transaction.active
  const transactionPaymentOrder = state.transactionsPayments.order
  const transactionPaymentData = state.transactionsPayments.data
  const transactionLoading = state.transaction.loading
  const transactionData =
    state.transaction.data[ownProps.route.params.transactionId]

  return {
    transactionId,
    transactionLoading,
    transactionPaymentOrder,
    transactionPaymentData,
    transactionData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodPage)
