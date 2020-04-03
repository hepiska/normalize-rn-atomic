import React from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
// impo

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black90,
    width: '100%',
    borderStyle: 'solid',
  },
})

export enum SelectorShapeType {
  circle = 'cirle',
  square = 'square',
}

export enum sizeType {
  circle = 'small',
  square = 'medium',
}

interface SelectAbleItemType {
  item: any
  fontStyle?: TextStyle
  onPress?: (brand: any) => void
  style?: ViewStyle
  isSelected?: boolean
  selectorShape?: SelectorShapeType
}

class SelectAbleItem extends React.PureComponent<SelectAbleItemType, any> {
  _onPress = () => {
    const { item, onPress } = this.props
    onPress(item)
  }

  getRadius = shape => {
    switch (shape) {
      case 'cirle':
        return '8px'

      default:
        return '4px'
    }
  }

  render() {
    const {
      style,
      item,
      isSelected,
      selectorShape = 'square',
      fontStyle,
    } = this.props
    const composeStyle = { ...styles.container, ...style }

    return (
      <PressAbbleDiv
        style={composeStyle}
        padd="16px 0px"
        onPress={this._onPress}
        justify="space-between"
        _direction="row">
        <Font style={fontStyle}>{item && item.name}</Font>
        <Div
          _background={isSelected ? colors.black100 : 'transparent'}
          _border={'1px solid ' + colors.black70}
          radius={this.getRadius(selectorShape)}
          _width="16px"
          _height="16px">
          {isSelected && <Icon name="check" color="white" />}
        </Div>
      </PressAbbleDiv>
    )
  }
}

export default SelectAbleItem