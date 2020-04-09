import React from 'react'
import { StyleSheet } from 'react-native'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { helveticaNormalFont } from '../commont-styles'

const styles = StyleSheet.create({
  rightAction: {
    marginLeft: 24,
  },
  leftAction: {
    marginRight: 24,
  },
  fontStyle: {
    fontWeight: '500',
    color: 'white',
  },
  indikator: {
    position: 'absolute',
    height: 16,
    width: 16,
    top: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    right: -6,
  },
})

const CreateActionButton = props => {
  const { onPress } = props
  return (
    <PressAbbleDiv onPress={onPress} style={styles.rightAction}>
      <Font {...helveticaNormalFont} color={colors.black100}>
        Create
      </Font>
    </PressAbbleDiv>
  )
}

export default connect(null, null)(CreateActionButton)
