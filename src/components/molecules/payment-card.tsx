import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { borderStyle, fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import { GradientButton, Button } from '@components/atoms/button'
import StatusAlert from '@components/atoms/status-alert'
import { setImage, formatRupiah } from '@utils/helpers'
import day from 'dayjs'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'

const statusToIcon = status => {
  switch (status.toLowerCase()) {
    case 'unpaid':
    case 'waiting':
      return 'stopwatch'
  }
}

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.black50,
  },
  smallFont: {
    ...fontStyle.helvetica,
    fontSize: 10,
    marginBottom: 4,
    color: colors.black70,
  },
  boldFont: {
    ...fontStyle.helveticaBold,
    fontWeight: '700',
    marginBottom: 16,
    fontSize: 14,
    color: colors.black80,
  },
  margin: {
    marginVertical: 8,
  },
})

class PaymentCard extends React.PureComponent<any, any> {
  _getAction = provider_payment_method => {
    return !provider_payment_method
      ? () => {
          navigate('PaymentMethod', {
            transactionId: this.props.transaction.id,
          })
        }
      : () => {
          navigate('PaymentWaiting', {
            transactionId: this.props.transaction.id,
            holdOpenWeb: true,
          })
        }
  }
  render() {
    const { transaction } = this.props
    const { provider_payment_method } = transaction
    const date: any = day(transaction.expiring_at)
    const title = provider_payment_method ? 'Pay Now' : 'Choose Payment Method'
    const isActive = new Date() < new Date(transaction.expiring_at)
    // console.log(isActive)
    // const isActive = true

    return (
      <View style={{ padding: 16, ...borderStyle.all, marginBottom: 16 }}>
        <StatusAlert
          style={{ marginBottom: 8 }}
          icon={statusToIcon(transaction.status)}
          status={transaction.status}
          text={'Pay before ' + day(date).format('MMMM DD, HH:mm') + ' WIB'}
        />
        <View style={{ ...styles.margin, flexDirection: 'row' }}>
          {provider_payment_method ? (
            <Image
              style={styles.image}
              source={{
                uri: setImage(provider_payment_method.image, {
                  width: 56,
                  height: 42,
                }),
              }}
            />
          ) : (
            <View style={styles.image} />
          )}
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.smallFont}>Payment Total</Text>
            <Text style={styles.boldFont}>
              {formatRupiah(
                transaction.total_amount +
                  transaction.shipping_cost +
                  transaction.total_insurance_cost +
                  (transaction.provider_payment_method?.total_fee || 0),
              )}
            </Text>
            {Boolean(transaction.va_number) && (
              <>
                <Text style={styles.smallFont}>Virtual Account Number</Text>
                <Text style={styles.boldFont}>{transaction.va_number}</Text>
              </>
            )}
            <Text style={styles.smallFont}>Payment Method</Text>
            {Boolean(transaction.provider_payment_method) ? (
              <Text style={{ ...styles.boldFont, fontWeight: '500' }}>
                {transaction.provider_payment_method.channel}
              </Text>
            ) : (
              <Text style={{ ...styles.boldFont, fontWeight: '500' }}>-</Text>
            )}
          </View>
        </View>
        <Button
          disabled={!isActive}
          style={{ paddingVertical: 16, backgroundColor: colors.black100 }}
          onPress={this._getAction(provider_payment_method)}
          title={title}
          fontStyle={{
            color: colors.white,
            ...fontStyle.helveticaBold,
            fontSize: 14,
            marginLeft: provider_payment_method ? 10 : 0,
          }}
          leftIcon={
            provider_payment_method ? (
              <Icon name="lock" color={colors.white} size={14} />
            ) : null
          }
        />
        {/* <GradientButton
          {...colors.ActivePurple}
          disabled={!isActive}
          style={{ paddingVertical: 16 }}
          onPress={this._getAction(provider_payment_method)}
          title={title}
          fontStyle={{
            color: colors.white,
            ...fontStyle.helveticaBold,
            fontSize: 14,
          }}
        /> */}
      </View>
    )
  }
}

export default PaymentCard
