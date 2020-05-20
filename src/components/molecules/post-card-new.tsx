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
import InviniteLoader from '@components/atoms/loaders/invinite'
import Config from 'react-native-config'
import { navigate } from '@src/root-navigation'

interface PostListItemType {
  post: any
  user: any
  type?: string
  idx: string | number
  onPress: () => void
  onLike: (postId) => void
  horizontal?: boolean
  isLiked?: boolean
  style?: any
  isAuth?: boolean
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
  },
  postHorizontal: {
    width: 246,
    height: 164,
  },
  postVertical: {
    width: 200,
  },
  touchableDiv: {
    overflow: 'hidden',
    marginRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    width: 246,
  },

  tags: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  // helvetica14: {
  //   ...fontStyle.helvetica,
  //   size: 14,
  // }
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
  const maxTitile = 40
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
        // overflow: 'hidden',
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

          <Text style={{ ...fontStyle.helveticaBold, fontSize: 10 }}>
            {user.username}
          </Text>
        </View>
      )}
      {layout && (
        <View style={{ marginVertical: 4 }}>
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
      <View style={{ marginVertical: 4, marginHorizontal: 8 }}>
        <Text style={{ ...fontStyle.helveticaBold, fontSize: 10 }}>
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

        <IconFa
          name="share"
          size={16}
          onPress={onShare}
          color={colors.black70}
        />
      </View>
    </View>
  )
}

// const HorizontalPost = ({  user,
//   layout,
//   post,
//   isLiked,
//   onLayout,
//   style,
//   onPress,
//   onShare,
//   onLike,}: any) => {return (
//     <TouchableWithoutFeedback onPress={onPress}>
//           <View>

//           </View>
//     </TouchableWithoutFeedback>
//   )}

class PostListItem extends React.PureComponent<PostListItemType, any> {
  state: any = {
    defaultImage: null,
  }

  _onLike = () => {
    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      this.props.onLike(this.props.post.id)
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

  render() {
    const {
      post,
      user,
      idx,
      onPress,
      horizontal = false,
      style,
      type = 'default',
      isLiked,
    } = this.props
    const { layout } = this.state
    if (post) {
      if (horizontal) {
        return null
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
            isLiked={isLiked}
          />
        )
      }
    }
    return <InviniteLoader />
  }
}

export default PostListItem
