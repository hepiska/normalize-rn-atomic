import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react'
import { SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'

interface Handles {
  openModal: () => void
  closeModal?: () => void
}

interface Props {
  title: string
  children: any
  onBackdropClose?: boolean
  onClose?: () => void
  isOpen?: boolean
  containerStyle?: any
  fullscreen?: boolean
}

const fullScreenWrapper = conditionalRendereing => Component => {
  return conditionalRendereing ? (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Component />
    </SafeAreaView>
  ) : (
    <Component />
  )
}

const ModalComponent: React.RefForwardingComponent<Handles, Props> = (
  {
    title,
    children,
    onBackdropClose = false,
    onClose,
    isOpen = false,
    fullscreen = false,
    containerStyle,
  },
  ref,
) => {
  const [isModalVisible, setIsModalVisible] = useState(isOpen)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => (onClose ? onClose() : setIsModalVisible(false))

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  useEffect(() => {
    setIsModalVisible(isOpen)
  }, [isOpen])

  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor="rgba(0, 0, 0, 0.32)"
      style={{ margin: fullscreen ? 0 : 16 }}
      avoidKeyboard={true}
      useNativeDriver={true}
      animationInTiming={500}
      onBackdropPress={onBackdropClose ? closeModal : null}
      animationOutTiming={500}>
      <Div
        justify="flex-start"
        _background={colors.white}
        _padding="16px"
        borderRadius="7px"
        style={containerStyle}>
        <SafeAreaView
          style={{
            width: '100%',
            height: fullscreen ? '100%' : null,
          }}>
          <Div _width="100%">
            <Div
              _width="100%"
              _direction="row"
              justify="space-between"
              _margin="0px 0px 16px">
              <Font
                size="24"
                fontFamily="Futura"
                weight="500"
                color={colors.black100}>
                {title}
              </Font>
              <PressAbbleDiv onPress={closeModal}>
                <Icon name="close" size={24} color={colors.black70} />
              </PressAbbleDiv>
            </Div>
            {children}
          </Div>
        </SafeAreaView>
      </Div>
    </Modal>
  )
}

export default forwardRef(ModalComponent)
