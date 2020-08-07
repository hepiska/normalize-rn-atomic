import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { formatCur } from '@utils/helpers'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import dayjs from 'dayjs'

interface EarningStatus {
  created_at?: any
  amount?: number
  product_name?: string
  status?: string
  type?: string
}

const styles = StyleSheet.create({
  withdraw: {
    ...fontStyle.helveticaBold,
    color: colors.green1,
  },
})

class EarningStatusCard extends React.PureComponent<EarningStatus, any> {
  defineStatusIcon = (type, status) => {
    if (type === 'earning' && status === 'success') {
      return <Icon name={'plus-circle'} size={20} color={colors.darkCream} />
    } else if (type === 'earning' && status === 'pending') {
      return <Icon name={'plus-circle'} size={20} color={colors.black70} />
    } else {
      return <Icon name={'minus-circle'} size={20} color={colors.green1} />
    }
  }

  defineStatusTilte = (type, status) => {
    if (type === 'earning' && status === 'success') {
      return 'Earnings'
    } else if (type === 'earning' && status === 'pending') {
      return 'Pending Earnings'
    } else {
      return 'Withdraw'
    }
  }
  render() {
    const { created_at, amount, product_name, status, type } = this.props

    return (
      <View
        style={{
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              padding: 12,
              borderColor: colors.black10,
              borderWidth: 1,
              borderRadius: 4,
              marginRight: 8,
            }}>
            {this.defineStatusIcon(type, status)}
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text
              style={[
                fontStyle.helveticaBold,
                { marginBottom: 4, fontSize: 16 },
              ]}>
              {this.defineStatusTilte(type, status)}{' '}
              <Text style={[fontStyle.helveticaThin, { fontSize: 12 }]}>
                {dayjs(created_at).format('DD MMM YYYY hh:mm')}
              </Text>
            </Text>
            {type === 'withdraw' ? (
              <Text style={fontStyle.helvetica}>Your withdrawal completed</Text>
            ) : (
              <Text style={fontStyle.helvetica}>
                From Product "
                {product_name.length > 18
                  ? product_name.substring(0, 18 - 3) + '...'
                  : product_name}
                "
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            {type === 'withdraw' ? (
              <Text style={styles.withdraw}>
                - IDR {formatCur(Math.abs(amount))}
              </Text>
            ) : (
              <Text style={fontStyle.helveticaBold}>
                IDR {formatCur(Math.abs(amount))}
              </Text>
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default EarningStatusCard
