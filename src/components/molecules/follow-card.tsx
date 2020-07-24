import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  Text,
  Image,
} from 'react-native'
import { TouchableWithoutFeedback } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { navigate } from '@src/root-navigation'
import { setImage as changeImageUri } from '@utils/helpers'
import { Button, GradientButton } from '@components/atoms/button'
import dayjs from 'dayjs'
import Gradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

// const { width } = Dimensions.get('screen')

const Divider = ({ marginTop, paddingHorizontal }) => (
  <View
    style={{
      borderBottomColor: colors.black50,
      borderBottomWidth: 1,
      width: '100%',
      marginTop: marginTop || 0,
      paddingHorizontal: paddingHorizontal || 0,
      height: 1,
    }}
  />
)

interface FollowCardType {
  style?: ViewStyle
  user?: any
  isFollowed?: boolean
  showCreated?: boolean
  onFollow: (userId) => void
  onPress: (userId) => void
  disableDivider?: boolean
  isGradientButton?: boolean
  authId?: number
}

const styles = StyleSheet.create({
  container: {
    // width: width,
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  information: {
    marginLeft: 16,
  },
  buttonText: {
    ...fontStyle.helvetica,
    color: colors.white,
    fontSize: 12,
    lineHeight: 17,
    marginLeft: 0,
  },
  userPhotoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray6,
    borderRadius: 20,
  },
  button: {
    backgroundColor: colors.black100,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 65,
  },
  joinedtext: {
    ...fontStyle.helveticaBold,
    fontSize: 10,
    marginBottom: 6,
    color: colors.black60,
  },
  gradientButton: {
    width: 88,
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
})

class FollowCard extends React.PureComponent<FollowCardType, any> {
  state = {
    defaultImage: null,
  }

  handleFollow = () => {
    this.props.onFollow(this.props.user.id)
  }

  _handlePress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.user.id)
    } else {
      navigate('Screens', {
        screen: 'UserDetail',
        params: {
          userId: this.props.user.id,
        },
      })
    }
  }

  render() {
    const {
      style,
      user,
      isFollowed,
      disableDivider,
      isGradientButton,
      showCreated,
      authId,
    } = this.props

    // const image = changeImageUri(user.photo_url, { width: 40, height: 40 })

    // const thumbnailImage = changeImageUri(user.photo_url, {
    //   width: 8,
    //   height: 8,
    // })

    if (!user) {
      return null
    }
    return (
      <>
        <TouchableWithoutFeedback onPress={this._handlePress}>
          <View style={{ ...styles.container, ...style }}>
            <View style={{ ...styles.content }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 0.7,
                }}>
                {user.photo_url && user.photo_url !== '' ? (
                  <Image
                    source={{
                      uri: changeImageUri(user.photo_url, {
                        width: 40,
                        height: 40,
                      }),
                    }}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.userPhotoPlaceholder} />
                )}
                <View style={{ ...styles.information, flex: 0.8 }}>
                  <View style={{}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        ...fontStyle.helveticaBold,
                        color: colors.black100,
                        fontSize: 14,
                      }}>
                      {user.username || user.name}
                    </Text>
                  </View>
                  {/* if username available, show name. if username not avail, set name as username */}
                  {user.username !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          ...fontStyle.helvetica,
                          color: colors.black70,
                          fontSize: 14,
                        }}>
                        {user.name}
                      </Text>
                      {user.group_id !== 4 && (
                        <Gradient
                          {...colors.ActivePurple}
                          style={{
                            borderRadius: 14,
                            justifyContent: 'center',
                            height: 11,
                            width: 11,
                            alignItems: 'center',
                            margin: 3,
                          }}>
                          <Icon name="check" color="white" size={8} />
                        </Gradient>
                      )}
                    </View>
                  )}
                </View>
              </View>
              {authId !== user.id && (
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  {showCreated && (
                    <Text style={styles.joinedtext}>
                      Joined {dayjs(user.created_at).format('DD MMM YYYY')}
                    </Text>
                  )}

                  {isGradientButton ? (
                    <GradientButton
                      onPress={this.handleFollow}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={
                        isFollowed ? ['#3067E4', '#8131E2'] : ['#000', '#000']
                      }
                      title={isFollowed ? 'Following' : 'Follow +'}
                      fontStyle={styles.buttonText}
                      style={styles.gradientButton}
                    />
                  ) : (
                    <Button
                      onPress={this.handleFollow}
                      title={isFollowed ? 'Unfollow' : 'Follow'}
                      fontStyle={styles.buttonText}
                      style={styles.button}
                    />
                  )}
                </View>
              )}
            </View>
            {!disableDivider && <Divider marginTop={0} paddingHorizontal={0} />}
          </View>
        </TouchableWithoutFeedback>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    authId: state.auth.data?.user?.id || null,
  }
}

export default connect(mapStateToProps, null)(FollowCard)
