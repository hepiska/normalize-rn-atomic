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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { calculateTimeDifference } from '@utils/helpers'

interface CommentChildType {
  style?: ViewStyle
  data?: any
  comment?: any
}
class CommentChild extends Component<CommentChildType, any> {
  state = {
    showReply: false,
  }

  _reply = () => {
    if (!this.state.showReply) {
      this.setState({
        showReply: this.state.showReply,
      })
    }
    this.setState({
      showReply: !this.state.showReply,
    })
  }

  render() {
    const { style, data } = this.props
    return (
      <View style={{ ...style, flexDirection: 'row' }}>
        <AvatarImage style={{ marginRight: 8 }} size={28} />
        <View style={{ marginBottom: 8, flex: 1 }}>
          <Text style={{ marginBottom: 8, flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{data.user}</Text>{' '}
            {data.comment}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black60,
              }}>
              Less than a minutes ago
            </Text>
            <TouchableOpacity
              onPress={this._reply}
              style={{ paddingHorizontal: 8, flex: 1 }}>
              <Text style={{ ...fontStyle.helvetica, fontSize: 12 }}>
                {this.state.showReply ? 'Cancel' : 'Reply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity style={{ marginBottom: 8 }}>
            <Icon name="heart" size={20} color={colors.black50} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="dots-horizontal" size={20} color={colors.black60} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

interface CommentListType {
  style?: ViewStyle
  data?: Object
  comment?: any
}

export default class Comment extends Component<CommentListType, any> {
  state = {
    showingComment: true,
    showReplies: false,
    showReply: false,
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

  _showReplies = () => {
    if (!this.state.showReplies) {
      this.setState({
        showReplies: this.state.showReplies,
      })
    }
    this.setState({
      showReplies: !this.state.showReplies,
    })
  }

  _reply = () => {
    if (!this.state.showReply) {
      this.setState({
        showReply: this.state.showReply,
      })
    }
    this.setState({
      showReply: !this.state.showReply,
    })
  }

  _gettimeDif = comment => {
    const timeDif = calculateTimeDifference(comment.created_at)
    if (timeDif.year) {
      return timeDif.year + ' years ago'
    }
    if (timeDif.month) {
      return timeDif.month + ' months ago'
    }
    if (timeDif.week) {
      return timeDif.week + ' weeks ago'
    }
    if (timeDif.days) {
      return timeDif.days + ' days ago'
    }
    if (timeDif.minutes) {
      return timeDif.minutes + ' minutes ago'
    } else {
      return ' Less than a minutes ago'
    }
  }

  render() {
    const { style, comment } = this.props
    const timeDif = calculateTimeDifference(comment.created_at)

    return (
      <View style={{ ...style }}>
        <View style={{ flexDirection: 'row' }}>
          <AvatarImage
            style={{ marginRight: 8 }}
            size={40}
            imgUrl={comment.user.photo_url}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{comment.user.name}</Text>{' '}
              {comment.content}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 12,
                  color: colors.black60,
                }}>
                {this._gettimeDif(comment)}
              </Text>
              <TouchableOpacity
                onPress={this._reply}
                style={{ paddingHorizontal: 8, flex: 1 }}>
                <Text style={{ ...fontStyle.helvetica, fontSize: 12 }}>
                  {this.state.showReply ? 'Cancel' : 'Reply'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* VIEW REPLY  */}
            {comment.replies.length > 0 && (
              <View
                style={{
                  height: 20,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginHorizontal: 8,
                    height: 1,
                    width: 40,
                    backgroundColor: colors.black60,
                  }}
                />

                <TouchableOpacity onPress={this._showReplies}>
                  <Text style={{ fontSize: 12 }}>
                    {this.state.showReplies
                      ? 'Hide Replies'
                      : 'View Reply (' + comment.replies?.length + ')'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ marginLeft: 16 }}>
            <TouchableOpacity style={{ marginBottom: 8 }}>
              <Icon name="heart" size={20} color={colors.black50} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="dots-horizontal" size={20} color={colors.black60} />
            </TouchableOpacity>
          </View>
        </View>
        {/* padding left based on avatar image size */}
        {/* COMMENT CHILD REPLIES  */}
        {this.state.showReplies ? (
          <View
            style={{
              paddingLeft: 48,
              marginTop: 8,
              flex: 1,
            }}>
            {comment.replies?.map((_comm, idx) => {
              return (
                <Comment
                  key={idx}
                  comment={_comm}
                  style={{
                    marginBottom: idx === comment.replies?.length - 1 ? 0 : 8,
                  }}
                />
              )
            })}
          </View>
        ) : (
          <></>
        )}
      </View>
    )
  }
}
