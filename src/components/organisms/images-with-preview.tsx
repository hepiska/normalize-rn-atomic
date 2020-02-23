import React, { useState, useEffect, } from 'react';
import { Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/EvilIcons'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import flastlistItemHoc from '@src/hocs/flatlist-item'
import ImageView from "react-native-image-viewing";
import { colors, globalDimention } from '@src/utils/constants';

interface SizeType {
  width: number,
  height: number
}

interface ImageType {
  uri: string
}

const { width } = Dimensions.get('screen')

interface ImagesWithPreviewsType {
  size: SizeType,
  images: Array<ImageType | string>
}

const IndDiv = styled(Div)`
    position:absolute;
    top: -60px;
    width: 34px;
    height: 20px;
    background-color: rgba(26, 26, 26, 0.6);
    border-radius: 10px;
    left: ${(width / 2) - 17};
`



const ImageItem = flastlistItemHoc(ImageAutoSchale)


class ImagesWithPreviews extends React.Component<ImagesWithPreviewsType, any> {
  state = {
    isVisible: false,
    selectedImage: 0
  }

  _onOpenImage = (idx) => { this.setState({ isVisible: true, selectedImage: idx }) }
  _flatImates = images => images.map(im => typeof im === 'string' ? { uri: im } : im)

  _closeModal = () => this.setState({ isVisible: false })
  _renderItem = ({ item, index }) => <ImageItem id={index} onPress={this._onOpenImage} source={item} width={this.props.size.width} height={this.props.size.height} />
  _keyExtractor = (item, index) => {
    return item.uri + index
  }
  _footerComp = (props) => <Div _width='100%' _height='56px' >
    <IndDiv><Font color={colors.white}>{props.imageIndex + 1} / {this.props.images.length}</Font></IndDiv>
  </Div>
  _headerComp = (props) => <TouchableWithoutFeedback onPress={this._closeModal}>
    <Div _width='100%' align='flex-start' _padding='20px' _margin={globalDimention.firstComponentMargin}>
      <Icon name='close' size={18} color={colors.gray1}></Icon>
    </Div>
  </TouchableWithoutFeedback>

  render() {
    const { size, images } = this.props
    console.log('images', images)
    const { isVisible, selectedImage } = this.state
    return (
      <Div _width={size.width} _height={size.height}>
        <FlatList
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={size.width}
          keyExtractor={this._keyExtractor}
          style={{ ...size }}
          horizontal data={images}
          renderItem={this._renderItem} />
        <ImageView
          HeaderComponent={this._headerComp}
          doubleTapToZoomEnabled
          backgroundColor="white"
          FooterComponent={this._footerComp}
          swipeToCloseEnabled
          onRequestClose={this._closeModal}
          images={this._flatImates(images)} visible={isVisible}
          imageIndex={selectedImage}></ImageView>
      </Div >)
  }
}


export default ImagesWithPreviews