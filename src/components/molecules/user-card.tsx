import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native'
import { setImage } from '@utils/helpers'
import { navigate } from '@src/root-navigation'
import { helveticaBlackTitleBold, fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Gradient from 'react-native-linear-gradient'
import { Button } from '@components/atoms/button'
import InviniteLoader from '@components/atoms/loaders/invinite'

interface UserCardType {
  user: any
  idx: any
  onPress: () => void
  imageOnly: boolean
  onFollow: () => void
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.black50,
    marginBottom: 8,
  },
  contentSegment: {
    marginTop: 8,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  touchableDiv: {
    overflow: 'hidden',
    marginRight: 32,
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 'auto',
    width: 138,
  },
  buttonText: {
    color: colors.white,
    fontSize: 10,
  },
  button: {
    width: '100%',
    height: 22,
    marginTop: 16,
    backgroundColor: colors.black100,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  usernameText: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.black100,
  },
  userText: {
    ...fontStyle.helvetica,
    fontSize: 14,
    textAlign: 'center',
    color: colors.black70,
  },
})

class UserCard extends React.PureComponent<UserCardType, any> {
  goToDetail = () => {
    const { user } = this.props
    navigate('Screens', { screen: 'UserDetail', params: { userId: user.id } })
  }

  handleFollow = () => {
    ;(this.props.onFollow as any)(this.props.user.id)
  }
  render() {
    const { user, onFollow, onPress } = this.props
    if (!user) return null
    return (
      <View style={styles.container}>
        <Image source={{ uri: user.photo_url }} style={styles.image} />
        <TouchableOpacity
          style={styles.contentSegment}
          onPress={this.goToDetail}>
          <Text style={styles.usernameText}>{user.username}</Text>
          {user.group_id !== 4 && (
            <Gradient
              {...colors.ActivePurple}
              style={{
                borderRadius: 14,
                justifyContent: 'center',
                height: 16,
                width: 16,
                alignItems: 'center',
                marginLeft: 8,
              }}>
              <Icon name="check" color="white" size={10} />
            </Gradient>
          )}
        </TouchableOpacity>
        <View style={styles.contentSegment}>
          <Text style={styles.userText}>{user.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Button
            onPress={this.handleFollow}
            fontStyle={{ color: 'white' }}
            style={{ backgroundColor: colors.black100, flex: 1 }}
            title={!user.is_followed ? 'Follow' : 'Unfollow'}
          />
        </View>
      </View>
    )
  }
}

export default UserCard
