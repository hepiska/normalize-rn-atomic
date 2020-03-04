import React from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native'

function flatlistitemHoc(WrappedComponent) {
  return class ImageItem extends React.PureComponent<any> {
    _onPress = () => {
      if (typeof this.props.onPress === 'function') {
        this.props.onPress(this.props.id)
      }
    }

    render() {
      return (
        <TouchableWithoutFeedback onPress={this._onPress}>
          <View>
            <WrappedComponent {...this.props} />
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }
}

export default flatlistitemHoc
