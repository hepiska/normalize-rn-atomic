import React from 'react'
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native'
import { formatRupiah } from '@utils/helpers'
import { images as defaultImages, colors } from '@utils/constants'
import { fontStyle } from '../commont-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helveticaBold16: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
  },
})

interface TransactionHistoryType {
  style?: ViewStyle
  index?: number
  type?: string
  data?: any
}

class TransactionHistoryCard extends React.Component<
  TransactionHistoryType,
  any
> {
  state = {
    defaultImage: null,
  }
  render() {
    const { style, index, type, data } = this.props

    let image = defaultImages.product
    let dataMore = []
    if (data && data.length > 0) {
      dataMore.push(
        <Text
          key="transaction-username"
          style={{
            ...styles.helvetica12,
            color: colors.black100,
          }}>
          {data[0].title}
        </Text>,
      )
      if (data.length > 1) {
        dataMore.push(
          <React.Fragment key="transaction-history-wrapper">
            <Text
              key="transaction-username-connection"
              style={{
                ...styles.helvetica12,
                color: colors.black100,
              }}>{` and `}</Text>
            <Text
              key="transcation-history-count"
              style={{
                ...styles.helvetica12,
                fontWeight: '500',
                color: colors.black100,
              }}>
              {data.length - 1 + ' others'}
            </Text>
          </React.Fragment>,
        )
      }
      dataMore.push(
        <Text
          key="transaction-history-end"
          style={{
            ...styles.helvetica12,
            color: colors.black100,
          }}>{` also bought this product`}</Text>,
      )
    }

    return (
      <>
        <View
          style={
            index !== 0 && {
              borderStyle: 'solid',
              borderBottomColor: colors.black50,
              borderBottomWidth: 1,
              width: '100%',
            }
          }
        />
        <View style={{ ...styles.container, ...style }}>
          {type !== 'more' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image source={image} style={styles.image} />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginLeft: 16,
                  }}>
                  <Text
                    style={{ ...styles.helvetica12, color: colors.black100 }}>
                    annamorales buy this product
                  </Text>
                  <View
                    style={{
                      marginTop: 8,
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{ ...styles.helvetica12, color: colors.black70 }}>
                      5 hours ago
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  ...styles.helvetica12,
                  fontWeight: '500',
                  color: colors.greenAccent,
                }}>
                {formatRupiah(12000)}
              </Text>
            </>
          ) : (
            <TouchableOpacity onPress={null}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 12,
                }}>
                {data.length > 0 &&
                  data.map((value, key) => {
                    const img = value.image
                    if (key >= 3) return null
                    return (
                      <View
                        key={`transaction-history-${key}`}
                        style={{
                          borderColor: colors.white,
                          borderRadius: 20,
                          borderWidth: 1,
                          marginLeft: key !== 0 ? -16 : 0,
                        }}>
                        <Image
                          key={`image-transaction-history-${key}`}
                          source={
                            img
                            // note: kalau sudah ada data image harus di rombak
                            // img
                            //   ? { uri: img }
                            //   : require('@src/assets/placeholder/placeholder2.jpg')
                          }
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 20,
                          }}
                        />
                      </View>
                    )
                  })}
                <View style={{ marginLeft: 8, flexDirection: 'row' }}>
                  {dataMore}
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    )
  }
}
export default TransactionHistoryCard
