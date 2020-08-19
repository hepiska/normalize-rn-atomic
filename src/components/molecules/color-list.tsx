import React from 'react'
import colorString from 'color-string'
import { Div, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'

interface ColorList {
  selectedId: any
  data: any
  onChange: any
}

const ColorList = ({ selectedId, data, onChange }: ColorList) => {
  return (
    <Div _direction="row" justify="flex-start">
      {data.map((item, index) => (
        <PressAbbleDiv
          key={`color-list-${index}`}
          onPress={onChange(item, index)}>
          <Div
            _width="20px"
            _height="20px"
            _margin="8px 8px 0px 0px"
            _border={`1px solid ${
              selectedId === item.id ? colors.black90 : colors.black50
            }`}
            radius="20px"
            _background={
              colorString.get(item.metadata) ? item.metadata : '#fff'
            }
          />
        </PressAbbleDiv>
      ))}
    </Div>
  )
}

export default ColorList
