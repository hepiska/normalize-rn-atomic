import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import AvatarImage from '../atoms/avatar-image'
import Comment from '../molecules/comment-post'
import { commentsData } from '@hocs/data/post'
import { connect } from 'react-redux'
import CommentWrite from './comment-write'
import { navigate } from '@src/root-navigation'

const CommentWithData = commentsData(Comment)

interface CommentsType {
  style?: ViewStyle
  data?: any
  user: any
  comments: any
  postId: number
  isCard: boolean
}

class PostComment extends Component<CommentsType, any> {
  state = {
    showingComment: false,
  }

  _showComment = () => {
    if (!this.state.showingComment) {
      this.setState({
        showingComment: this.state.showingComment,
      })
    }
    this.setState({
      showingComment: !this.state.showingComment,
    })
  }

  _goToPost = () => {
    const { postId } = this.props

    navigate('Screens', {
      screen: 'PostDetail',
      params: { postId: postId },
    })
  }

  render() {
    const { style, comments, isCard } = this.props

    return (
      <View style={{ ...style }}>
        {isCard ? (
          <Text
            onPress={this._goToPost}
            style={{ fontSize: 12, paddingHorizontal: 16 }}>
            View all {comments ? comments?.length : '0'} comments
          </Text>
        ) : (
          <TouchableOpacity disabled={!comments} onPress={this._showComment}>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontWeight: '300',
                color: colors.black80,
                marginBottom: 8,
              }}>
              All Comments ({comments ? comments?.length : '0'})
            </Text>
          </TouchableOpacity>
        )}

        {this.state.showingComment && (
          <View
            style={{
              marginVertical: 8,
              // backgroundColor: 'red',
            }}>
            {comments?.map((res, idx) => {
              const isCardMargin = isCard ? 8 : 16
              return (
                <CommentWithData
                  isCard={isCard}
                  key={'comment' + res + idx}
                  commentId={res}
                  style={{
                    marginBottom:
                      idx === comments?.length - 1 ? 0 : isCardMargin,
                  }}
                />
              )
            })}
          </View>
        )}
        {isCard && (
          <View
            style={{
              marginVertical: 8,
              paddingHorizontal: 16,
              // backgroundColor: 'red',
            }}>
            {comments?.map((res, idx) => {
              const isCardMargin = isCard ? 8 : 16
              return (
                <CommentWithData
                  isCard={isCard}
                  key={'comment' + res + idx}
                  commentId={res}
                  style={{
                    marginBottom:
                      idx === comments?.length - 1 ? 0 : isCardMargin,
                  }}
                />
              )
            })}
          </View>
        )}

        <CommentWrite isCard={isCard} postId={this.props.postId} />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.post.data[ownProps.postId].comments,
  }
}

export default connect(mapStateToProps)(PostComment)
