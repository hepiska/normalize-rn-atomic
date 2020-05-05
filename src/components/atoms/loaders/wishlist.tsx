import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { Div } from '@components/atoms/basic'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 360,
  },
})

export default class Wishlist extends React.Component<any, any> {
  render() {
    return (
      <>
        <View style={{ ...styles.container, ...this.props.style }}>
          <LottieView
            source={require('./wishlist-loader.json')}
            autoPlay
            loop
          />
        </View>
        <View style={{ ...styles.container, ...this.props.style }}>
          <LottieView
            source={require('./wishlist-loader.json')}
            autoPlay
            loop
          />
        </View>
      </>
    )
  }
}
