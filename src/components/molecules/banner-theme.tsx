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
  bannerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black50,
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
    ...fontStyle.playfairMedium,
    fontSize: 28,
    color: colors.black100,
  },
  p: {
    textAlign: 'center',
    color: colors.black70,
    fontSize: 14,
    paddingHorizontal: 54,
    marginTop: 8,
  },
  btn: {
    backgroundColor: colors.black100,
    marginTop: 32,
  },
  btnText: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.white,
  },
})

interface BannerPropsStyle {
  bannerStyle?: ViewStyle
  title?: String
  desc?: String
  onPress?: () => void
}

const BannerTheme = (props: BannerPropsStyle) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ ...props.bannerStyle, ...styles.bannerWrap }}>
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
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 24,
        }}>
        <Text style={styles.h1}>{props?.title}</Text>
        <Text style={styles.p}>{props?.desc}</Text>
        <PressAbbleDiv
          padd="16px 48px"
          _direction="row"
          radius="8px"
          style={styles.btn}
          onPress={props.onPress}>
          <Text style={styles.btnText}>Shop Now</Text>
        </PressAbbleDiv>
      </View>
    </View>
  )
}

export default BannerTheme
