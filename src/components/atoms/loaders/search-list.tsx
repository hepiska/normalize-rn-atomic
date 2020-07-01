import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView, StyleSheet } from 'react-native'
import SearchFilterLoader from './search-filter-loader'
import ProductCardLoader from './product-card'
import Line from './line'
import Circle from './cirle'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  buttonStyle: { height: 32, width: 64, marginRight: 16 },
})

const SearchListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <Line style={{ height: 32, marginVertical: 8 }} />
      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
        <Line style={styles.buttonStyle} />
        <Line style={styles.buttonStyle} />
        <Line style={styles.buttonStyle} />
        <Line style={styles.buttonStyle} />
      </View>

      <View style={{ alignItems: 'center', marginTop: 64 }}>
        <Circle r={80} />
        <Line style={{ height: 32, marginVertical: 8, width: 200 }} />
        <Line style={{ height: 24, marginVertical: 8, width: 240 }} />
        <Line style={{ height: 24, width: 200 }} />
      </View>
    </SafeAreaView>
  )
}
export default SearchListLoader
