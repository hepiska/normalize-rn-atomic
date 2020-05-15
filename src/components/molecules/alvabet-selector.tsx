import React from 'react'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'

const alvabet = '#abcdefghijklmnopqrstuvwxyz'

const AlvabetSelectorMol = ({ style, onSelect, available }: any) => {
  const _onPress = al => () => {
    onSelect(al)
  }
  const availSection = available.split('') || alvabet.split('')
  return (
    <Div _height={32} style={style}>
      <ScrollDiv horizontal justify="flex-start">
        {availSection.map((al, k) => (
          <PressAbbleDiv
            key={`alphabeth-${k}`}
            _padding="8px"
            onPress={_onPress(al)}>
            <Font style={fontStyle.helvetica}>{al.toUpperCase()}</Font>
          </PressAbbleDiv>
        ))}
      </ScrollDiv>
    </Div>
  )
}

export default AlvabetSelectorMol
