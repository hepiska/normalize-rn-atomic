import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '@src/root-navigation'
import { fontStyle } from '../commont-styles'
import ProfileWritten from '../molecules/profile-written'
import TagList from '../molecules/tags-pill'
import PostComment from '../molecules/post-comment'
import EditorPicks from '../molecules/editor-picks'
import RelatedPost from '../molecules/related-post'
import AvatarImage from '../atoms/avatar-image'
import PostContent from '@components/molecules/post-content'

const styles = StyleSheet.create({
  cat: {
    ...fontStyle.helveticaThin,
    letterSpacing: 3,
    fontSize: 14,
    color: colors.black80,
  },
  h1: {
    ...fontStyle.playfairBold,
    fontSize: 20,
    paddingVertical: 8,
  },
})

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
  isLiked?: boolean
  isBookmarked?: boolean
  style?: any
  isAuth?: boolean
  userAuth?: any
}

export default class PostDetail extends React.Component<PostListItemType, any> {
  state: any = {
    isPostLiked: this.props.isLiked,
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
    return false
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

  _showLikers = ({ postLikes }) => {
    if (postLikes.length < 3) {
      return postLikes.length
    }
    return 3
  }

  render() {
    const {
      post,
      user,
      userAuth,
      idx,
      onPress,
      onUserPress,
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

    const owner = { ...user, createdAt: post.published_at }

    const comments = { comments: post.comments, user: userAuth }
    const editorsPick = [
      {
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ab sapiente voluptatem fugiat ea tenetur.',
      },
      {
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum rem iste quasi nihil eius eos modi at et.',
      },
      {
        title:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nisi quam quis. Lorem, ipsum.',
      },
    ]

    return (
      <View style={{ padding: 16 }}>
        <Text style={styles.cat}>
          {post.category.name === ''
            ? 'UNCATEGORIZED'
            : post.category.name.toUpperCase()}
        </Text>
        <Text style={styles.h1}>{post.title}</Text>
        <ProfileWritten small data={owner} />
        <PostContent content={post.content} style={{ marginBottom: 16 }} />
        <TagList data={post.tags} />
        <View
          style={{
            marginBottom: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            <TouchableOpacity style={{ marginRight: 8 }} onPress={this._onLike}>
              <Icon
                name={isPostLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={colors.black100}
              />
            </TouchableOpacity>
            {postLikes?.length > 0 ? (
              <Text style={{ fontSize: 12 }}>{likeCount} Likes</Text>
            ) : (
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 12,
                  color: colors.black100,
                }}>
                Be the first to
                <Text style={{ fontWeight: '500' }}>{` like`}</Text>
              </Text>
            )}
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <Icon name={'share'} size={24} color={colors.black100} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name={isPostBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={colors.black100}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={null}>
              {/* only showing 3 liked user */}
              {/* still need improve */}
              <View
                style={{
                  width: postLikes.length < 3 ? postLikes.length * 16 : 3 * 16,
                  height: 20,
                }}>
                {/* still need improve */}
                {postLikes.length < 3
                  ? postLikes.map((value, key) => {
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
                    })
                  : postLikes.slice(0, 3).map((value, key) => {
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
            </TouchableOpacity>
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
              <TouchableOpacity onPress={null}>
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
                  <TouchableOpacity onPress={null}>
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
        </View>

        <ProfileWritten data={owner} />
        <PostComment
          data={comments}
          style={{ marginTop: 16, marginBottom: 24 }}
        />
        <EditorPicks data={editorsPick} />
        <RelatedPost data={editorsPick} style={{ marginVertical: 32 }} />
      </View>
    )
  }
}
