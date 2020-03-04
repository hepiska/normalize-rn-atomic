import React from 'react';
import { Dimensions } from 'react-native';
import {
  Div,
  TouchableWithoutFeedback,
  Image,
  Font
} from '@components/atoms/basic';
import { ImageSource } from '@utils/globalInterface';
import PostAuthor from './post-author-icon';

const { width } = Dimensions.get('window');

interface ListItemLookBookProps {
  post: any;
  style?: any;
  onPress?: Function;
}

class PostTopCard extends React.PureComponent<ListItemLookBookProps, any> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress({
        id: this.props.post.id,
        slug: this.props.post.slug,
      });
    }
  };

  render() {
    const {
      post: { image_url, id, user, title, ...post },
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this._onPress} display="flex">
        <Div
          _direction="row"
          _width={width}
          overflow="hidden"
          _margin="0px 16px 0px 0px"
          bg="white"
          radius="8px"
          _height="165px"
          justify="flex-start"
          align="flex-start">
          <Image
            _width="200px"
            _height="150px"
            _flex="2"
            radius="8px"
            source={{ uri: image_url }}
          />
          <Div _direction="column" overflow="hidden" _flex="1">
            <PostAuthor author={user} />
            <Font fontSize="1.5rem" color="#333" _margin="4px 0px">
              {title}
            </Font>
          </Div>
        </Div>
      </TouchableWithoutFeedback>
    );
  }
}

export default PostTopCard;
