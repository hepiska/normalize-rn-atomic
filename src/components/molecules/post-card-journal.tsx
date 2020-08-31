import React, { Component, memo } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import ImageAutoSchale from '../atoms/image-autoschale'
import { setImage, calculateDay } from '@src/utils/helpers'
import { navigate } from '@src/root-navigation'
import { Button } from '@components/atoms/button'

//condition styles for horizonal
//  marginBottom: 32,
//  overflow: 'hidden',
//  borderBottomColor: colors.black50,
//  borderBottomWidth: 1,
//  width: 280,
//  borderRadius: 8,

//condition styles for vertical
// marginBottom: 32,
// width: '100%',
// borderBottomColor: colors.black50,
// borderBottomWidth: 1,

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    //condition styles for horizonal
    // marginBottom: 32,
    // overflow: 'hidden',
    // borderBottomColor: colors.black50,
    // borderBottomWidth: 1,
    // width: 280,
    // borderRadius: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  interact: {
    flexDirection: 'row',
    marginHorizontal: 8,
    flex: 1,
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cat: {
    ...fontStyle.helveticaThin,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.black80,
  },
  btnSubmit: {
    width: 'auto',
    backgroundColor: colors.black100,
    height: 46,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnSubmitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

interface PostListItemType {
  post: any
  user: any
  type?: string
  idx: string | number
  onPress: (post: any) => void
  onUserPress: (user) => void
  style?: any
  isAuth?: boolean
  userAuth?: any
}

const JournalCard = ({
  user,
  width,
  post,
  onLayout,
  style,
  onPress,
  onUserPress,
  type,
}: any) => {
  const isBannerType = type === 'banner'
  return (
    <View style={{ ...styles.container, ...style }} onLayout={onLayout}>
      {width && (
        <View
          style={{
            marginBottom: 16,
          }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              source={{
                uri: setImage(post.image_url, { width: width }),
              }}
              errorStyle={{ width: width, height: width * 0.66 }}
              containerStyle={{ width: width, height: width * 0.66 }}
              thumbnailSource={{
                uri: setImage(post.image_url, { width: 32, height: 32 }),
              }}
              width={width}
              height={isBannerType && 360}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: isBannerType ? 'center' : 'flex-start',
            }}>
            <Text style={styles.cat}>
              {'Fashion'.toUpperCase()}{' '}
              <Text style={{ fontStyle: 'italic' }}>by</Text>{' '}
            </Text>
            <TouchableOpacity onPress={onUserPress}>
              <Text style={styles.cat}>
                {user.username ? user.username.toUpperCase() : ''}
              </Text>
            </TouchableOpacity>
          </View>
          {!isBannerType && (
            <Text
              style={{
                ...fontStyle.helveticaThin,
                fontSize: 10,
                color: colors.black80,
              }}>
              {calculateDay(post.published_at)}
            </Text>
          )}
        </View>
        <Text
          style={{
            ...fontStyle.playfairMedium,
            fontSize: 18,
            lineHeight: 25,
            color: colors.black100,
            marginBottom: 32,
            textAlign: isBannerType ? 'center' : 'left',
          }}>
          {post.title}
        </Text>

        {isBannerType ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="Read & Shop"
              onPress={onPress}
              style={styles.btnSubmit}
              fontStyle={styles.btnSubmitText}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <Text
              style={{
                textDecorationLine: 'underline',
                textDecorationColor: colors.black80,
                fontSize: 16,
                ...fontStyle.helveticaThin,
                color: colors.black100,
              }}>
              {'Read & Shop'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
const Card = memo(JournalCard)

class PostCardJournal extends React.Component<PostListItemType, any> {
  state: any = {
    width: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.width !== this.state.width) {
      return true
    }
    return false
  }

  _onPress = () => {
    const { post, ...props } = this.props

    if (props.onPress) {
      props.onPress(post)
      return
    }

    if (post.post_type === 'article' || post.post_type === 'collection') {
      navigate('Screens', {
        screen: 'PostDetail',
        params: { postId: post.id },
      }) // revisi: navigasi ke post id
    } else if (post.post_type === 'youtube') {
      Linking.openURL(post.permalink)
    }
  }

  _goToUser = () => {
    const { user } = this.props
    if (!this.props.onUserPress) {
      navigate('Screens', {
        screen: 'UserDetail',
        params: { userId: user.id },
      })
    }
  }

  _onLayout = e => {
    if (!this.state.width) {
      this.setState({ width: e.nativeEvent.layout.width })
    }
  }

  render() {
    const {
      post,
      user,
      idx,
      onPress,
      onUserPress,
      style,
      type = 'default',
    } = this.props
    const { width } = this.state

    if (post) {
      return (
        <Card
          onPress={this._onPress}
          onUserPress={this._goToUser}
          post={post}
          user={user}
          width={width}
          style={style}
          type={type}
          onLayout={this._onLayout}
        />
      )
    }
    return null
  }
}

export default PostCardJournal
