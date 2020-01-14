import * as React from 'react'
import { View, Text } from 'react-native'
import HorizontalListLookBook from '@components/organism/horzontal-list-lookbook'

class HomePage extends React.Component<any, any>{
  state = {

  }

  render() {
    return (
      <View>
        <HorizontalListLookBook />
      </View>
    )
  }

}


export default HomePage