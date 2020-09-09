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
  ImageBackground,
  StyleSheet,
} from 'react-native'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialIcons'
import Share from 'react-native-share'
import BottomSheet from '@src/components/layouts/bottom-sheet'
import Config from 'react-native-config'
import Clipboard from '@react-native-community/clipboard'
import { colors } from '@utils/constants'
import { setImage as changeImageUri } from '@utils/helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUser } from '@modules/user/action'
import { goBack } from '@src/root-navigation'
import ImageAutoSchale from '@src/components/atoms/image-autoschale'
import { fontStyle } from '@src/components/commont-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { cos } from 'react-native-reanimated'
import { product } from '@src/modules/normalize-schema'

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

const shonetUri = Config.SHONET_URI

const widthCart = width / 5.5 - 32 // +1 for more option

const styles = StyleSheet.create({
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: 201,
    height: 264,
    borderRadius: 8,
    marginBottom: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // zIndex: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  close: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 46,
    height: 46,
    borderRadius: 23,
    margin: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  brand: {
    ...fontStyle.playfairMedium,
    color: colors.white,
    fontSize: 28,
  },
  product: {
    ...fontStyle.helvetica,
    color: colors.white,
    fontSize: 18,
  },
  earnInfo: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E0BC85', //remove this hexa
  },
})

const moreData = {
  name: 'More',
  id: 'more',
  image: require('@assets/icons/more-icon-large.png'),
}

const ShareCart = ({ name, image, onPress }: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <PressAbbleDiv onPress={onPress}>
        <Image
          source={image}
          style={{ width: widthCart, height: widthCart, marginBottom: 8 }}
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

class ShareProductModal extends React.Component<any, any> {
  state = {
    uri: 'https://theshonet.com',
    currentPos: 1,
    title: 'sa',
    message: 'asa',
    finishAnimation: false,
    isLogin: true,
  }
  _ref: any = React.createRef()

  timeOut = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      if (this.props.me) {
        this.props.getUser(this.props.me.id, 'id')
      }
      this._ref.snapTo(this.state.currentPos)
    })
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
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
    const { title, message, product } = this.props.route.params
    let uri = shonetUri + '/product/' + product.slug
    if (this.props.me.referral_code) {
      uri += '?referral_code=' + this.props.me.referral_code
    }
    const showtitle = title || product.name
    const shareOptions: any = {
      title: showtitle || 'The Shonet',
      message: message || showtitle,
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

  _addMessage = () => {
    console.log('add message')
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
  snapPoints = [500, 180, 50, 10]

  _productSection = () => {
    return (
      <View style={{ backgroundColor: 'red' }}>
        <Text>Testing background</Text>
      </View>
    )
  }
  render() {
    const { product, isAuth } = this.props.route.params
    return (
      this.state.finishAnimation && (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <ImageBackground
            style={styles.imgBg}
            blurRadius={20}
            resizeMode="cover"
            source={
              typeof product?.image_url === 'string'
                ? {
                    uri: changeImageUri(product?.image_url, {
                      width: width,
                    }),
                  }
                : product?.image_url
            }
          />
          <View style={styles.overlay}>
            <SafeAreaView
              style={{
                flex: 1,
              }}>
              <PressAbbleDiv onPress={this._closeModal} style={styles.close}>
                <IconM name="close" size={24} color={colors.white} />
              </PressAbbleDiv>
              <View style={styles.content}>
                <Image
                  style={styles.image}
                  source={
                    typeof product?.image_url === 'string'
                      ? {
                          uri: changeImageUri(product?.image_url, {
                            width: 201 * 2,
                            height: 264 * 2,
                          }),
                        }
                      : product?.image_url
                  }
                  height={264}
                  width={201}
                />
                <Text style={styles.brand}>{product?.brand.name}</Text>
                <Text style={styles.product}>{product?.name}</Text>
                {!isAuth && (
                  <View style={styles.earnInfo}>
                    <Text style={{ textAlign: 'center', color: colors.white }}>
                      You’ll Earn{' '}
                      {product.min_potential_earnings !==
                        product.max_potential_earnings && 'Max'}
                      IDR {product.max_potential_earning} when your friend buy
                      this product from your link
                    </Text>
                  </View>
                )}
                <PressAbbleDiv
                  _background="rgba(255, 255, 255, 0.6)"
                  _margin="32px 0px 0px 0px"
                  _padding="8px 16px"
                  borderRadius="50px"
                  onPress={this._addMessage}>
                  <Text>👋 Add Personal Message</Text>
                </PressAbbleDiv>
              </View>
            </SafeAreaView>
          </View>
          <BottomSheet
            snapPoints={this.snapPoints}
            snapEnabled={true}
            initialSnap={this.snapPoints.length - 2}
            onClose={this._closeModal}
            bottomSheetProps={{
              // enabledGestureInteraction: false,
              ref: ref => (this._ref = ref),
            }}
            title="Share">
            <View
              style={{
                padding: 16,
                justifyContent:
                  this.state.currentPos === 2 ? 'flex-start' : 'space-between',
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

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch)

const mapStateToProps = state => {
  if (!state.auth.data.user) {
    return {}
  }
  return { me: state.user.data[state.auth.data.user.id] }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShareProductModal)
