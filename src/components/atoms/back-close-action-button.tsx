import React from 'react'
import { StyleSheet } from 'react-native'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  leftAction: {
    marginRight: 24,
    width: 46,
    height: 46,
  },
})

const CloseActionButton = props => {
  return (
    <PressAbbleDiv onPress={props.onPress} style={styles.leftAction}>
      <Icon
        name={props.name === 'back' ? 'chevron-left' : 'close'}
        size={20}
        color="black"
      />
    </PressAbbleDiv>
  )
}

export default connect(null, null)(CloseActionButton)
