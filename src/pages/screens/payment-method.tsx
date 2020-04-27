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
  async componentDidMount() {
    const {
      getTransactionPaymentById,
      getTransactionById,
      route,
      transactionId,
    } = this.props

    const _transactionId = route.params.transactionId || transactionId
    if (_transactionId) {
      getTransactionById(_transactionId)
      getTransactionPaymentById(_transactionId)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      getTransactionPaymentById,
      getTransactionById,
      transactionLoading,
      transactionId,
    } = this.props
    if (!transactionLoading) {
      if (prevProps.transactionId !== this.props.transactionId) {
        getTransactionById(transactionId)
        getTransactionPaymentById(transactionId)
      }
    }
  }
  render() {
    const {
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
                  transactionId={transactionId}
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
  const transactionId = state.transaction.active
  const transactionPaymentOrder = state.transactionsPayments.order
  const transactionPaymentData = state.transactionsPayments.data
  const transactionLoading = state.transaction.loading

  return {
    transactionId,
    transactionLoading,
    transactionPaymentOrder,
    transactionPaymentData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodPage)
