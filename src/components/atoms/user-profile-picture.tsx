import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { fontStyle, helveticaBlackFont12 } from '@components/commont-styles'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import ImageViewer from 'react-native-image-zoom-viewer'
import Modal from 'react-native-modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

import UserPp from '@components/atoms/user-profile-picture'
import { getFollowerFollowing } from '@modules/user/action'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
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
  playfairBold20: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
    fontSize: 20,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
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
  photoCollections: {
    flexDirection: 'row',
    marginTop: 24,
  },
  morePhotoContainer: {
    backgroundColor: colors.black100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

interface UserProfilePictType {
  style?: ViewStyle
  user?: any
  type?: string
  getFollowerFollowing?: (parameter: Object, type: string) => void
  follows?: Array<number>
  userLoading?: boolean
}

class UserProfilePict extends React.Component<UserProfilePictType, any> {
  onPressUser = () => {
    navigate('Screens', {
      screen: 'UserDetail',
      params: { userId: this.props.user.id },
    })
  }

  render() {
    const { user } = this.props

    return (
      <TouchableOpacity onPress={this.onPressUser}>
        <Image
          source={
            user?.photo_url
              ? { uri: user.photo_url }
              : require('@src/assets/placeholder/placeholder2.jpg')
          }
          style={{ ...styles.image }}
        />
      </TouchableOpacity>
    )
  }
}

export default UserProfilePict
