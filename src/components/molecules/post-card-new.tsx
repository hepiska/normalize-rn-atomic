import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  Div,
  PressAbbleDiv,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage } from '@utils/helpers'
import {
  helveticaNormalFont,
  fontStyle,
  shadows,
} from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconFa from 'react-native-vector-icons/FontAwesome'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import InviniteLoader from '@components/atoms/loaders/invinite'
import Config from 'react-native-config'
import { navigate } from '@src/root-navigation'
import Line from '@components/atoms/line'

interface PostListItemType {
  post: any
  user: any
  type?: string
  idx: string | number
  onPress: () => void
  onLike: (postId) => void
  fullscreen?: boolean
  isLiked?: boolean
  style?: any
  isAuth?: boolean
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
  layout,
  post,
  isLiked,
  onLayout,
  style,
  onPress,
  onShare,
  goToUser,
  goToUsers,
  onLike,
}: any) => {
  const maxTitile = 3000
  const maxSubtitle = 200
  const title =
    post.title.length > maxTitile
      ? post.title.substring(0, maxTitile) + '...'
      : post.title

  const subtitle =
    post.subtitle && post.subtitle.length > maxSubtitle
      ? post.subtitle.substring(0, maxSubtitle) + '...'
      : post.subtitle
  return (
    <View
      style={{
        // borderWidth: 1,
        // overflow: 'hidden',

        backgroundColor: 'white',
        // borderColor: colors.black10,
        ...style,
      }}
      onLayout={onLayout}>
      <Line />
      {user && (
        <View style={{ ...fullscreenstyles.sectionContainer }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => goToUser(user)}>
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
            </TouchableOpacity>

            <Text
              style={{
                ...fontStyle.helveticaBold,
                fontSize: 14,
                color: colors.black100,
              }}>
              {user.username}
            </Text>
          </View>
          <IconFa name="ellipsis-h" size={16} />
        </View>
      )}
      {layout && (
        <View style={{ marginBottom: 8 }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              source={{
                uri: setImage(post.image_url, { width: layout.width }),
              }}
              errorStyle={{ width: layout.width, height: layout.width * 0.66 }}
              thumbnailSource={{ uri: setImage(post.image_url, { width: 24 }) }}
              width={layout.width}
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
          {post.post_type.toUpperCase()}
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
            {post.subtitle}
          </Text>
        </View>
      )}
      <View
        style={{
          ...fullscreenstyles.sectionContainer,
        }}>
        <View style={fullscreenstyles.rowContainer}>
          <View style={{ ...fullscreenstyles.rowContainer, marginRight: 24 }}>
            <IconFa
              name={isLiked ? 'heart' : 'heart-o'}
              onPress={onLike}
              size={20}
              color={isLiked ? colors.red2 : colors.black80}
            />
            <Font size="10.5px" color={colors.black80} padd="0 0 0 8px">
              {post.like_count}
            </Font>
          </View>
          <View style={fullscreenstyles.rowContainer}>
            <IconFa
              name="comment-o"
              onPress={onLike}
              size={20}
              color={colors.black80}
            />
            <Font size="10.5px" color={colors.black80} padd="0 0 0 8px">
              {post.comment_count}
            </Font>
          </View>
        </View>

        <View style={fullscreenstyles.rowContainer}>
          <IconMC
            name="share-outline"
            size={20}
            onPress={onShare}
            color={colors.black70}
          />
          <IconMC
            name="bookmark-outline"
            size={20}
            style={{ marginLeft: 26 }}
            onPress={onShare}
            color={colors.black70}
          />
        </View>
      </View>
      {post.likes && (
        <View
          style={{
            ...fullscreenstyles.sectionContainer,
            marginTop: 0,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            style={fullscreenstyles.rowContainer}
            onPress={goToUsers}>
            {post.likes.map((_like, idx) => {
              const img = _like.user.photo_url
              return (
                <View
                  key={`user-saved-${idx}`}
                  style={{
                    borderColor: colors.white,
                    borderRadius: 20,
                    borderWidth: 1,
                    marginLeft: idx !== 0 ? -16 : 0,
                  }}>
                  <Image
                    key={`image-user-saved-${idx}`}
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
                ...fontStyle.helveticaThin,
                fontSize: 12,
                marginRight: 4,
              }}>
              Liked By
            </Text>
            <TouchableOpacity onPress={() => goToUser(post.likes[0].user)}>
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 12,
                  marginRight: 4,
                  color: colors.black100,
                }}>
                {post.likes[0].user.username}
              </Text>
            </TouchableOpacity>
            {post && post.likes.length > 1 && (
              <>
                <Text
                  style={{
                    ...fontStyle.helveticaThin,
                    fontSize: 12,
                    marginRight: 4,
                  }}>
                  And
                </Text>
                <TouchableOpacity onPress={goToUsers}>
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      marginRight: 4,
                    }}>
                    {`${post.likes.length - 1} others`}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

const VerticalCart = ({
  user,
  layout,
  post,
  isLiked,
  onLayout,
  style,
  onPress,
  onShare,
  onLike,
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
          }}>
          <TouchableOpacity>
            <Image
              source={{
                uri: setImage(user.photo_url, { width: 24 }),
              }}
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
      {layout && (
        <View
          style={{
            marginVertical: 4,
            overflow: 'hidden',
          }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImageAutoSchale
              source={{
                uri: setImage(post.image_url, { width: layout.width }),
              }}
              errorStyle={{ width: layout.width, height: layout.width * 0.66 }}
              thumbnailSource={{ uri: setImage(post.image_url, { width: 24 }) }}
              width={layout.width}
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
          <IconFa
            name="heart"
            onPress={onLike}
            size={16}
            color={isLiked ? colors.red2 : colors.black50}
          />
          <Font size="10.5px" color={colors.black70} padd="0 0 0 4px">
            {post.like_count}
          </Font>
        </View>

        <IconMC
          name="share-outline"
          size={16}
          onPress={onShare}
          color={colors.black70}
        />
      </View>
    </View>
  )
}

class PostListItem extends React.PureComponent<PostListItemType, any> {
  state: any = {
    defaultImage: null,
    isPostLiked: this.props.isLiked,
  }

  _onLike = () => {
    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      this.props.onLike(this.props.post.id)
      this.setState(state => ({
        isPostLiked: !state.isPostLiked,
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

  _onUserCliked = () => {
    navigate('Screens', {
      screen: 'UserDetail',
      params: { userId: this.props.user.id },
    })
  }

  _onLayout = e => {
    this.setState({ layout: e.nativeEvent.layout })
  }
  _goToUsers = () => {
    console.log('===== to users')
  }
  _goToUser = user => {
    console.log('===== to users', user)
  }

  render() {
    const {
      post,
      user,
      idx,
      onPress,
      fullscreen = false,
      style,
      type = 'default',
      isLiked,
    } = this.props
    const { layout, isPostLiked } = this.state
    if (post) {
      if (fullscreen) {
        return (
          <FullscreenCard
            onPress={onPress}
            post={post}
            user={user}
            goToUsers={this._goToUsers}
            goToUser={this._goToUser}
            onLike={this._onLike}
            layout={layout}
            style={style}
            type={type}
            onShare={this._onShare}
            onLayout={this._onLayout}
            isLiked={isPostLiked}
          />
        )
      } else {
        return (
          <VerticalCart
            onPress={onPress}
            post={post}
            user={user}
            onLike={this._onLike}
            layout={layout}
            style={style}
            type={type}
            onShare={this._onShare}
            onLayout={this._onLayout}
            isLiked={isPostLiked}
          />
        )
      }
    }
    return <InviniteLoader />
  }
}

export default PostListItem
