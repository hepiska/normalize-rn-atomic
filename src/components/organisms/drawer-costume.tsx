import React from 'react'
import { View, Text } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text>ini drawer</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default DrawerContent
