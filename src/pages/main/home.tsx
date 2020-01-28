import * as React from 'react';
import { View, Text } from 'react-native';
import HorizontalListLookBook from '@components/organism/horzontal-list-lookbook';
import PostTopHorizontalList from '@components/organism/post-top-horizontal-list';

class HomePage extends React.Component<any, any> {
  state = {};

  render() {
    return (
      <View>
        <HorizontalListLookBook />
        <PostTopHorizontalList category_id="36"></PostTopHorizontalList>
      </View>
    );
  }
}

export default HomePage;
