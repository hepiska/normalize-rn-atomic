import React, { useState } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import {
  Div,
  PressAbbleDiv,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage } from '@utils/helpers'
import { helveticaNormalFont, fontStyle } from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { navigate } from '@src/root-navigation'
import Config from 'react-native-config'

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
  horizontal?: boolean
  isLiked?: boolean
  isBookmarked: boolean
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

class PostListItem extends React.PureComponent<PostListItemType, any> {
  state = {
    defaultImage: null,
    isPostLiked: this.props.isLiked,
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

  _onLike = () => {
    const { isLiked, addLikedPost, removeLikedPost } = this.props

    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      if (isLiked) {
        removeLikedPost(this.props.post.id)
      } else {
        addLikedPost(this.props.post)
      }

      this.setState(state => ({
        isPostLiked: !state.isPostLiked,
      }))
    }
  }

  _onBookmark = () => {
    if (!this.props.isAuth) {
      navigate('modals', { screen: 'LoginModal' })
    } else {
      if (this.props.isBookmarked) {
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
      horizontal = false,
      style,
      type = 'default',
      isLiked,
    } = this.props
    const { isPostLiked } = this.state

    let width = 246
    if (!horizontal && style) {
      const composeStyle = { ...style }

      const margin = composeStyle.marginRight
        ? Number(composeStyle.marginRight)
        : Number(composeStyle.paddingHorizontal) * 2

      width = Number(composeStyle.width) - margin
      width = composeStyle.wrappermargin
        ? width - composeStyle.wrappermargin
        : width
    }

    const image =
      this.state.defaultImage ||
      (!!post.image_url &&
        setImage(post.image_url, horizontal ? { width } : { width }))

    if (post && user) {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <Div
            style={
              horizontal
                ? {
                    ...style,
                    ...styles.touchableDiv,
                    marginLeft: idx === 0 ? 16 : 0,
                  }
                : {
                    ...style,
                    width,
                    marginTop: idx >= 2 ? 24 : 0,
                  }
            }>
            {(post.post_type !== 'default' || post.post_type) && (
              <PressAbbleDiv
                style={styles.tags}
                zIndex="2"
                _background="rgba(26, 26, 26, 0.8)"
                _width="24px"
                _height="24px"
                borderRadius="20px"
                onPress={() =>
                  console.log('tags pressed')
                } /* revisi: diganti dengan navigation / action tags */
              >
                <Icon
                  name={renderIconType(post.post_type)}
                  size={12}
                  color={colors.white}
                />
              </PressAbbleDiv>
            )}

            <ImageAutoSchale
              source={typeof image === 'string' ? { uri: image } : image}
              errorStyle={{ width, height: 0.66 * width }}
              width={width}
              style={styles.image}
            />
            <React.Fragment>
              <Div _width="100%" align="flex-start">
                <View style={{ marginTop: 8 }}>
                  <Text
                    style={{
                      ...fontStyle.playfairBold,
                      fontSize: type === 'large' ? 20 : 12,
                      color: colors.black100,
                    }}>
                    {post.title}
                  </Text>
                </View>
              </Div>

              <Div
                _width="100%"
                mar="8px 0 0 0"
                justify="space-between"
                flexDirection="row">
                <PressAbbleDiv
                  flexDirection="row"
                  onPress={this._goToUser(user)}>
                  <ImageAutoSchale
                    source={
                      typeof user.photo_url === 'string'
                        ? { uri: user.photo_url }
                        : user.photo_url
                    }
                    // onError={() => {
                    //   this.setState({ defaultImage: defaultImages.product })
                    // }}
                    style={userImageStyle[type] || userImageStyle['default']}
                  />
                  <Font
                    style={{ ...fontStyle.futuraDemi, fontWeight: '500' }}
                    size={type === 'large' ? '16px' : '10.5px'}
                    weight={type === 'large' ? 'bold' : 'normal'}
                    color={type === 'large' ? colors.black100 : colors.black70}
                    padd="0 0 0 3px">
                    {user.name}
                  </Font>
                </PressAbbleDiv>
                <PressAbbleDiv flexDirection="row" onPress={this._onLike}>
                  <IconFa
                    name="heart"
                    size={16}
                    color={isPostLiked ? colors.black100 : colors.black50}
                  />
                  <Font
                    style={{ ...fontStyle.helvetica }}
                    size="14px"
                    color={colors.black100}
                    padd="0 0 0 4px">
                    {post.like_count}
                  </Font>
                </PressAbbleDiv>
              </Div>
            </React.Fragment>
          </Div>
        </TouchableWithoutFeedback>
      )
    }
    return null
  }
}

export default PostListItem
