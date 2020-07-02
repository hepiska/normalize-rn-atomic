import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect, useSelector, useDispatch, batch } from 'react-redux'
import { navigate, dispatch } from '@src/root-navigation'
import { bindActionCreators } from 'redux'
import { fontStyle } from '@src/components/commont-styles'
import { getAllTransactionCount } from '@modules/transaction/action'
import { getOrderCount } from '@modules/order/action'
import { getTransactionCountSelector } from '@modules/transaction/selector'
import { selectOrderCount } from '@modules/order/selector'

import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  absoluteCount: {
    position: 'absolute',
    top: 0,
    right: 12,
  },
})

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

const onPressStatusOrder = (filter, screenName) => () => {
  navigateTo('Screens', screenName, {
    selectedFilter: filter,
    hideHeader: true,
  })
}

const myOrder = [
  {
    label: 'Waiting for Payment',
    type: 'transaction',
    status: 'pending',
    image: require('@src/assets/icons/waiting-for-payment.png'),
    filterTransaction: ['unpaid', 'waiting'],
    screenName: 'PaymentList',
  },
  {
    label: 'In Process',
    type: 'order',
    image: require('@src/assets/icons/in-process.png'),
    filterTransaction: 'confirmed',
    screenName: 'OrderList',
  },
  {
    label: 'Sent',
    type: 'order',
    image: require('@src/assets/icons/sent.png'),
    filterTransaction: 'shipping',
    screenName: 'OrderList',
  },
  {
    label: 'Done',
    type: 'order',
    image: require('@src/assets/icons/done.png'),
    filterTransaction: 'completed',
    screenName: 'OrderList',
  },
]

const TransactionOrderAction = props => {
  const dispatch = useDispatch()
  const { count: transactioncount } = useSelector(getTransactionCountSelector)
  const { count: orderCount } = useSelector(selectOrderCount)

  const pendingTransaction = 'unpaid,waiting'.split(',').reduce((acc, dat) => {
    acc += transactioncount[dat]
    return acc
  }, 0)
  useEffect(() => {
    batch(() => {
      dispatch(getAllTransactionCount({ status: 'unpaid,waiting' }))
      dispatch(getOrderCount('confirmed'))
      dispatch(getOrderCount('shipping'))
      dispatch(getOrderCount('completed'))
    })
  }, [])
  return (
    <View
      style={{
        marginTop: 17,
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
      }}>
      {myOrder.map((value, key) => {
        let count = 0
        if (value.type === 'transaction') {
          count = pendingTransaction || 0
        } else {
          count = orderCount[value.filterTransaction] || 0
        }
        return (
          <TouchableOpacity
            key={`myorder-${key}`}
            onPress={onPressStatusOrder(
              value.filterTransaction,
              value.screenName,
            )}>
            <View
              style={{
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                width: 82,
              }}>
              <View
                style={{
                  marginBottom: 8,
                }}>
                <Image style={{ width: 40, height: 40 }} source={value.image} />
              </View>
              <Text
                style={{
                  ...styles.helvetica10,
                  color: colors.black100,
                  textAlign: 'center',
                }}>
                {value.label}
              </Text>
              <View style={styles.absoluteCount}>
                <Text style={styles.helvetica10}>{count}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TransactionOrderAction
