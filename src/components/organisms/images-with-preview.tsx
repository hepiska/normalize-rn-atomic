import React, { useState, useEffect } from 'react'
import {
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import Modal from 'react-native-modal'
import { Div, Font } from '@components/atoms/basic'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/EvilIcons'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import flastlistItemHoc from '@src/hocs/flatlist-item'
import ImageViewer from 'react-native-image-zoom-viewer'

import { colors, globalDimention } from '@src/utils/constants'

interface SizeType {
  width: number
  height: number
}

interface ImageType {
  uri: string
}

const { width } = Dimensions.get('screen')

interface ImagesWithPreviewsType {
  size: SizeType
  images: Array<ImageType | string>
}

const AbsDiv = styled(Div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`

const IndDiv = styled(Div)`
  position: absolute;
  top: -60px;
  width: 34px;
  height: 20px;
  background-color: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  left: ${width / 2 - 17};
`

const ImageItem = flastlistItemHoc(ImageAutoSchale)

class ImagesWithPreviews extends React.Component<ImagesWithPreviewsType, any> {
  state = {
    isVisible: false,
    selectedImage: 0,
  }

  _onOpenImage = idx => {
    this.setState({ isVisible: true, selectedImage: idx })
  }
  _flatImates = images =>
    images.map(im => (typeof im === 'string' ? { uri: im } : im))

  _closeModal = () => this.setState({ isVisible: false })
  _renderItem = ({ item, index }) => (
    <ImageItem
      id={index}
      onPress={this._onOpenImage}
      source={item}
      width={this.props.size.width}
      height={this.props.size.height}
    />
  )
  _keyExtractor = (item, index) => {
    return item.uri + index
  }
  _footerComp = props => (
    <Div _width="100%" _height="56px">
      <IndDiv>
        <Font color={colors.white}>
          {props.imageIndex + 1} / {this.props.images.length}
        </Font>
      </IndDiv>
    </Div>
  )
  _headerComp = () => (
    <AbsDiv>
      <TouchableWithoutFeedback onPress={this._closeModal}>
        <Div _width="100%" align="flex-start" _padding="20px">
          <Icon name="close" size={24} color={colors.black100} />
        </Div>
      </TouchableWithoutFeedback>
    </AbsDiv>
  )

  render() {
    const { size, images } = this.props
    const { isVisible, selectedImage } = this.state
    const fullScreenImage = images.map(_img => ({ url: _img.uri }))
    return (
      <Div _width={size.width} _height={size.height}>
        <FlatList
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={size.width}
          keyExtractor={this._keyExtractor}
          style={{ ...size }}
          horizontal
          data={images}
          renderItem={this._renderItem}
        />
        <Modal isVisible={isVisible} style={{ margin: 0 }}>
          <ImageViewer
            backgroundColor="white"
            enableSwipeDown
            renderHeader={this._headerComp}
            imageUrls={fullScreenImage}
            onSwipeDown={this._closeModal}
          />
        </Modal>
      </Div>
    )
  }
}

export default ImagesWithPreviews
