import React from 'react'
import { Div, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'

interface ColorList {
  selectedId: any
  data: any
  onChange: any
}

const ColorList = ({ selectedId, data, onChange }: ColorList) => {
  return (
    <Div _direction="row" justify="flex-start">
      <ScrollDiv horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <PressAbbleDiv key={index} onPress={onChange(item, data, index)}>
            <Div
              _width="20px"
              _height="20px"
              _margin="8px 4px 0px"
              _border={`2px solid ${
                selectedId === item.id ? colors.black90 : colors.black50
              }`}
              radius="20px"
              _background={item.metadata}
            />
          </PressAbbleDiv>
        ))}
      </ScrollDiv>
    </Div>
  )
}

export default ColorList
