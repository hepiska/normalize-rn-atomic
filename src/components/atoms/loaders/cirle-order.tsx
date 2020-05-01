import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { Div } from '@components/atoms/basic'

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
})

export default class OrderLoader extends React.Component<any, any> {
  render() {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <LottieView source={require('./cirle-loader.json')} autoPlay loop />
        <LottieView source={require('./cirle-loader.json')} autoPlay loop />
      </View>
    )
  }
}
