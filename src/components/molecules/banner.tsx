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
import { fontStyle } from '../commont-styles'
import { setImage as changeImageUri } from '@utils/helpers'

const { width } = Dimensions.get('screen')
const img = '@src/assets/placeholder/bumper.png'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imgBg: {
    width: width,
    backgroundColor: colors.black50,
  },
  h1: {
    ...fontStyle.playfairBold,
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  h2: {
    ...fontStyle.helvetica,
    fontSize: 14,
    textAlign: 'center',
  },
})

interface BannerPropsStyle {
  style?: ViewStyle
  title?: string
  desc?: string
  btnTitle?: string
  img?: string
  onPress?: () => void
}

const Banner = (props: BannerPropsStyle) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View onLayout={_setLayout}>
      <ImageBackground
        style={{ ...props.style, ...styles.imgBg, ...styles.wrapper }}
        resizeMode="cover"
        source={
          typeof img === 'string'
            ? {
                uri: changeImageUri(img, {
                  width: width * 2,
                }),
              }
            : require('@src/assets/placeholder/bumper.png')
        }>
        <Text style={styles.h1}> {props.title}</Text>
        <Text style={styles.h2}> {props.desc}</Text>
        <Button
          onPress={props.onPress}
          title={props.btnTitle}
          style={{
            position: 'absolute',
            bottom: 24,
            backgroundColor: colors.black100,
            width: 150,
            height: 46,
          }}
          fontStyle={{ marginLeft: 0, color: colors.white }}
        />
      </ImageBackground>
    </View>
  )
}

export default Banner
