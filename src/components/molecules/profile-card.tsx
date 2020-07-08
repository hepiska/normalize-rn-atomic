import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { Div } from '@components/atoms/basic'
import styled from 'styled-components/native'
import { OutlineButton } from '@components/atoms/button'
import { setImage as changeImageUri } from '@utils/helpers'
import { colors } from '@src/utils/constants'
import { navigate } from '@src/root-navigation'
import IconEi from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HTML from 'react-native-render-html'
import { Button } from '@components/atoms/button'
import ModalPreviewImage from './modal-preview-image'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@modules/user/action'
import { followUser, unfollowUser } from '@modules/user/action'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
  },
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  playfairBold28: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
    fontSize: 28,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  button: {
    height: 36,
    borderColor: colors.black50,
  },
  buttonBlack: {
    height: 36,
    backgroundColor: colors.black100,
  },
})

const AbsDiv = styled(Div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`

const ButtonIcon = ({ onPress, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        ...styles.button,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        marginLeft: 16,
      }}>
      {icon}
    </View>
  </TouchableOpacity>
)

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

interface ProfileCardType {
  style?: ViewStyle
  user?: any
  type?: string
  onEditProfile?: () => void
  onFollowUnfollow?: () => void
  followUser: (id: number) => void
  unfollowUser: (id: number) => void
}
const { width } = Dimensions.get('screen')

class ProfileCard extends React.Component<ProfileCardType, any> {
  state = {
    isVisible: false,
    isFollow: this.props.user.is_followed,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isVisible !== this.state.isVisible) {
      return true
    }
    if (nextProps.user !== this.props.user) {
      return true
    }
    if (nextState.isFollow !== this.state.isFollow) {
      return true
    }

    return false
  }

  gotoFollowPage = followType => () => {
    navigateTo('Screens', 'Follow', {
      followType,
      name: this.props.user.name,
    })
  }

  gotoEditProfile = () => {
    navigateTo('Screens', 'EditProfile', {})
  }

  gotoAccountSetting = () => {
    navigateTo('Screens', 'AccountSetting', {})
  }

  _openModal = () => this.setState({ isVisible: true })

  _closeModal = () => this.setState({ isVisible: false })

  _headerComp = () => (
    <AbsDiv>
      <TouchableWithoutFeedback onPress={this._closeModal}>
        <Div _width="100%" align="flex-start" _margin="28px" _padding="20px">
          <IconEi name="close" size={24} color={colors.black100} />
        </Div>
      </TouchableWithoutFeedback>
    </AbsDiv>
  )
  handleFollow = () => {
    if (this.state.isFollow) {
      this.props.unfollowUser(this.props.user.id)
    } else {
      this.props.followUser(this.props.user.id)
    }
    this.setState({
      isFollow: !this.state.isFollow,
    })
  }
  handleConnectIG = () => {
    const username = this.props.user.instagram_account.instagram_username
    const igUrlScheme = `instagram://user?username=${username}`
    Linking.canOpenURL(igUrlScheme)
      .then(supported =>
        Linking.openURL(
          supported ? igUrlScheme : `https://www.instagram.com/${username}`,
        ),
      )
      .catch(err => console.error('An error occurred', err))
  }

  handleConnectYT = () => {
    const username = this.props.user.youtube_account.youtube_username
    const youtubeUrlScheme = `youtube://user?username=${username}`
    Linking.canOpenURL(youtubeUrlScheme)
      .then(supported =>
        Linking.openURL(
          supported ? youtubeUrlScheme : `https://www.youtube.com/${username}`,
        ),
      )
      .catch(err => console.error('An error occurred', err))
  }
  render() {
    const { isVisible, isFollow } = this.state
    const { user, type, onEditProfile } = this.props
    if (!user) {
      return null
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={user.photo_url ? this._openModal : null}>
          <View style={{ marginTop: 16 }}>
            <Image
              source={
                user.photo_url
                  ? { uri: user.photo_url }
                  : require('@src/assets/placeholder/placeholder2.jpg')
              }
              style={{ ...styles.image }}
            />
          </View>
        </TouchableWithoutFeedback>
        <ModalPreviewImage
          image={[
            user.photo_url
              ? {
                  url: changeImageUri(user.photo_url, {
                    width: width,
                    height: width,
                  }),
                }
              : {},
          ]}
          isVisible={isVisible}
          onCloseModal={this._closeModal}
        />
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 16 }}>
            <Text style={{ ...styles.playfairBold28 }}>{user.name}</Text>
          </View>
          <View style={{ marginTop: 16, flexDirection: 'row' }}>
            <Icon
              name="map-marker-alt"
              size={16}
              color={colors.black100}
              style={{ marginRight: 10 }}
            />
            <Text style={{ ...styles.helvetica14, color: colors.black70 }}>
              {/* {user.city || 'Shonetopia'} */}
              Shonetopia
            </Text>
          </View>
          <View style={{ marginTop: 24, flexDirection: 'row' }}>
            {type === 'friendProfile' ? (
              <>
                {isFollow ? (
                  <OutlineButton
                    onPress={this.handleFollow}
                    title="Following"
                    fontStyle={{
                      ...fontStyle.helveticaBold,
                      color: colors.black100,
                      fontSize: 12,
                      lineHeight: 12,
                      marginLeft: 0,
                    }}
                    style={{ ...styles.button, width: 176 }}
                  />
                ) : (
                  <Button
                    onPress={this.handleFollow}
                    title="Follow"
                    fontStyle={{
                      ...fontStyle.helveticaBold,
                      color: colors.white,
                      fontSize: 12,
                      lineHeight: 12,
                      marginLeft: 0,
                    }}
                    style={{ ...styles.buttonBlack, width: 176 }}
                  />
                )}
                {user.instagram_account?.instagram_username != null && (
                  <ButtonIcon
                    onPress={this.handleConnectIG}
                    icon={
                      <Icon name="instagram" size={14} color={colors.black70} />
                    }
                  />
                )}
                {user.youtube_account?.youtube_username != null && (
                  <ButtonIcon
                    onPress={this.handleConnectYT}
                    icon={
                      <Icon name="youtube" size={14} color={colors.black70} />
                    }
                  />
                )}
              </>
            ) : (
              <>
                <OutlineButton
                  title="Edit Profile"
                  onPress={onEditProfile || this.gotoEditProfile}
                  style={{ ...styles.button, width: 176 }}
                  fontStyle={{
                    ...fontStyle.helveticaBold,
                    color: colors.black100,
                    fontSize: 12,
                    lineHeight: 12,
                  }}
                />
                <ButtonIcon
                  onPress={this.gotoAccountSetting}
                  icon={<Icon name="cog" size={14} color={colors.black70} />}
                />
              </>
            )}
          </View>
          <View style={{ marginTop: 16, marginBottom: 20 }}>
            <HTML
              html={`<bio>${user.biography || 'Welcome to my page'}</bio>`}
              renderers={{
                // eslint-disable-next-line react/display-name
                bio: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                  return (
                    <Text
                      key={`user-biography-${htmlAttribs}`}
                      style={{
                        ...fontStyle.helvetica,
                        fontSize: 14,
                        color: colors.black70,
                      }}>
                      {passProps?.rawChildren[0]?.data || ''}
                    </Text>
                  )
                },
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser, followUser, unfollowUser }, dispatch)

const mapStateToProps = (state, ownProps) => {
  const isAuth = state.auth.isAuth
  let user
  if (isAuth) {
    user =
      ownProps.user ||
      state.user.data[state.auth.data.user.id] ||
      state.auth.data.user
  } else {
    if (ownProps.user) {
      user = ownProps.user
    }
  }

  return {
    user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
