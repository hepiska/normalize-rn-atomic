import React, { ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native'
import { colors } from '@src/utils/constants'

interface ContainerType {
  children: ReactElement
  style?: ViewStyle
  onPress?: () => void
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.black10,
    borderColor: colors.black50,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: 'rgb(188, 188, 188)',
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
})

const FocusContainer = (props: ContainerType) => (
  <TouchableWithoutFeedback onPress={props.onPress || null}>
    <View style={{ ...styles.wrapper, ...props.style }}>{props.children}</View>
  </TouchableWithoutFeedback>
)

export default FocusContainer
