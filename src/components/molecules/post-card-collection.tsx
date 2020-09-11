import React, { useState, memo, PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native'
import Immutable from 'seamless-immutable'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Config from 'react-native-config'
import { setImage, calculateDay } from '@utils/helpers'
import { colors, images as defaultImages } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Line from '@components/atoms/line'
import { textElipsis as textLimit } from '@utils/helpers'
import AvatarImage from '../atoms/avatar-image'
import { fontStyle } from '../commont-styles'
import PostComment from '../molecules/post-comment'

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
  fullscreen?: boolean
  isLiked?: boolean
  style?: any
  isAuth?: boolean
  userAuth?: any
  displayComment?: boolean
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.black50,
    borderTopWidth: 1,
    backgroundColor: colors.white,
    paddingVertical: 16,
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
})

const CollectionCard = ({
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
  comments,
  userAuth,
  displayComment,
}: any) => {
  const maxTitle = 3000
  const maxSubtitle = 200
  const title =
    post.title.length > maxTitle
      ? textLimit(post.subtitle, maxTitle)
      : post.title

  const subtitle =
    post.subtitle &&
    post.subtitle !== undefined &&
    post.subtitle.length > maxSubtitle
      ? textLimit(post.subtitle, maxSubtitle)
      : null
  const postType =
    post.post_type !== 'article'
      ? post.post_type.toUpperCase()
      : post.category.name.toUpperCase() || 'UNCATEGORIZED'

  // console.log('=====> post ', post)
  // not proper on trending post by our insider page-shop
  return (
    <View style={{ ...styles.container, ...style }} onLayout={onLayout}>
      {user && (
        <View
          style={{
            ...styles.content,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onUserPress(user)}>
            <AvatarImage
              imgUrl={user.photo_url}
              size={32}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={onUserPress(user)}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 2,
              }}>
              <Text
                style={{
                  ...fontStyle.helveticaBold,
                  fontSize: 14,
                  color: colors.black100,
                }}>
                {user.username || user.name}
              </Text>
              <Icon
                style={{
                  marginLeft: 4,
                  borderRadius: 7,
                  overflow: 'hidden',
                  backgroundColor: colors.gold50,
                }}
                name={'check-circle'}
                size={14}
                color={colors.black100}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...fontStyle.helvetica,
                color: colors.black60,
                fontSize: 12,
              }}>
              {calculateDay(post.published_at)}
            </Text>
          </View>
          <TouchableOpacity onPress={onMore}>
            <Icon name="dots-horizontal" size={24} color={colors.black100} />
          </TouchableOpacity>
        </View>
      )}
      {/* image section */}
      {width && (
        <View style={{ marginVertical: 16 }}>
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
              height={style.imageHeight}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      {/* user interaction */}
      <View
        style={{
          ...styles.content,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <TouchableOpacity onPress={onLike}>
          <Icon
            name={isPostLiked ? 'heart' : 'heart-outline'}
            color={isPostLiked ? colors.red1 : colors.black80}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.interact}>
          <TouchableOpacity
            onPress={postLikes?.length > 0 ? goToUsers : onLike}>
            {/* only showing 3 liked user */}
            {/* still need improve */}
            {postLikes?.length > 0 ? (
              <View
                style={{
                  width:
                    postLikes?.length < 3 && postLikes.length > 0
                      ? postLikes.length * 16
                      : 3 * 16,
                  height: 20,
                }}>
                {/* still need improve */}
                {postLikes.slice(0, 3).map((value, key) => {
                  const img = value.user.photo_url
                  return (
                    <AvatarImage
                      key={`user-like-${key}`}
                      size={20}
                      imgUrl={img}
                      style={{
                        position: 'absolute',
                        left: key * 12,
                        borderColor: colors.white,
                        borderWidth: 1,
                      }}
                    />
                  )
                })}
              </View>
            ) : (
              <Text style={{ ...fontStyle.helvetica, fontSize: 12 }}>
                Be the first like
              </Text>
            )}
          </TouchableOpacity>
          {postLikes?.length > 0 && (
            <View
              style={{
                marginLeft: 8,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 12,
                  marginRight: 4,
                }}>
                Liked by
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
          )}
        </View>
        <TouchableOpacity onPress={onShare}>
          <Image
            source={require('@assets/icons/share.png')}
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
      {/* title subtitle section */}
      <View style={{ ...styles.content, marginBottom: 16 }}>
        <Text
          style={{
            ...fontStyle.playfairMedium,
            fontSize: 18,
            lineHeight: 25,
            color: colors.black100,
            marginBottom: subtitle ? 8 : 0,
          }}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              ...fontStyle.helveticaThin,
              color: colors.black80,
            }}>
            {subtitle}
          </Text>
        )}
      </View>
      {/* comment section */}
      {displayComment !== false && (
        <PostComment data={comments} isCard user={userAuth} postId={post.id} />
      )}
    </View>
  )
}

const Card = memo(CollectionCard)

class PostListItem extends React.Component<PostListItemType, any> {
  state: any = {
    isPostLiked: this.props.isLiked,
    width: null,
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
      userAuth,
      displayComment,
    } = this.props
    const {
      width,
      isPostLiked,
      isPostBookmarked,
      likeCount,
      postLikes,
    } = this.state

    const comments = { comments: post.comments, user: userAuth }

    if (post) {
      return (
        <Card
          onPress={this._onPress}
          onUserPress={this._goToUser}
          onMore={this._onMore}
          post={post}
          user={user}
          goToUsers={this._goToUsers}
          onLike={this._onLike}
          width={width}
          style={style}
          type={type}
          onShare={this._onShare}
          onLayout={this._onLayout}
          isPostLiked={isPostLiked}
          isBookmarked={isPostBookmarked}
          likeCount={likeCount}
          postLikes={postLikes}
          userAuth={userAuth}
          comments={comments}
          displayComment={displayComment}
        />
      )
    } else return null
  }
}

export default PostListItem
