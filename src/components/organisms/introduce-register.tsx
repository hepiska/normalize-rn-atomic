import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import { fontStyle } from '../commont-styles'
import { Button } from '../atoms/button'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('screen')

export default class FirstIntroduceRegister extends React.Component<any, any> {
  state = {
    index: 0,
  }

  render() {
    const imgBg =
      this.state.index === 0
        ? require('@assets/placeholder/one-stop.png')
        : require('@assets/placeholder/one-stop-2.png')
    const title =
      this.state.index === 0
        ? 'One Stop\nShopping Network'
        : 'Dapatkan komisi\ninstan dengan satu klik!'
    const desc =
      this.state.index === 0
        ? 'Tempat di mana kamu bisa mendapatkan komisi instan, belanja produk Fashion & Beauty terpopuler, dan membangun koneksi dengan teman-temanmu'
        : 'Share produk favoritmu dan dapatkan komisi instan untuk setiap pembelian dari link-mu'
    const btnTitle = this.state.index === 0 ? 'Next' : 'Shop Now'

    const _triggerButton = () => {
      if (this.state.index === 0) {
        this.setState({
          index: 1,
        })
      } else console.log('shop now')
    }
    return (
      <ImageBackground
        style={{
          height: height,
          width: width,
        }}
        resizeMode="cover"
        source={imgBg}>
        <SafeAreaView
          style={{
            justifyContent: 'flex-end',
            height: height,
          }}>
          <View style={{ padding: 16 }}>
            <Text style={{ ...fontStyle.playfairBold, fontSize: width / 10 }}>
              {title}
            </Text>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 16,
                marginTop: 8,
                marginBottom: 32,
              }}>
              {desc}
            </Text>
            <Button
              onPress={_triggerButton}
              title={btnTitle}
              rightIcon={
                this.state.index !== 0 && (
                  <Icon name={'arrowright'} size={18} color={colors.white} />
                )
              }
              style={{ backgroundColor: colors.black100, height: 48 }}
              fontStyle={{
                color: colors.white,
                ...fontStyle.helveticaBold,
                marginRight: 8,
              }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}
