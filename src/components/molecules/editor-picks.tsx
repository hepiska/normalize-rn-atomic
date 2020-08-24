import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { TouchableItem } from 'react-native-tab-view'

const Item = ({ item }) => {
  return (
    <TouchableOpacity onPress={null}>
      <Text
        style={{
          lineHeight: 22,
          textDecorationLine: 'underline',
          textDecorationColor: colors.black60,
          color: colors.black60,
          fontSize: 18,
          marginBottom: 16,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

interface EditorPickType {
  data?: ReadonlyArray<any>
}

export default class EditorPicks extends Component<EditorPickType, any> {
  render() {
    const { data } = this.props
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: colors.black10,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              ...fontStyle.playfair,
              fontSize: 24,
            }}>
            {' '}
            Editor's {'\n'} Pick:{' '}
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.black50,
            }}></View>
        </View>
        <View style={{ marginTop: 24 }}>
          {data.map((item, x) => {
            return <Item item={item} />
          })}
        </View>
      </View>
    )
  }
}
