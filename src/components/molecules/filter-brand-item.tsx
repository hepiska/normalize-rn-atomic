import React from 'react'
import { StyleSheet, StyleSheetProperties } from 'react-native'
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

interface brandFilterItemType {
  brand: any
  onPress?: (brand: any) => void
  style?: StyleSheetProperties
  isSelected?: boolean
}

class FilterBrandItem extends React.PureComponent<brandFilterItemType, any> {
  _onPress = () => {
    const { brand, onPress } = this.props
    onPress(brand)
  }

  render() {
    const { style, brand, isSelected } = this.props
    const composeStyle = { ...styles.container, ...style }

    return (
      <PressAbbleDiv
        style={composeStyle}
        padd="16px 0px"
        onPress={this._onPress}
        justify="space-between"
        _direction="row">
        <Font>{brand.name}</Font>
        <Div
          _background={isSelected ? colors.black100 : 'transparent'}
          _border={'1px solid ' + colors.black70}
          radius="4px"
          _width="16px"
          _height="16px">
          {isSelected && <Icon name="check" color="white" />}
        </Div>
      </PressAbbleDiv>
    )
  }
}

// const FilterBrandItem = ({ style, brand, isSelected }: any) => {
//   const composeStyle = { ...styles.container, ...style }
//   return (
//     <PressAbbleDiv
//       style={composeStyle}
//       padd="16px 0px"
//       justify="space-between"
//       _direction="row">
//       <Font>{brand.name}</Font>
//       <Div
//         _background={isSelected ? colors.black100 : 'transparent'}
//         _border={'1px solid ' + colors.black70}
//         radius="4px"
//         _width="16px"
//         _height="16px">
//         {isSelected && <Icon name="check" color="white" />}
//       </Div>
//     </PressAbbleDiv>
//   )
// }

export default FilterBrandItem
