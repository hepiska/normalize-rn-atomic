import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'
import { navigate } from '@src/root-navigation'

const { width } = Dimensions.get('screen')
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

export default class FeedPlaceholder extends Component<any, any> {
  _renderItem = ({ item }) => {
    console.log('type', item)

    return (
      <View
        style={{
          alignItems: 'center',
          width: width,
          paddingVertical: 32,
        }}>
        <ImageBackground
          style={{
            width: 200,
            height: 200,
            marginBottom: 16,
          }}
          resizeMode={'contain'}
          source={
            item.type === 'find'
              ? require('@assets/placeholder/p-find.png')
              : require('@assets/placeholder/p-follow.png')
          }
        />
        <Text
          style={{
            ...fontStyle.playfair,
            color: colors.black100,
            fontSize: 18,
            marginBottom: 8,
            height: 70,
            width: '80%',
            textAlign: 'center',
          }}>
          {item.desc}
        </Text>
        <Line />
      </View>
    )
  }
  _keyExtractor = (item, index) => {
    return `key-placeholder-${index}`
  }

  _triggerRegister = () => {
    navigate('modals', { screen: 'RegisterModal' })
  }

  render() {
    const { style } = this.props
    const data = [
      {
        type: 'follow',
        desc: 'Follow and Get Update from Fashion Influencer',
      },
      {
        type: 'find',
        desc: 'Find Products You Love',
      },
    ]
    return (
      <View style={{ ...style }}>
        {/* <RegisterCard style={{ marginBottom: 32 }} /> */}
        <FlatList
          style={{ marginBottom: 32 }}
          data={data}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          horizontal
        />
        <Button
          onPress={this._triggerRegister}
          title={'Register Now'}
          style={{
            backgroundColor: colors.black100,
            marginHorizontal: 16,
            height: 46,
          }}
          fontStyle={{
            ...fontStyle.helveticaBold,
            color: colors.white,
          }}
        />
      </View>
    )
  }
}
