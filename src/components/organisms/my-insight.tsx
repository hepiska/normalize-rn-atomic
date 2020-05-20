import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

class MyInsight extends React.Component<any, any> {
  render() {
    return (
      <View style={{ width, flex: 1 }}>
        <Text>my insight</Text>
      </View>
    )
  }
}
export default MyInsight
