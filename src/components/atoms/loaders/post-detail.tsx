import React from 'react'
import { View, ViewStyle, SafeAreaView, StyleSheet } from 'react-native'

import LineLoader from '@components/atoms/loaders/line'
import CircleLoader from '@src/components/atoms/loaders/cirle-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  containermargin: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
})

const ProductDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <LineLoader
        style={{
          height: 25,
          marginTop: 8,
          width: 148,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          marginTop: 16,
          height: 32,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          marginTop: 2,
          height: 32,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 32,
          marginTop: 2,
          width: 240,
          ...styles.containermargin,
        }}
      />
      <View style={{ flexDirection: 'row', ...styles.containermargin }}>
        <CircleLoader r={28} />
        <View>
          <LineLoader
            style={{
              height: 24,
              marginTop: 2,
              width: 240,
              ...styles.containermargin,
            }}
          />
          <LineLoader
            style={{
              height: 32,
              marginTop: 2,
              width: 72,
              ...styles.containermargin,
            }}
          />
        </View>
      </View>
      <LineLoader style={{ height: 218, ...styles.containermargin }} />
      <LineLoader
        style={{
          height: 22,
          marginTop: 24,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 22,
          marginTop: 2,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 22,
          marginTop: 2,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 22,
          marginTop: 2,
          ...styles.containermargin,
        }}
      />
    </SafeAreaView>
  )
}
export default ProductDetailLoader
