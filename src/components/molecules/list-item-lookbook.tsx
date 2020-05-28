import React from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import { ImageSource } from '@utils/globalInterface'
import ImageAutoSchale from '@components/atoms/image-autoschale'

interface ListItemLookBookProps {
  id: String
  slug: String
  imageUri?: ImageSource
  title?: String
  style?: ViewStyle
  onPress?: Function
}

class ListItemLookBook extends React.PureComponent<ListItemLookBookProps, any> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress({ id: this.props.id, slug: this.props.slug })
    }
  }

  render() {
    const { imageUri, title, style } = this.props
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={{ marginRight: 16, ...style }}>
          <ImageAutoSchale
            width={132}
            style={{ borderRadius: 8 }}
            height={235}
            errorStyle={{ width: 132, height: 235 }}
            source={imageUri}
          />
          <Font fontSize="1.5rem" color="#333" _margin="4px 0px">
            {title}
          </Font>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ListItemLookBook
