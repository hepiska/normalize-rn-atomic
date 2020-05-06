import React from 'react'
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fontStyle } from '@components/commont-styles'
import Modal from 'react-native-modal'
import { GradientButton, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import { buttonPropsStyles } from '@components/commont-props-style'
import { modalSyle as styles } from '@components/commont-styles'

const ConfirmationModal = (props: any) => {
  const { route } = props
  const { onApprove, title, desc, empesizeApprove, actiontext = {} } =
    route.params || {}
  const _onApprove = () => {
    if (onApprove) onApprove()
    props.navigation.goBack()
  }
  const _onCloseModal = () => {
    props.navigation.goBack()
  }

  const action = [
    <View style={{ flex: 1, marginHorizontal: 8 }} key="action-2">
      <OutlineButton
        onPress={empesizeApprove ? _onCloseModal : _onApprove}
        {...buttonPropsStyles.purpleOutline}
        title={
          empesizeApprove
            ? actiontext.reject || 'No'
            : actiontext.approve || 'Yes'
        }
      />
    </View>,
    <View style={{ flex: 1, marginHorizontal: 8 }} key="action-1">
      <GradientButton
        onPress={empesizeApprove ? _onApprove : _onCloseModal}
        {...buttonPropsStyles.gradientButton}
        title={
          empesizeApprove
            ? actiontext.approve || 'Yes'
            : actiontext.reject || 'No'
        }
      />
    </View>,
  ]

  const actionEmpeApprove = [
    <View style={{ flex: 1, marginHorizontal: 8 }} key="action-1">
      <GradientButton
        onPress={_onCloseModal}
        {...buttonPropsStyles.gradientButton}
        title="No"
      />
    </View>,
    <View style={{ flex: 1, marginHorizontal: 8 }} key="action-2">
      <OutlineButton
        onPress={_onApprove}
        {...buttonPropsStyles.purpleOutline}
        title="Yes"
      />
    </View>,
  ]

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleFont}>{title || 'Title'}</Text>
          <Icon name="close" size={12} onPress={_onCloseModal} />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descStyle}>{desc || 'Description'}</Text>
        </View>
        <View style={styles.actionContainer}>{action}</View>
        <View />
      </View>
      <TouchableWithoutFeedback>
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(64,64,64,0.5)', zIndex: 1 },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ConfirmationModal
