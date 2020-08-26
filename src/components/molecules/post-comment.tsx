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

const CommentWithData = commentsData(Comment)

interface CommentsType {
  style?: ViewStyle
  data?: any
  user: any
  comments: any
  postId: number
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

  render() {
    const { style, comments } = this.props

    return (
      <View style={{ ...style }}>
        <TouchableOpacity
          disabled={comments?.length === 0}
          onPress={this._showComment}>
          <Text
            style={{
              ...fontStyle.helvetica,
              fontWeight: '300',
              color: colors.black80,
              marginBottom: 8,
            }}>
            All Comments ({comments?.length})
          </Text>
        </TouchableOpacity>
        {this.state.showingComment ? (
          <View
            style={{
              marginVertical: 8,
              // backgroundColor: 'red',
            }}>
            {comments?.map((res, idx) => {
              return (
                <CommentWithData
                  key={'comment' + res + idx}
                  commentId={res}
                  style={{
                    marginBottom: idx === comments?.length - 1 ? 0 : 16,
                  }}
                />
              )
            })}
          </View>
        ) : (
          <></>
        )}
        <CommentWrite postId={this.props.postId} />
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
