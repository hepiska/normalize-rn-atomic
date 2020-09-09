import React from 'react'
import { ViewStyle, TouchableOpacity, Image } from 'react-native'
import { navigate } from '@src/root-navigation'

interface UserProfilePictType {
  style?: ViewStyle
  user?: any
  type?: string
  getFollowerFollowing?: (parameter: Object, type: string) => void
  follows?: Array<number>
  userLoading?: boolean
  navigation?: any
  size?: number
}

class UserProfilePict extends React.Component<UserProfilePictType, any> {
  onPressUser = () => {
    this.props.navigation.push('UserDetail', { userId: this.props.user.id })
  }

  render() {
    const { user, style, size } = this.props

    return (
      <TouchableOpacity
        style={{
          ...style,
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          alignItems: 'center',
        }}
        onPress={this.onPressUser}>
        <Image
          style={{ width: size, height: size }}
          resizeMode="cover"
          source={
            user?.photo_url
              ? { uri: user?.photo_url, width: size * 2 }
              : require('@src/assets/placeholder/placeholder2.jpg')
          }
        />
      </TouchableOpacity>
    )
  }
}

export default UserProfilePict
