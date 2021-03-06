import React from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
  Platform,
  Text,
  Alert,
  ToastAndroid,
  InteractionManager,
  Linking,
} from 'react-native'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome'
import Share from 'react-native-share'
import BottomSheet from '@src/components/layouts/bottom-sheet'
import Clipboard from '@react-native-community/clipboard'
import { colors } from '@utils/constants'
const { height, width } = Dimensions.get('screen')

const shareData = [
  {
    name: 'Copy Link',
    id: 'copy-link',
    image: require('@assets/icons/copylink-icon-large.png'),
  },
  {
    name: 'Facebook',
    id: 'facebook',
    image: require('@assets/icons/facebook-icon-large.png'),
    share_type: Share.Social.FACEBOOK,
  },
  {
    image: require('@assets/icons/twitter-icon-large.png'),
    name: 'Twitter',
    id: 'twitter',
    share_type: Share.Social.TWITTER,
  },
  {
    name: 'WhatsApp',
    id: 'whatsapp',
    image: require('@assets/icons/whatsapp-icon-large.png'),
    share_type: Share.Social.WHATSAPP,
  },
]
const moreData = {
  name: 'More',
  id: 'more',
  image: require('@assets/icons/more-icon-large.png'),
}

const widthCart = width / 5.5 - 32 // +1 moreData

const ShareCart = ({ name, image, onPress }: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <PressAbbleDiv onPress={onPress}>
        <Image
          source={image}
          style={{
            width: widthCart,
            height: widthCart,
            marginBottom: 8,
          }}
        />
        <Text style={{ fontSize: 12, fontFamily: 'Helvetica Neue' }}>
          {name}
        </Text>
      </PressAbbleDiv>
    </View>
  )
}

const ShareList = ({ name, image, onPress }: any) => {
  return (
    <PressAbbleDiv
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderColor: colors.black50,
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: '100%',
      }}>
      <Div _direction="row">
        <Image
          source={image}
          style={{ width: 32, height: 32, marginRight: 16 }}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Helvetica Neue',
          }}>
          {name}
        </Text>
      </Div>
      <Icon name="chevron-right" size={12} />
    </PressAbbleDiv>
  )
}

class ShareModal extends React.Component<any, any> {
  state = {
    uri: 'https://theshonet.com',
    currentPos: 1,
    title: 'sa',
    message: 'asa',
    finishAnimation: false,
  }
  _ref: any = React.createRef()

  timeOut = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
  }

  componentDidUpdate() {
    this._ref.snapTo(this.state.currentPos)
    // if (this.state.finishAnimation) {
    //   console.log('did update')
    // this.timeOut = setTimeout(() => {
    //   console.log('timeout')
    //   // 3. ini dicomment aja. . kalau udajh kelar timeout dicopot.
    //   // this._ref.snapTo(this.state.currentPos)
    // }, 150)
    // }
  }
  _closeModal = () => this.props.navigation.goBack()

  _showMessage = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('copied', ToastAndroid.SHORT)
    } else {
      Alert.alert('copied')
    }
  }

  _share = dat => () => {
    const { uri, title, message } = this.props.route.params
    const shareOptions: any = {
      title: title || 'The Shonet',
      message: message || 'some message',
      url: uri,
      filename: 'shonet-share', //
    }
    if (dat.id === 'copy-link') {
      Clipboard.setString(uri)
      this._showMessage()
      return ''
    }
    shareOptions.social = dat.share_type

    if (dat.id === 'whatsapp') {
      Linking.openURL(`whatsapp://send?text=${message} ${uri}`)
    } else {
      Share.shareSingle(shareOptions)
    }
  }

  _defaultShare = () => {
    const { uri, title, message } = this.props.route.params

    const options = Platform.select({
      ios: {
        failOnCancel: false,
        activityItemSources: [
          {
            placeholderItem: { type: 'url', content: uri },
            item: {
              default: { type: 'uri', content: uri },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: uri, uri, title },
          },
          {
            placeholderItem: { type: 'text', content: message },
            item: {
              default: { type: 'text', content: message },
              message: null, // Specify no text to share via Messages app.
            },
          },
        ],
      },
      default: {
        title,
        failOnCancel: false,
        subject: title,
        message: `${message} ${uri}`,
      },
    })

    Share.open(options)
  }

  _renderItem = () => {
    if (this.state.currentPos === 1) {
      return (
        // this.state.finishAnimation && (
        <>
          {shareData.map(_dat => (
            <ShareCart key={_dat.id} {..._dat} onPress={this._share(_dat)} />
          ))}
          <ShareCart {...moreData} onPress={this._defaultShare} />
        </>
      )
      // )
    }
    return (
      // this.state.finishAnimation && (
      <>
        {shareData.map(_dat => (
          <ShareList key={_dat.id} {..._dat} onPress={this._share(_dat)} />
        ))}
        <ShareList {...moreData} onPress={this._defaultShare} />
      </>
    )
    // )
  }
  snapPoints = [500, 250, 0]
  render() {
    return (
      this.state.finishAnimation && (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <BottomSheet
            snapPoints={this.snapPoints}
            snapEnabled={false}
            initialSnap={this.snapPoints.length - 1}
            onClose={this._closeModal}
            bottomSheetProps={{
              enabledGestureInteraction: false,
              ref: ref => (this._ref = ref),
            }}
            title="Share">
            <View
              style={{
                display: 'flex',
                width,
                padding: 16,
                justifyContent:
                  this.state.currentPos === 2 ? 'flex-start' : 'space-between',
                // justifyContent:
                //   this.state.currentPos === 2 ? 'flex-start' : 'space-between',
                backgroundColor: 'white',
                flexDirection: this.state.currentPos === 1 ? 'row' : 'column',
                height: '100%',
              }}>
              {/* {this.state.finishAnimation && this._renderItem()} */}
              {this._renderItem()}
            </View>
          </BottomSheet>
        </View>
      )
    )
  }
}

export default ShareModal
