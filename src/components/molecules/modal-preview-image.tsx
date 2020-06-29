import React from 'react'
import { ViewStyle, TouchableWithoutFeedback } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Modal from 'react-native-modal'
import { Div } from '@components/atoms/basic'
import styled from 'styled-components/native'
import { colors } from '@src/utils/constants'
import IconEi from 'react-native-vector-icons/EvilIcons'

interface ModalPreviewImageType {
  style?: ViewStyle
  isVisible: boolean
  image: any
  onCloseModal: () => void
}
const AbsDiv = styled(Div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`

class ModalPreviewImage extends React.PureComponent<
  ModalPreviewImageType,
  any
> {
  _headerComp = () => (
    <AbsDiv>
      <TouchableWithoutFeedback onPress={this.props.onCloseModal}>
        <Div _width="100%" align="flex-start" _margin="28px" _padding="20px">
          <IconEi name="close" size={24} color={colors.black100} />
        </Div>
      </TouchableWithoutFeedback>
    </AbsDiv>
  )

  render() {
    const { isVisible, image, onCloseModal, style } = this.props

    return (
      <Modal isVisible={isVisible} style={{ margin: 0, ...style }}>
        <ImageViewer
          backgroundColor="white"
          enableSwipeDown
          renderHeader={this._headerComp}
          imageUrls={image}
          onSwipeDown={onCloseModal}
          index={0}
        />
      </Modal>
    )
  }
}

export default ModalPreviewImage
