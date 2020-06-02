import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

const { width } = Dimensions.get('screen')
const imageWidth = 0.4 * width

const styles = StyleSheet.create({
  image: {
    width: imageWidth,
    height: Math.ceil(0.6 * imageWidth),
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    marginBottom: 8,
    height: 32,
  },
  infoText: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  commisionText: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.greenAccent,
  },
})

const PostInsight = (props: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Image
          source={{
            uri:
              'https://shonet.imgix.net/images/collection_1_1590581205113312941.jpg?q=75&auto=compress,format&w=800',
          }}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.infoText}>Total Commision</Text>
        <Text style={styles.commisionText}>{formatRupiah(19000)}</Text>
      </View>
    </View>
  )
}
export default PostInsight
