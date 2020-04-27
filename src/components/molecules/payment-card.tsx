import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { borderStyle, fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import { GradientButton } from '@components/atoms/button'
import StatusAlert from '@components/atoms/status-alert'
import { setImage, formatRupiah } from '@utils/helpers'
import day from 'dayjs'
import { withNavigation } from 'react-navigation'

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
    marginBottom: 16,
    fontSize: 10,
    color: colors.black100,
  },
  margin: {
    marginVertical: 8,
  },
})

class PaymentCard extends React.PureComponent<any, any> {
  _getAction = provider_payment_method => {
    return !provider_payment_method
      ? () => {
          console.log('++++++')
          navigate('PaymentMethod', {
            transactionId: this.props.transaction.id,
          })
        }
      : () => {
          navigate('PaymentWaiting', {
            transactionId: this.props.transaction.id,
          })
        }
  }
  render() {
    const { transaction } = this.props
    const { provider_payment_method } = transaction
    const date: any = day(transaction.expiring_at)
    const title = provider_payment_method
      ? 'How To Pay'
      : 'Choose Payment Method'

    return (
      <View style={{ padding: 16, ...borderStyle.all, marginBottom: 16 }}>
        <StatusAlert
          style={styles.margin}
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
              {formatRupiah(transaction.total_amount)}
            </Text>
            {Boolean(transaction.va_number) && (
              <>
                <Text style={styles.smallFont}>Virtual Account Number</Text>
                <Text style={styles.boldFont}>{transaction.va_number}</Text>
              </>
            )}
            <Text style={styles.smallFont}>Payment Method</Text>
            {Boolean(transaction.provider_payment_method) ? (
              <Text style={styles.boldFont}>
                {formatRupiah(transaction.total_amount)}
              </Text>
            ) : (
              <Text style={styles.boldFont}>-</Text>
            )}
          </View>
        </View>
        <GradientButton
          {...colors.ActivePurple}
          style={{ paddingVertical: 16 }}
          onPress={this._getAction(provider_payment_method)}
          title={title}
          fontStyle={{
            color: colors.white,
            ...fontStyle.helveticaBold,
            fontSize: 14,
          }}
        />
      </View>
    )
  }
}

export default PaymentCard
