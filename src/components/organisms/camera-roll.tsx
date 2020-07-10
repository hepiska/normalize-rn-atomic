import React from 'react'
import { Platform, Text, View, FlatList, StyleSheet } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import { externalStorangePermission } from '@utils/permissions'
import { colors } from '@src/utils/constants'
import { Button } from '@components/atoms/button'
import GaleryImage from '@components/molecules/galery-image'

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: colors.black100,
    height: 46,
  },
  btnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

const defaultCameraRoleProps = {
  assetType: 'Photos',
  first: 30,
}

interface CameraRollType {
  cameraRollprops?: any
  isSelectmany?: any
  getImages: any
  onClose: any
}

class ThisCameraRoll extends React.Component<CameraRollType> {
  state = {
    images: null,
    lastCursor: null,
    hasNextPage: null,
  }

  selectedImage = []
  selectImage

  async componentDidMount() {
    if (Platform.OS === 'ios') {
      const galery = await CameraRoll.getPhotos({
        ...defaultCameraRoleProps,
        ...this.props.cameraRollprops,
      })
      this.spreateState(galery)
    } else {
      const authorise = await externalStorangePermission()
      if (authorise) {
        const galery = await CameraRoll.getPhotos({
          ...defaultCameraRoleProps,
          ...this.props.cameraRollprops,
        })
        this.spreateState(galery)
      }
    }
  }

  spreateState = data => {
    const newState = { ...this.state }
    newState.images = newState.images
      ? [...newState.images, ...data.edges]
      : data.edges
    newState.hasNextPage = data.page_info.has_next_page
    newState.lastCursor = data.page_info.end_cursor
    this.setState(newState)
  }

  loadImage = async () => {
    const getImageParams = {
      ...defaultCameraRoleProps,
      ...this.props.cameraRollprops,
      after: this.state.lastCursor,
    }
    const galery = await CameraRoll.getPhotos(getImageParams)
    this.spreateState(galery)
  }

  checkAlreadySelected = selectedImage => {
    const ImgIndx = this.selectedImage.findIndex(
      image => image.timestamp === selectedImage.timestamp,
    )
    return ImgIndx !== -1
  }

  onImagePress = data => {
    const images = [...this.state.images]
    const { selectedImage } = this

    if (this.props.isSelectmany) {
      if (this.checkAlreadySelected(data)) {
        const newSelectedImage = selectedImage.filter(
          image => image.image.uri !== data.image.uri,
        )
        const newImages = images.map(image => {
          if (image.node.image.uri === data.image.uri) {
            image.node.isSelected = false
          }
          return image
        })
        this.selectedImage = newSelectedImage
        this.setState({
          images: newImages,
        })
      } else {
        selectedImage.push(data)
        const newImages = images.map(image => {
          if (image.node.image.uri === data.image.uri) {
            image.node.isSelected = true
          }
          return image
        })
        this.setState({
          image: newImages,
        })
      }
    } else if (this.props.getImages) {
      this.props.getImages(data)
      this.setState({})
      this.props.onClose()
    }
  }

  renderItem = ({ item }) => {
    return (
      <GaleryImage onPress={this.onImagePress} padding="0px" {...item.node} />
    )
  }

  keyExtractor = item => item.node.image.uri

  fetchMore = () => {
    if (this.state.hasNextPage) {
      this.loadImage()
    }
  }

  onDone = () => {
    if (this.props.getImages && this.selectedImage.length) {
      this.props.getImages(this.selectedImage)
      this.selectedImage = []
      this.setState({})
    }
    this.props.onClose()
  }

  onCancel = () => {
    if (this.props.onClose) {
      this.selectedImage = []
      this.setState({})
      this.props.onClose()
    }
  }

  render() {
    return (
      <View
        style={{
          padding: 0,
          height: '100%',
          backgroundColor: colors.white,
        }}>
        {this.state.images ? (
          this.state.images.length ? (
            <FlatList
              initialNumToRender={20}
              onEndReached={this.fetchMore}
              keyExtractor={this.keyExtractor}
              numColumns={3}
              onEndReachedThreshold={0.9}
              data={this.state.images}
              renderItem={this.renderItem}
            />
          ) : (
            <Text>No images</Text>
          )
        ) : null}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 56,
            paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: colors.white,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{ width: '50%', paddingHorizontal: 2 }}>
            <Button
              title="Done"
              onPress={this.onDone}
              style={styles.btn}
              fontStyle={styles.btnText}
            />
          </View>
          <View style={{ width: '50%', paddingHorizontal: 2 }}>
            <Button
              onPress={this.onCancel}
              title="Cancel"
              style={styles.btn}
              fontStyle={styles.btnText}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ThisCameraRoll
