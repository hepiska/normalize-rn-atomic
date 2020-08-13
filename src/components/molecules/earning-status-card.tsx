import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { formatCur } from '@utils/helpers'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import dayjs from 'dayjs'
import Tooltip from 'rn-tooltip'
import { stat } from 'react-native-fs'
const { width, height } = Dimensions.get('screen')

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
  invalid: {
    ...fontStyle.helveticaBold,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ' rgba(26, 26, 26, 0.04)',
    borderRadius: 100,
    width: 20,
    height: 20,
  },
  tooltip: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

class EarningStatusCard extends React.PureComponent<EarningStatus, any> {
  defineStatusIcon = (type, status) => {
    if (type === 'earning' && status === 'success') {
      return <Icon name={'plus-circle'} size={20} color={colors.gold100} />
    } else if (type === 'earning' && status === 'pending') {
      return <Icon name={'plus-circle'} size={20} color={colors.black60} />
    } else if (type === 'earning' && status === 'failed') {
      return (
        <Icon name={'exclamation-circle'} size={20} color={colors.black100} />
      )
    }
    return <Icon name={'minus-circle'} size={20} color={colors.green1} />
  }

  defineStatusTilte = (type, status) => {
    if (type === 'earning' && status === 'success') {
      return 'Earning'
    } else if (type === 'earning' && status === 'pending') {
      return 'Pending Earning'
    } else if (type === 'earning' && status === 'failed') {
      return 'Earning Invalid'
    }
    return 'Withdraw'
  }

  defineAmount = (type, status, amount) => {
    if (type === 'withdraw' && status === 'success') {
      return (
        <Text style={styles.withdraw}>- IDR {formatCur(Math.abs(amount))}</Text>
      )
    } else if (status === 'failed') {
      return (
        <Text style={styles.invalid}>IDR {formatCur(Math.abs(amount))}</Text>
      )
    }
    return (
      <Text style={fontStyle.helveticaBold}>
        IDR {formatCur(Math.abs(amount))}
      </Text>
    )
  }
  render() {
    const { created_at, amount, product_name, status, type } = this.props

    const InvalidTooltip = () => {
      return (
        <Tooltip
          actionType="press"
          popover={
            <View style={styles.tooltip}>
              <Text style={{ color: colors.white, flex: 1 }}>
                Earning Invalid • This transaction incomplete because you refund
                the product
              </Text>
              <IconMa name={'close'} size={20} color={colors.white} />
            </View>
          }
          backgroundColor={colors.black80}
          overlayColor={'transparent'}
          height={100}
          width={width - 32}>
          <View style={styles.iconContainer}>
            <Icon name={'exclamation-circle'} size={18} color={colors.red1} />
          </View>
        </Tooltip>
      )
    }
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
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Text
                style={[
                  fontStyle.helveticaBold,
                  {
                    fontSize: 16,
                    marginRight: 4,
                    flexDirection: 'row',
                    textAlignVertical: 'center',
                  },
                ]}>
                {this.defineStatusTilte(type, status)}
              </Text>
              {status === 'failed' ? <InvalidTooltip /> : null}
              <Text
                style={[
                  fontStyle.helveticaThin,
                  { fontSize: 12, marginLeft: 4 },
                ]}>
                {dayjs(created_at).format('DD MMM YYYY hh:mm')}
              </Text>
            </View>

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
            {this.defineAmount(type, status, amount)}
          </View>
        </View>
      </View>
    )
  }
}

export default EarningStatusCard
