import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  Text,
  Image,
} from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { RadioButton } from '@components/atoms/radio-button'
import { setImage as changeImageUri } from '@utils/helpers'
import { Button } from '@components/atoms/button'

const { width } = Dimensions.get('screen')

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
  onFollow: (userId) => void
}

const styles = StyleSheet.create({
  container: {
    width: width,
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
  button: {
    backgroundColor: colors.black100,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

class FollowCard extends React.PureComponent<FollowCardType, any> {
  state = {
    defaultImage: null,
  }

  handleFollow = () => {
    this.props.onFollow(this.props.user.id)
  }

  render() {
    const { style, user, isFollowed } = this.props

    const image =
      this.state.defaultImage ||
      (!!user.photo_url &&
        changeImageUri(user.photo_url, { width: 40, height: 40 }))

    const thumbnailImage = this.state.defaultImage
      ? null
      : !!user.photo_url &&
        changeImageUri(user.photo_url, { width: 40, height: 40 })

    if (!user) {
      return null
    }
    return (
      <>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{ ...style, ...styles.container }}>
            <View style={{ ...styles.content }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ImageAutoSchale
                  errorStyle={{ width: 40, height: 40 }}
                  thumbnailSource={
                    typeof thumbnailImage === 'string'
                      ? { uri: thumbnailImage }
                      : thumbnailImage
                  }
                  source={typeof image === 'string' ? { uri: image } : image}
                  width={40}
                  style={styles.image}
                />
                <View style={{ ...styles.information }}>
                  <View style={{}}>
                    <Text
                      style={{
                        ...fontStyle.helveticaBold,
                        color: colors.black100,
                        fontSize: 14,
                      }}>
                      {user.username || user.name}
                    </Text>
                  </View>
                  {/* if username available, show name. if username not avail, set name as username */}
                  {user.username && (
                    <View style={{}}>
                      <Text
                        style={{
                          ...fontStyle.helvetica,
                          color: colors.black70,
                          fontSize: 14,
                        }}>
                        {user.name}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View>
                <Button
                  onPress={this.handleFollow}
                  title={isFollowed ? 'Unfollow' : 'Follow'}
                  fontStyle={styles.buttonText}
                  style={styles.button}
                />
              </View>
            </View>
            <Divider marginTop={0} paddingHorizontal={0} />
          </View>
        </TouchableWithoutFeedback>
      </>
    )
  }
}

export default FollowCard
