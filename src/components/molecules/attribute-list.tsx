import React, { useState } from 'react'
import { Text } from 'react-native'
import { Div, Font, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import colorString from 'color-string'
import { colors } from '@utils/constants'

import {
  futuraTitleFont,
  helveticaNormalFont,
  fontStyle,
} from '../commont-styles'
import { OutlineButton } from '@components/atoms/button'
import { navigate } from '@src/root-navigation'

// export interface AtributeValueType {
//   label: String
//   id: String
//   metadata: string
// }

// export interface AttributeType {
//   id: number | string
//   label: string
//   values: [AtributeValueType]
// }

interface ColorPaletteCardType {
  attribute: any
  type?: string
  onAttributesChanged(any): void
}

const getAntributesItem = (label: string, data: any, isSelected?: boolean) => {
  switch (label.toLowerCase()) {
    case 'color':
      return (
        <Div
          key={data.id}
          _width="40px"
          _height="40px"
          style={{ marginRight: 16 }}
          _border={`1px solid ${isSelected ? colors.black100 : colors.black50}`}
          radius="20px"
          _background={
            colorString.get(data.metadata) ? data.metadata : 'transparent'
          }
        />
      )
    case 'size':
      return (
        <Div
          key={data.id}
          radius="4px"
          _padding="8px"
          style={{ marginRight: 8 }}
          _border={`1px solid ${
            isSelected ? colors.black100 : colors.black50
          }`}>
          <Font>{data.label}</Font>
          <Div />
        </Div>
      )
    default:
      return null
  }
}

const useAtributes = props => {
  const defaultAtribute: any = {}
  const [selectedAttribute, setselectedAttribute] = useState(defaultAtribute)
  const changeAtribute = attribute => () => {
    let newAttribute: any = {}
    // if (attribute.id === selectedAttribute.id) {
    //   newAttribute = {}
    // } else {
    //   newAttribute = { ...attribute }
    // }

    newAttribute = { ...attribute }

    setselectedAttribute(newAttribute)
    props.onAttributesChanged({
      attribute_id: props.attribute.attribute_id,
      attribute_value_id: attribute.id,
    })
  }

  return [{ selectedAttribute }, { changeAtribute }]
}

const AtributesList = ({
  attribute,
  type = 'large',
  onAttributesChanged,
}: ColorPaletteCardType) => {
  const [{ selectedAttribute }, { changeAtribute }] = useAtributes({
    attribute,
    onAttributesChanged,
  })

  const handleSizeGuide = () => {
    navigate('Screens', {
      screen: 'SizeGuideWebView',
    })
  }

  const { values, label, id } = attribute
  return (
    <Div width="100%" align="flex-start" padd="0px 0px 16px">
      <Div _direction="row" align="flex-end" _margin="8px 0px">
        <Font type="heading" size="18" _margin="0px 8px 0px 0px">
          {label}
        </Font>
        <Text
          style={{ ...fontStyle.helvetica, fontSize: 14, color: colors.gray3 }}>
          {selectedAttribute.label}
        </Text>
      </Div>
      <ScrollDiv horizontal _margin="8px 0px" radius="0px">
        {values.map((option, k) => (
          <PressAbbleDiv
            key={`attribute-list-${k}`}
            onPress={changeAtribute(option)}>
            {getAntributesItem(
              label,
              option,
              selectedAttribute.id === option.id,
            )}
          </PressAbbleDiv>
        ))}
      </ScrollDiv>
      {label.toLowerCase() === 'size' && (
        <PressAbbleDiv onPress={handleSizeGuide} _margin="8px 0">
          <Font
            style={{ textDecorationLine: 'underline', ...fontStyle.helvetica }}>
            Size guide
          </Font>
        </PressAbbleDiv>
      )}
    </Div>
  )
}

export default AtributesList
