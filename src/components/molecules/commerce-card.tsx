import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native'
import { Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { calculateDay, formatRupiah } from '@utils/helpers'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'

const { width, height } = Dimensions.get('screen')

interface CommerceCardType {
  commerce: any
  idx: number
  style?: ViewStyle
  navigation?: any
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
})

class CommerceCard extends React.PureComponent<CommerceCardType, any> {
  handleSeeOrder = () => {
    const { commerce, navigation } = this.props
    if (commerce.target.type === 'order') {
      return navigate('Screens', {
        screen: 'OrderDetails',
        params: {
          orderId: commerce.target.data.id,
        },
      })
    }
    if (commerce.target.type === 'transaction') {
      if (commerce.action === 'COMMERCE_TRANSACTION_PAID') {
        navigation.replace('Screens', {
          screen: 'PaymentWaiting',
          params: {
            transactionId: commerce.target.data.id,
            from: 'notification',
          },
        })
      } else {
        navigation.replace('Screens', {
          screen: 'PaymentMethod',
          params: {
            transactionId: commerce.target.data.id,
            from: 'notification',
          },
        })
      }
    }
  }
  renderStatusCommerce = () => {
    const { commerce } = this.props
    let status = ''
    let description = ''

    if (commerce.action === 'COMMERCE_TRANSACTION_CREATE') {
      status = 'Transaksi Berhasil'
      description =
        'Ayo lakukan pembayaran secepatnya biar pesanan Kamu bisa langsung diproses.'
    } else if (commerce.action === 'COMMERCE_ORDER_COMPLETE') {
      status = 'Pesanan selesai'
      description = `Pesanan ${commerce.target.data.invoice_no} telah selesai dan dana akan diteruskan ke Penjual. Terima kasih sudah berbelanja di The Shonet.`
    } else if (commerce.action === 'COMMERCE_TRANSACTION_CANCELLED') {
      status = 'Transaksi Dibatalkan'
      description = `Yah.. pesanan id ${commerce.target.data.id} Kamu sudah melewati batas waktu pembayaran. Ayo pesan lagi barang yang sama disini.`
    } else if (commerce.action === 'COMMERCE_TRANSACTION_PAID') {
      status = 'Pembayaran diterima'
      description = `Terima kasih telah melakukan pembayaran sebesar ${formatRupiah(
        commerce.target.data.amount,
      )}. Pesanan kamu sudah diteruskan ke Penjual.`
    } else if (commerce.action === 'COMMERCE_ORDER_CANCEL') {
      status = 'Pesanan dibatalkan'
      description = `Waduh.. Penjual tidak dapat memproses pesanan  ${formatRupiah(
        commerce.target.data.amount,
      )}. Klik disini untuk melihat alasannya.`
    } else if (commerce.action === 'COMMERCE_ORDER_IN_PROCCESS') {
      status = 'Pesanan sedang diproses'
      description = `Pesanan Kamu sudah dikonfirmasi, ayo cek status pesanan Kamu sekarang.`
    } else if (commerce.action === 'COMMERCE_ORDER_IN_DELIVERY') {
      status = 'Pesanan sedang dikirim'
      description = `Pesanan  ${commerce.target.data.invoice_no} sudah diserahkan ke kurir dan dalam proses pengiriman. Klik disini untuk melihat detail pengiriman.`
    } else if (commerce.action === 'COMMERCE_ORDER_ARRIVE') {
      status = 'Pesanan sudah sampai'
      description = `Pesanan Kamu telah sampai ke tujuan, ayo segera konfirmasi pesanan kamu.`
    } else if (commerce.action === 'COMMERCE_ORDER_COMPLAINT') {
      status = 'Pesanan dikomplain'
      description = `Komplain untuk pesanan ${commerce.target.data.invoice_no} sudah kami terima. Harap menunggu investigasi dari tim kami.`
    } else if (commerce.action === 'COMMERCE_ORDER_REFUND') {
      status = 'Pengembalian dana'
      description = `Pengembalian dana disetujui, kami akan memproses pengembalian dana kamu.`
    } else {
      status = 'belum ada'
    }
    return (
      <Text
        style={{
          ...fontStyle.helvetica,
          color: colors.black80,
          fontSize: 14,
          flex: 9,
        }}>
        <Text
          style={{
            ...fontStyle.helveticaBold,
            fontWeight: '700',
            fontSize: 14,
            color: colors.black100,
          }}>
          {status}
        </Text>
        {` ${description} `}
        <TouchableWithoutFeedback onPress={this.handleSeeOrder}>
          <Text
            style={{
              ...fontStyle.helvetica,
              color: colors.black80,
              fontSize: 14,
              borderColor: '#d6d6d6',
              borderWidth: 1,
              textDecorationLine: 'underline',
              textDecorationColor: '#d6d6d6',
            }}>
            {`"Lihat Pesanan"`}
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    )
  }
  render() {
    const { commerce, idx, style } = this.props
    const img = commerce.image_url
    const defaultStyle = { ...styles.container, ...style }
    return commerce ? (
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={{ ...defaultStyle }}>
          <View style={{ flexDirection: 'row' }}>
            {this.renderStatusCommerce()}
            <Image
              key={`image-commerce-${idx}`}
              source={
                img
                  ? { uri: img }
                  : require('@src/assets/placeholder/placeholder2.jpg')
              }
              style={{ ...styles.image }}
            />
          </View>

          <Text
            style={{
              ...fontStyle.helveticaBold,
              color: '#565656',
              fontSize: 14,
            }}>
            {calculateDay(commerce.updated_at)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    ) : null
  }
}

export default CommerceCard
