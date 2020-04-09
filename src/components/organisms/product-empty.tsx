import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '@utils/constants'

interface ProductEmptyType {
  title?: string
  subtitle?: string
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  title: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    fontWeight: '500',
    color: colors.black70,
  },
})

const ProductEmpty = ({ title, subtitle }: ProductEmptyType) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 250, height: 250 }}
        source={{
          uri:
            'https://shonet.imgix.net/illustrations/theshonet-mix-and-match-1.png?q=75&auto=compress,format&w=400',
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

export default ProductEmpty
