import React, { Component } from 'react'
import { Text, View, FlatList, ImageBackground, StyleSheet } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 280,
    zIndex: 2,
  },
})

export default class BannerPromo extends Component {
  _keyExtractor = (item, index) => {
    return `key-featured-promo-${index}`
  }

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 160,
          width: 280,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
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
        <View
          style={{
            zIndex: 3,
            position: 'absolute',
            width: 280,
            height: 160,
            backgroundColor: item.color,
            opacity: 0.3,
          }}></View>
      </View>
    )
  }

  _separator = () => {
    return <View style={{ width: 16 }}></View>
  }

  render() {
    const data = [
      { color: colors.purple1 },
      { color: colors.green2 },
      { color: colors.red1 },
    ]

    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            ...fontStyle.playfair,
            fontWeight: '600',
            color: colors.black100,
            fontSize: 24,
            marginBottom: 24,
          }}>
          {' '}
          Promotions{' '}
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={this._separator}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={this._keyExtractor}
          data={data}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
