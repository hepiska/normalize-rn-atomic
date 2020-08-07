import React from 'react'
import { View, ViewStyle, SafeAreaView, StyleSheet } from 'react-native'

import LineLoader from '@components/atoms/loaders/line'
import ReferalStatusCard from './earning-status-card'
import CircleLoader from '@src/components/atoms/loaders/circle-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  containermargin: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
})

const ReferralPage = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <LineLoader style={{ height: 104 }} />
      <LineLoader
        style={{
          height: 20,
          ...styles.containermargin,
          marginTop: 25,
          width: 120,
        }}
      />
      <LineLoader
        style={{
          height: 12,
          ...styles.containermargin,
          width: 160,
          marginTop: 0,
        }}
      />
      <ReferalStatusCard style={styles.containermargin} />
    </SafeAreaView>
  )
}
export default ReferralPage
