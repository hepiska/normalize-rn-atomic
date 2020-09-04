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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AvatarImage from '../atoms/avatar-image'
import CommentWrite from './comment-write'
import { likeComments, deleteComment } from '@modules/post/action'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { textElipsis as textLimit } from '@utils/helpers'
import ModalConfirmation from '@components/organisms/modal-confirmation'
import Tooltip from 'rn-tooltip'
import { calculateTimeDifference, countlongCreate } from '@utils/helpers'
import { comment } from '@src/modules/normalize-schema'

interface CommentChildType {
  style?: ViewStyle
  data?: any
  likeComments?: (props: any) => void
  comment?: any
}

interface CommentListType {
  style?: ViewStyle
  data?: Object
  likeComments?: (props: any) => void
  deleteComment?: (props: any) => void
  comment?: any
  me: any
  isCard: boolean
}

class Comment extends Component<CommentListType, any> {
  state = {
    showingComment: true,
    showReplies: false,
    showReply: false,
    isModalOpen: false,
    is_liked: this.props.comment.is_liked,
    modalType:
      this.props.comment.user_id === this.props.me.id ? 'delete' : 'report',
  }
  tooltip = null

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

  _modalData = {
    delete: {
      title: 'Delete Comment',
      subtitle: 'Are you sure you want to delete this comment?',
      confirm: {
        title: 'Delete',
        action: () => {
          this._closeModal()
          const { comment, deleteComment } = this.props
          deleteComment({ postId: comment.post_id, commentId: comment.id })
        },
      },
      cancel: {
        title: 'Cancel',
        action: () => {
          this._closeModal()
        },
      },
    },
    report: {
      title: 'Report Comment',
      subtitle: 'Are you sure you want to report this comment?',
      confirm: {
        title: 'Report',
        action: () => {
          const { comment, deleteComment } = this.props

          this._closeModal()
        },
      },
      cancel: {
        title: 'Cancel',
        action: () => {
          this._closeModal()
        },
      },
    },
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
    this.setState({
      showReply: !this.state.showReply,
    })
  }

  _gettimeDif = comment => {
    return countlongCreate(comment.created_at)
  }
  _handleLike = () => {
    const { comment, likeComments } = this.props

    likeComments({ postId: comment.post_id, commentId: comment.id })
    this.setState({
      is_liked: !this.state.is_liked,
    })
  }

  _closeModal = () => {
    this.setState({ isModalOpen: false })
  }
  _openModal = () => {
    console.log(this.tooltip)
    if (this.tooltip) {
      this.tooltip.toggleTooltip()
    }
    this.setState({ isModalOpen: true })
  }

  _toolTipAction = () => {
    const { is_liked, isModalOpen, modalType } = this.state
    if (modalType === 'delete') {
      return (
        <TouchableOpacity
          onPress={this._openModal}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="close" size={14} />
          <Text style={[fontStyle.helvetica, { marginLeft: 8 }]}> Delete </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this._openModal}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="close" size={14} />
          <Text style={[fontStyle.helvetica, { marginLeft: 8 }]}> Delete </Text>
        </TouchableOpacity>
      )
    }
  }
  render() {
    const { style, comment, me, isCard } = this.props
    const { is_liked, isModalOpen, modalType } = this.state

    const SimpleComment = () => {
      return (
        <View
          style={{
            ...style,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...fontStyle.helveticaBold,
              fontSize: 12,
              lineHeight: 16,
            }}>
            {comment.user.name}{' '}
            <Text style={{ ...fontStyle.helvetica, color: colors.black70 }}>
              {textLimit(comment.content, 117)}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={this._handleLike}
            style={{ marginLeft: 10 }}>
            <Icon
              name={'heart'}
              size={16}
              color={is_liked ? colors.red1 : colors.black50}
            />
          </TouchableOpacity>
        </View>
      )
    }

    if (isCard) {
      return <SimpleComment />
    }
    return (
      <View style={{ ...style }}>
        <ModalConfirmation
          isOpen={isModalOpen}
          data={this._modalData[modalType]}
        />
        <View style={{ flexDirection: 'row', width: '100%' }}>
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
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onPress={this._handleLike}>
              <Icon
                name="heart"
                size={20}
                color={is_liked ? colors.red1 : colors.black50}
              />
            </TouchableOpacity>
            <Tooltip
              actionType="press"
              ref={ref => {
                this.tooltip = ref
              }}
              withOverlay={false}
              containerStyle={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: colors.black50,
              }}
              backgroundColor={colors.white}
              popover={
                <View style={{ backgroundColor: 'white' }}>
                  {this._toolTipAction()}
                </View>
              }>
              <Icon name="dots-horizontal" size={20} color={colors.black60} />
            </Tooltip>
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
                <EnhanceComments
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
        {this.state.showReply && (
          <View
            style={{
              paddingLeft: 48,
              marginTop: 8,
              flex: 1,
            }}>
            <CommentWrite commentId={comment.id} postId={comment.post_id} />
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    me: state.auth?.data?.user || {},
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ likeComments, deleteComment }, dispatch)

const EnhanceComments = connect(mapStateToProps, mapDispatchToProps)(Comment)

export default EnhanceComments
