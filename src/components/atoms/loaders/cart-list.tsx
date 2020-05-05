import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LottieView from 'lottie-react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 195,
  },
})

export default class CartListLoader extends React.Component<any, any> {
  render() {
    return (
      <>
        <View style={{ ...styles.container, ...this.props.style }}>
          <LottieView
            source={require('./cart-list-loader.json')}
            autoPlay
            loop
          />
        </View>
        <View style={{ ...styles.container, ...this.props.style }}>
          <LottieView
            source={require('./cart-list-loader.json')}
            autoPlay
            loop
          />
        </View>
      </>
    )
  }
}
