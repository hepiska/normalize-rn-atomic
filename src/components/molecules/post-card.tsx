import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Div,
  PressAbbleDiv,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage } from '@utils/helpers'
import { helveticaNormalFont } from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconFa from 'react-native-vector-icons/FontAwesome'
import InviniteLoader from '@components/atoms/loaders/invinite'
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
  }

  _onLike = () => {
    this.props.onLike(this.props.post.id)
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
      (!!post.image_url
        ? setImage(post.image_url, horizontal ? { width } : { width })
        : defaultImages.product)

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
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              width={width}
              style={styles.image}
            />
            <React.Fragment>
              <Div _width="100%" align="flex-start">
                <Font
                  {...helveticaNormalFont}
                  size={type === 'large' ? '13px' : '12px'}
                  color={colors.black100}
                  mar="8px 0 0 0">
                  {post.title}
                </Font>
              </Div>

              <Div
                _width="100%"
                mar="8px 0 0 0"
                justify="space-between"
                flexDirection="row">
                <PressAbbleDiv
                  flexDirection="row"
                  onPress={() =>
                    navigate('Insider', {
                      screen: 'UserDetail',
                      params: { userId: user.id },
                    })
                  }>
                  <ImageAutoSchale
                    source={
                      typeof user.photo_url === 'string'
                        ? { uri: user.photo_url }
                        : user.photo_url
                    }
                    onError={() => {
                      this.setState({ defaultImage: defaultImages.product })
                    }}
                    style={userImageStyle[type] || userImageStyle['default']}
                  />
                  <Font
                    size={type === 'large' ? '12px' : '10.5px'}
                    style={{ fontWeight: 'bold' }}
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
                    color={isLiked ? colors.black100 : colors.black50}
                  />
                  <Font size="10.5px" color={colors.black70} padd="0 0 0 4px">
                    {post.like_count}
                  </Font>
                </PressAbbleDiv>
              </Div>
            </React.Fragment>
          </Div>
        </TouchableWithoutFeedback>
      )
    }
    return <InviniteLoader />
  }
}

export default PostListItem
