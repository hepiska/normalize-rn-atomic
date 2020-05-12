import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Modal from 'react-native-modal'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import CameraRoll from '@components/organisms/camera-roll'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 12,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})

class Camera extends React.Component<any, any> {
  state = {
    isGaleryOpen: false,
    isOpen: false,
  }
  camera

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen !== state.isOpen) {
      return {
        isOpen: props.isOpen,
      }
    }
    return null
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          autoFocusPointOfInterest: { x: 0.5, y: 0.5 },
          ratio: '4:3',
          pauseAfterCapture: true,
          skipProcessing: true,
          autoFocus: RNCamera.Constants.AutoFocus.on,
          exif: true,
        }
        const data = await this.camera.takePictureAsync(options)
        data.filename = data.uri
        const timestamp = new Date()
        if (this.props.closeCamera) {
          this.props.closeCamera()
        }
        if (this.props.getImages) {
          this.props.getImages({ image: data, timestamp: timestamp.valueOf() })
        }
      }
    } catch (err) {
      console.log('err capture ---', err)
    }
  }

  openGalery = () => {
    this.setState({
      isGaleryOpen: true,
    })
  }

  closeGalery = () => {
    this.setState({
      isGaleryOpen: false,
    })
  }

  onSelectGalery = data => {
    if (this.props.getImages) {
      this.props.getImages(data)
    }
    if (this.props.closeCamera) {
      this.props.closeCamera()
    }
  }

  renderCamera = () => (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View
        style={{
          flex: 0,
          alignItems: 'flex-end',
          marginBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0,0,0,0.32)',
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}>
        {/* close button  */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: 48,
          }}>
          <TouchableOpacity onPress={this.props.closeCamera}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255, 0.2)',
                width: 48,
                height: 48,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="arrow-left" size={24} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* snap button  */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 48,
          }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255, 0.2)',
                width: 48,
                height: 48,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="camera" size={24} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* galery button  */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: 48,
          }}>
          <TouchableOpacity onPress={this.openGalery}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255, 0.2)',
                width: 48,
                height: 48,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="image" size={24} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  render() {
    return (
      <Modal
        isVisible={this.state.isOpen}
        // backdropColor="rgba(0, 0, 0, 0.32)"
        style={{ margin: 0 }}
        onBackdropPress={this.props.closeCamera}
        avoidKeyboard={true}
        useNativeDriver={true}
        animationInTiming={500}
        animationOutTiming={500}>
        {this.state.isOpen &&
        this.props.isCamRollAvailable &&
        this.state.isGaleryOpen ? (
          <CameraRoll
            getImages={this.onSelectGalery}
            onClose={this.closeGalery}
          />
        ) : (
          this.renderCamera()
        )}
      </Modal>
    )
  }
}

export default Camera
