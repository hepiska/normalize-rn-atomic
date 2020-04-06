import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Div,
  PressAbbleDiv,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { helveticaNormalFont } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import InviniteLoader from '@components/atoms/loaders/invinite'

interface PostListItemType {
  post: any
  user: any
  idx: string | number
  onPress: () => void
}

const styles = StyleSheet.create({
  post: {
    width: 246,
    height: 164,
    borderRadius: 8,
  },
  touchableDiv: {
    overflow: 'hidden',
    marginRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    width: 246,
  },
  userImage: {
    width: 16,
    height: 16,
    borderRadius: 20,
  },
  tags: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
})

class PostListItem extends React.PureComponent<PostListItemType, any> {
  render() {
    const { post, user, idx, onPress } = this.props

    return post && user ? (
      <TouchableWithoutFeedback onPress={onPress}>
        <Div
          style={{
            ...styles.touchableDiv,
            marginLeft: idx === 0 ? 16 : 0,
          }}>
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
            <Icon name="tags" size={16} color={colors.white} />
          </PressAbbleDiv>
          <Image
            source={{ uri: setImage(post.image_url, { ...styles.post }) }}
            style={styles.post}
          />
          <React.Fragment>
            <Font
              {...helveticaNormalFont}
              size="12px"
              color={colors.black100}
              mar="8px 0 0 0">
              {post.title}
            </Font>
            <Div
              _width="100%"
              mar="8px 0 0 0"
              justify="space-between"
              flexDirection="row">
              <PressAbbleDiv
                flexDirection="row"
                onPress={() =>
                  console.log('user clicked')
                } /* revisi: diganti navigasi ke detail user */
              >
                <Image
                  source={{
                    uri: setImage(user.photo_url, { ...styles.userImage }),
                  }}
                  style={styles.userImage}
                />
                <Font size="10.5px" color={colors.black70} padd="0 0 0 3px">
                  {user.name}
                </Font>
              </PressAbbleDiv>
              <PressAbbleDiv
                flexDirection="row"
                onPress={() =>
                  console.log('you like/unlike this post')
                } /* revisi: diganti dengan action like / unlike */
              >
                <Icon
                  name="heart"
                  size={16}
                  color={post.is_liked ? colors.black100 : colors.black50}
                />
                <Font size="10.5px" color={colors.black70} padd="0 0 0 4px">
                  {post.like_count}
                </Font>
              </PressAbbleDiv>
            </Div>
          </React.Fragment>
        </Div>
      </TouchableWithoutFeedback>
    ) : (
      <InviniteLoader />
    )
  }
}

export default PostListItem
