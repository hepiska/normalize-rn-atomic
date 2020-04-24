import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollDiv } from '@components/atoms/basic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { getTransactionPaymentById } from '@modules/transactions-payments/action'
import GroupPaymentMethod from '@components/molecules/group-payment-method'
import { colors } from '@src/utils/constants'
import { getTransactionById } from '@modules/transaction/action'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
  },
})

class PaymentMethodPage extends Component<any, any> {
  componentDidMount() {
    const {
      orderId,
      getTransactionPaymentById,
      getTransactionById,
    } = this.props

    getTransactionById(orderId)
    getTransactionPaymentById(orderId)
  }
  render() {
    const {
      orderId,
      transactionId,
      transactionPaymentOrder,
      transactionPaymentData,
    } = this.props

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
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <ScrollDiv>
          <View {...styles.container}>
            {Object.keys(groupingPayment).map((value, key) => {
              return (
                <GroupPaymentMethod
                  key={`payment-method-${key}`}
                  item={groupingPayment[value]}
                  title={value}
                  orderId={orderId}
                />
              )
            })}
          </View>
        </ScrollDiv>
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
  const orderId = state.orders.active
  const transactionId = state.transaction.order
  const transactionPaymentOrder = state.transactionsPayments.order
  const transactionPaymentData = state.transactionsPayments.data

  // const groupingPayment = paymentMethods.reduce((total, currentValue) => {
  //   const payment = state.transactionsPayments.data[currentValue]
  //   const groupName = payment.group_payment.replace(/\s+/g, '_')
  //   let _groupName =
  //     groupName === 'Dana' || groupName === 'Gopay' ? 'E_Wallet' : groupName

  //   if (total[_groupName]) {
  //     total[_groupName].push(currentValue)
  //   } else {
  //     total[_groupName] = [currentValue]
  //   }
  //   return total
  // }, {})

  return {
    orderId,
    transactionId,
    transactionPaymentOrder,
    transactionPaymentData,
    // groupingPayment,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodPage)
