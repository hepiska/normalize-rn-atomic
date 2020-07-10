import React from 'react'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { ViewStyle } from 'react-native'
import { fontStyle } from '@components/commont-styles'

const alvabet = '#abcdefghijklmnopqrstuvwxyz'

interface AlvabetSelectorMolType {
  style?: ViewStyle
  onSelect: (ad: string) => void
  available?: string
}

const AlvabetSelectorMol = ({
  style,
  onSelect,
  available,
}: AlvabetSelectorMolType) => {
  const _onPress = al => () => {
    onSelect(al)
  }
  const availSection = available ? available.split('') : alvabet.split('')
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
