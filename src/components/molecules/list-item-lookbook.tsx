import React from 'react';
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic';
import { ImageSource } from '@utils/globalInterface';

interface ListItemLookBookProps {
  id: String;
  slug: String;
  imageUri?: ImageSource;
  title?: String;
  onPress?: Function;
}

class ListItemLookBook extends React.PureComponent<ListItemLookBookProps, any> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress({ id: this.props.id, slug: this.props.slug });
    }
  };

  render() {
    const { imageUri, title } = this.props;
    return (
      <PressAbbleDiv
        _width="174px"
        _height="351px"
        onPress={this._onPress}
        _padding="0px 16px 0px 0px"
        justify="flex-start"
        align="flex-start">
        <Image _width="159px" _height="282px" radius="8px" source={imageUri} />
        <Font fontSize="1.5rem" color="#333" _margin="4px 0px">
          {title}
        </Font>
      </PressAbbleDiv>
    );
  }
}

export default ListItemLookBook;
