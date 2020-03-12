import React from 'react'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'

const alvabet = '#abcdefghijklmnopqrstuvwxyz'

const AlvabetSelectorMol = ({ style, onSelect }: any) => {
  const _onPress = al => () => {
    onSelect(al)
  }
  return (
    <Div style={style} _height={32}>
      <ScrollDiv horizontal justify="flex-start">
        {alvabet.split('').map(al => (
          <PressAbbleDiv key={al} _padding="8px" onPress={_onPress(al)}>
            <Font>{al.toUpperCase()}</Font>
          </PressAbbleDiv>
        ))}
      </ScrollDiv>
    </Div>
  )
}

export default AlvabetSelectorMol
