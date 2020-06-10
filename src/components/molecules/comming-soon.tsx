import React from 'react'
import { Div, Font } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import FocusContainer from '@components/molecules/focus-container'

const CommingSoonPlaceholder: React.FC<{}> = () => {
  return (
    <FocusContainer style={{ padding: 16 }}>
      <Font
        style={{ ...fontStyle.futuraDemi }}
        colors={colors.black100}
        size={24}>
        Comming Soon
      </Font>
    </FocusContainer>
  )
}

export default CommingSoonPlaceholder
