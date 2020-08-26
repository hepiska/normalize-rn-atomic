import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from '@components/atoms/button'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import { buttonPropsStyles } from '@components/commont-props-style'

interface ActionType {
  title: string
  action: () => void
}

interface ModalDataType {
  title: string
  subtitle?: string
  confirm?: ActionType
  cancel?: ActionType
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  actionWrap: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

interface ConfirmationModalType {
  isOpen: boolean
  data: ModalDataType
}

const ConfirmationModal = ({ isOpen, data }: ConfirmationModalType) => {
  return (
    <Modal isVisible={isOpen}>
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.subtitle}</Text>
        <View style={styles.actionWrap}>
          <Button
            title={data.confirm.title}
            {...buttonPropsStyles.blackButton}
            onPress={data.confirm.action}
          />
          <Button
            title={data.cancel.title}
            {...buttonPropsStyles.whiteButton}
            onPress={data.cancel.action}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal
