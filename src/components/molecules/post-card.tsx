import React, { useState, memo, PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Immutable from 'seamless-immutable'
import {
  Div,
  PressAbbleDiv,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage } from '@utils/helpers'
import { Linking } from 'react-native'
import {
  helveticaNormalFont,
  fontStyle,
  shadows,
} from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import IconFa from 'react-native-vector-icons/FontAwesome'
import Config from 'react-native-config'
import { navigate } from '@src/root-navigation'
import Line from '@components/atoms/line'

interface PostListItemType {
  post: any
  user: any
  type?: string
  idx: string | number
  onPress: (post: any) => void
  onLike: (postId) => void
  removeLikedPost: (postId) => void
  addLikedPost: (postId) => void
  onUserPress: (user) => void
  onBookmark: (postId) => void
  addBookmarkPost: (postId) => void
  removeBookmarkPost: (postId) => void
  fullscreen?: boolean
  isLiked?: boolean
  isBookmarked?: boolean
  style?: any
  isAuth?: boolean
  userAuth?: any
}

const fullscreenstyles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: { flexDirection: 'row', alignItems: 'center' },
})

const userImageStyle = StyleSheet.create({
  large: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  default: {
    width: 16,
    height: 16,
    borderRadius: 20,
  },
})

const renderIconType = type => {
  switch (type) {
    case 'article':
      return 'newspaper'
    case 'youtube':
      return 'play'
    case 'instagram':
      return 'tags'
    default:
      return null
  }
}

const FullscreenCard = ({
  user,
  width,
  post,
  isPostLiked,
  isBookmarked,
  onLayout,
  style,
  onPress,
  onUserPress,
  onShare,
  // goToUser,
  goToUsers,
  onMore,
  onLike,
  onBookmark,
  likeCount,
  postLikes,
}: any) => {
  const maxTitile = 3000
  const maxSubtitle = 200
  const title =
    post.title.length > maxTitile
      ? post.title.substring(0, maxTitile) + '...'
      : post.title

  const subtitle =
    post.subtitle &&
    post.subtitle !== undefined &&
    post.subtitle.length > maxSubtitle
      ? post.subtitle.substring(0, maxSubtitle) + '...'
      : null
  const postType =
    post.post_type !== 'article'
      ? post.post_type.toUpperCase()
      : post.category.name.toUpperCase() || 'UNCATEGORIZED'

  return (
    <View
      style={{
        backgroundColor: 'white',
        // borderColor: colors.black10,
        ...style,
      }}
      onLayout={onLayout}>
      <Line />
      {user && (
        <View style={{ ...fullscreenstyles.sectionContainer }}>
          <TouchableOpacity onPress={onUserPress(user)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: setImage(user.photo_url, { width: 64 }),
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 8,
                }}
              />

              <Text
                style={{
                  ...fontStyle.helveticaBold,
                  fontSize: 14,
                  color: colors.black100,
                }}>
                {user.username || user.name}
              </Text>
            </View>
          </TouchableOpacity>
          <IconFa name="ellipsis-h" size={16} onPress={onMore} />
        </View>
      )}
      {width && (
        <View style={{ marginBottom: 8 }}>
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
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={{ ...fullscreenstyles.sectionContainer, marginVertical: 0 }}>
        <Text
          style={{
            ...fontStyle.helvetica,
            fontSize: 10,
            color: colors.black70,
          }}>
          {postType}
        </Text>
      </View>
      <View style={{ ...fullscreenstyles.sectionContainer }}>
        <Text
          style={{
            ...fontStyle.playfairMedium,
            fontSize: 18,
            lineHeight: 25,
            color: colors.black100,
          }}>
          {title}
        </Text>
      </View>
      {/* {post.tags && (
        <View
          style={{
            marginTop: 0,
            marginBottom: 8,
            marginHorizontal: 16,
            flexDirection: 'row',
          }}>
          {post.tags?.map((tag, idx) => (
            <Text
              key={idx}
              style={{
                ...fontStyle.helveticaThin,
                fontSize: 12,
                marginRight: 4,
              }}>
              {tag.title}
            </Text>
          ))}
        </View>
      )} */}
      {subtitle && (
        <View
          style={{
            marginTop: 0,
            marginBottom: 8,
            marginHorizontal: 16,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              ...fontStyle.helveticaThin,
              fontSize: 12,
              marginRight: 4,
              color: colors.black80,
            }}>
            {subtitle}
          </Text>
        </View>
      )}
      <View
        style={{
          ...fullscreenstyles.sectionContainer,
        }}>
        <View style={fullscreenstyles.rowContainer}>
          <View style={{ ...fullscreenstyles.rowContainer, marginRight: 24 }}>
            <TouchableOpacity onPress={onLike}>
              <Image
                source={
                  isPostLiked
                    ? require('@src/assets/icons/heart-filled.png')
                    : require('@src/assets/icons/heart.png')
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <Font size="10.5px" color={colors.black80} padd="0 0 0 8px">
              {likeCount}
            </Font>
          </View>
          <View style={fullscreenstyles.rowContainer}>
            <TouchableOpacity onPress={onLike}>
              <Image
                source={require('@src/assets/icons/comment.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <Font size="10.5px" color={colors.black80} padd="0 0 0 8px">
              {post.comment_count}
            </Font>
          </View>
        </View>

        <View style={fullscreenstyles.rowContainer}>
          <TouchableOpacity onPress={onShare}>
            <Image
              source={require('@src/assets/icons/share-outline.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onBookmark}>
            <Image
              source={
                isBookmarked
                  ? require('@src/assets/icons/bookmark-filled.png')
                  : require('@src/assets/icons/bookmark.png')
              }
              style={{ width: 20, height: 20, marginLeft: 26 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {postLikes?.length > 0 ? (
        <View
          style={{
            ...fullscreenstyles.sectionContainer,
            marginTop: 0,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            style={fullscreenstyles.rowContainer}
            onPress={goToUsers}>
            {postLikes.map((value, key) => {
              const img = value.user.photo_url
              return (
                <View
                  key={`user-like-${key}`}
                  style={{
                    borderColor: colors.white,
                    borderRadius: 20,
                    borderWidth: 1,
                    marginLeft: key !== 0 ? -16 : 0,
                  }}>
                  <Image
                    key={`image-user-like-${key}`}
                    source={
                      img
                        ? { uri: img }
                        : require('@src/assets/placeholder/placeholder2.jpg')
                    }
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}
                  />
                </View>
              )
            })}
          </TouchableOpacity>
          <View style={{ ...fullscreenstyles.rowContainer, marginLeft: 8 }}>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                marginRight: 4,
              }}>
              Liked By
            </Text>
            <TouchableOpacity onPress={onUserPress(postLikes[0].user)}>
              <Text
                style={{
                  ...fontStyle.helveticaBold,
                  fontWeight: '700',
                  fontSize: 12,
                  marginRight: 4,
                  color: colors.black100,
                }}>
                {postLikes[0].user.username || postLikes[0].user.name}
              </Text>
            </TouchableOpacity>
            {likeCount > 1 && (
              <>
                <Text
                  style={{
                    ...fontStyle.helvetica,
                    fontSize: 12,
                    marginRight: 4,
                  }}>
                  and
                </Text>
                <TouchableOpacity onPress={goToUsers}>
                  <Text
                    style={{
                      ...fontStyle.helveticaBold,
                      fontWeight: '700',
                      fontSize: 12,
                      marginRight: 4,
                    }}>
                    {`${likeCount - 1} others`}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <Text
          style={{
            ...fontStyle.helvetica,
            fontSize: 12,
            marginRight: 4,
            color: colors.black100,
            marginLeft: 16,
          }}>
          Be the first to
          <Text style={{ fontWeight: '500' }}>{` like`}</Text>
        </Text>
      )}
    </View>
  )
}

const VerticalCart = ({
  user,
  width,
  post,
  isPostLiked,
  onLayout,
  style,
  onPress,
  onUserPress,
  onShare,
  onLike,
  likeCount,
}: any) => {
  const maxTitile = 3000
  const title =
    post.title.length > maxTitile
      ? post.title.substring(0, maxTitile) + '...'
      : post.title
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 1,
        // borderWidth: 1,
        borderRadius: 8,
        shadowColor: colors.black100,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        backgroundColor: 'white',
        shadowRadius: 1,
        shadowOpacity: 0.18,
        elevation: 1,
        // borderColor: colors.black10,
        ...style,
      }}
      onLayout={onLayout}>
      {user && (
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 4,
            marginHorizontal: 8,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onUserPress(user)}>
            <Image
              source={
                user.photo_url
                  ? { uri: user.photo_url }
                  : require('@src/assets/placeholder/placeholder2.jpg')
              }
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                marginRight: 8,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              ...fontStyle.helveticaBold,
              fontSize: 10,
              color: colors.black80,
            }}>
            {user.username}
          </Text>
        </View>
      )}
      {width && (
        <View
          style={{
            marginVertical: 4,
            overflow: 'hidden',
          }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              source={{
                uri: setImage(post.image_url, { width: width }),
              }}
              errorStyle={{ width: width, height: width * 0.66 }}
              containerStyle={{ width: width, height: width * 0.66 }}
              thumbnailSource={{
                uri: setImage(post.image_url, { width: 12, height: 12 }),
              }}
              width={width}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={{ marginVertical: 4, marginBottom: 5, marginHorizontal: 8 }}>
        <Text
          style={{
            ...fontStyle.playfair,
            fontSize: 10,
            lineHeight: 12,
            color: colors.black100,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 4,
          marginHorizontal: 8,
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={onLike}>
            <Image
              source={
                isPostLiked
                  ? require('@src/assets/icons/heart-filled.png')
                  : require('@src/assets/icons/heart.png')
              }
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
          <Font size="10.5px" color={colors.black70} padd="0 0 0 4px">
            {likeCount}
          </Font>
        </View>
        <TouchableOpacity onPress={onShare}>
          <Image
            source={require('@src/assets/icons/share-outline.png')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const MemVerticalCard = memo(VerticalCart)
const MemFullSizeCard = memo(FullscreenCard)

class PostListItem extends React.Component<PostListItemType, any> {
  state: any = {
    isPostLiked: this.props.isLiked,
    width: null,
    isPostBookmarked: this.props.isBookmarked,
    likeCount: this.props.post.like_count,
    postLikes: this.props.post.likes,
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isPostLiked !== nextState.isPostLiked) {
      return true
    }
    if (this.state.isPostBookmarked !== nextState.isPostBookmarked) {
      return true
    }
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

  _onMore = () => {
    const { post } = this.props
    navigate('modals', { screen: 'PostMore', params: { postId: post.id } })
  }

  _onLike = () => {
    const { addLikedPost, removeLikedPost, userAuth } = this.props
    const { isPostLiked, likeCount, postLikes } = this.state

    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      let newLikeCount = likeCount
      let newPostLikes = Immutable(postLikes)
      if (isPostLiked) {
        newLikeCount -= 1
        removeLikedPost(this.props.post.id)
        if (newPostLikes?.length > 0) {
          newPostLikes = newPostLikes.filter(val => val.user.id !== userAuth.id)
        }
      } else {
        newLikeCount += 1
        addLikedPost(this.props.post.id)
        if (newPostLikes?.length > 0) {
          newPostLikes = newPostLikes.concat(Immutable({ user: userAuth }))
        } else {
          newPostLikes = Immutable([{ user: userAuth }])
        }
      }

      this.setState(state => ({
        isPostLiked: !state.isPostLiked,
        likeCount: newLikeCount,
        postLikes: newPostLikes,
      }))
    }
  }

  _onBookmark = () => {
    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      if (this.state.isPostBookmarked) {
        this.props.removeBookmarkPost(this.props.post.id)
      } else {
        this.props.addBookmarkPost(this.props.post.id)
      }

      this.setState(state => ({
        isPostBookmarked: !state.isPostBookmarked,
      }))
    }
  }

  _onShare = () => {
    const { post } = this.props
    navigate('modals', {
      screen: 'Share',
      params: {
        title: post.title,
        uri: Config.SHONET_URI + '/articles/' + post.id,
      },
    })
  }

  // _onUserCliked = () => {
  //   navigate('Screens', {
  //     screen: 'UserDetail',
  //     params: { userId: this.props.user.id },
  //   })
  // }

  _onLayout = e => {
    if (!this.state.width) {
      this.setState({ width: e.nativeEvent.layout.width })
    }
  }

  _goToUsers = () => {
    const { post } = this.props
    navigate('modals', {
      screen: 'LikeList',
      params: { postId: post.id },
    })
  }

  _goToUser = user => () => {
    if (!this.props.onUserPress) {
      navigate('Screens', {
        screen: 'UserDetail',
        params: { userId: user.id },
      })
    }
  }

  render() {
    const {
      post,
      user,
      idx,
      onPress,
      onUserPress,
      fullscreen = false,
      style,
      type = 'default',
    } = this.props
    const {
      width,
      isPostLiked,
      isPostBookmarked,
      likeCount,
      postLikes,
    } = this.state
    if (post) {
      if (fullscreen) {
        return (
          <MemFullSizeCard
            onPress={this._onPress}
            onUserPress={this._goToUser}
            onMore={this._onMore}
            post={post}
            user={user}
            goToUsers={this._goToUsers}
            // goToUser={this._goToUser}
            onLike={this._onLike}
            width={width}
            style={style}
            type={type}
            onBookmark={this._onBookmark}
            onShare={this._onShare}
            onLayout={this._onLayout}
            isPostLiked={isPostLiked}
            isBookmarked={isPostBookmarked}
            likeCount={likeCount}
            postLikes={postLikes}
          />
        )
      } else {
        return (
          <MemVerticalCard
            onPress={this._onPress}
            post={post}
            user={user}
            onUserPress={this._goToUser}
            onLike={this._onLike}
            width={width}
            style={style}
            type={type}
            onShare={this._onShare}
            onLayout={this._onLayout}
            isPostLiked={isPostLiked}
            likeCount={likeCount}
          />
        )
      }
    }
    return null
  }
}

export default PostListItem
