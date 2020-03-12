import * as React from 'react'
import { View, Text } from 'react-native'
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook'
import PostTopHorizontalList from '@components/organisms/post-top-horizontal-list'

class HomePage extends React.Component<any, any> {
  state = {}

  render() {
    return (
      <View>
        {/* <HorizontalListLookBook /> */}
        <PostTopHorizontalList category_id="6" />
      </View>
    )
  }
}

export default HomePage
