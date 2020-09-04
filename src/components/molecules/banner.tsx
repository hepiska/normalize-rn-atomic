import React, { Component, useState, ReactElement } from 'react'
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'
import { PressAbbleDiv } from '../atoms/basic'
import { fontStyle } from '../commont-styles'
import { setImage as changeImageUri } from '@utils/helpers'

const { width } = Dimensions.get('screen')
const img = '@src/assets/placeholder/bumper.png'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
  },
  h1: {
    ...fontStyle.playfairBold,
    fontSize: 32,
  },
})

interface BannerPropsStyle {
  style?: ViewStyle
  title?: String
  btn?: ReactElement
}

const Banner = (props: BannerPropsStyle) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View style={{ ...props.style, ...styles.wrapper }}>
      <ImageBackground
        style={styles.imgBg}
        resizeMode="cover"
        source={require('@src/assets/placeholder/bumper.png')}
        // source={
        //   typeof img === 'string'
        //     ? {
        //         uri: changeImageUri(img, {
        //           width: width * 2,
        //         }),
        //       }
        //     : require('@src/assets/placeholder/bumper.png')
        // }
      />
      <Text style={styles.h1}> {props.title}</Text>
      {props.btn}
    </View>
  )
}

export default Banner
