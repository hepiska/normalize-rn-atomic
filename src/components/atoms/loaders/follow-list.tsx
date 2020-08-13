import React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import FollowItem from './follow-item'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
  showheader?: boolean
}

const styles = StyleSheet.create({
  menu: {
    height: 32,
    width: 102,
  },
})

const FollowList = (props: LoaderPropsType) => {
  return (
    <View style={props.style}>
      {props.showheader && (
        <>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <LineLoader style={{ height: 48, marginBottom: 16 }} />
            </View>
            <View style={{ flex: 1 }}>
              <LineLoader style={{ height: 48, marginBottom: 16 }} />
            </View>
          </View>
          <LineLoader style={{ height: 32, marginBottom: 24 }} />
        </>
      )}
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
    </View>
  )
}
export default FollowList
