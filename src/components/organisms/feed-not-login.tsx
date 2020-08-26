import React, { Component } from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import { fontStyle } from '../commont-styles'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'

const RegisterCard = ({ style }: any) => {
  return (
    <ImageBackground
      source={require('@assets/placeholder/p-register.png')}
      style={{
        ...style,
        height: 250,
        backgroundColor: 'red',
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingVertical: 18,
        paddingHorizontal: 16,
      }}>
      <Image
        style={{ width: 100, height: 13, marginBottom: 16 }}
        resizeMethod={'scale'}
        source={require('@assets/icons/the-shonet-logo-white.png')}
      />
      <Text
        style={{
          ...fontStyle.playfairBold,
          color: colors.white,
          fontSize: 26,
          marginBottom: 8,
        }}>
        Stay Update from People {'\n'}You Love
      </Text>
      <Text
        style={{
          ...fontStyle.helvetica,
          fontWeight: '300',
          color: colors.white,
          fontSize: 14,
          marginBottom: 32,
        }}>
        Check out what’s new in The Shonet Feed
      </Text>
      <Button
        title={'REGISTER'}
        onPress={null}
        fontStyle={{
          color: colors.black100,
          ...fontStyle.helveticaBold,
          marginLeft: 0,
        }}
        style={{ backgroundColor: colors.white, width: 120 }}
      />
    </ImageBackground>
  )
}
const Line = () => {
  return (
    <View
      style={{
        borderRadius: 8,
        height: 8,
        backgroundColor: colors.gold100,
        width: 40,
      }}
    />
  )
}
const Placeholder = ({ type }: any) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <ImageBackground
        style={{
          width: 200,
          height: 200,
          marginBottom: 16,
        }}
        resizeMode={'contain'}
        source={
          type === 'follow'
            ? require('@assets/placeholder/p-follow.png')
            : require('@assets/placeholder/p-find.png')
        }
      />
      <Text
        style={{
          ...fontStyle.playfair,
          color: colors.black100,
          fontSize: 18,
          marginBottom: 8,
          height: 70,
          textAlign: 'center',
        }}>
        {type === 'follow'
          ? 'Follow and Get Update from Fashion Influencer'
          : 'Find Products You Love'}
      </Text>
      <Line />
    </View>
  )
}
export default class FeedPlaceholder extends Component {
  render() {
    return (
      <>
        <RegisterCard style={{ marginBottom: 32 }} />
        <Placeholder type={'find'} />
      </>
    )
  }
}
