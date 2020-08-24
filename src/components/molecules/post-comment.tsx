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

const CommentWithData = commentsData(Comment)

interface CommentsType {
  style?: ViewStyle
  data?: any
}

export default class PostComment extends Component<CommentsType, any> {
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
    const { style, data } = this.props
    const dataComments = data?.comments
    console.log('comments', data)

    const comments = [
      {
        comment:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus repellat dolor facere?',
        user: 'Bruce',
      },
      {
        comment:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur.?',
        user: 'Arthur',
      },
      // { comment: 'Lorem ipsum dolor sit amet.', user: 'Diana' },
    ]

    return (
      <View style={{ ...style }}>
        <TouchableOpacity
          disabled={dataComments.length === 0}
          onPress={this._showComment}>
          <Text
            style={{
              ...fontStyle.helvetica,
              fontWeight: '300',
              color: colors.black80,
              marginBottom: 8,
            }}>
            {' '}
            All Comments ({dataComments.length}){' '}
          </Text>
        </TouchableOpacity>
        {this.state.showingComment ? (
          <View
            style={{
              marginVertical: 8,
              // backgroundColor: 'red',
            }}>
            {dataComments.map((res, idx) => {
              return (
                <CommentWithData
                  key={'comment' + res + idx}
                  commentId={res}
                  style={{
                    marginBottom: idx === dataComments.length - 1 ? 0 : 16,
                  }}
                />
              )
            })}
          </View>
        ) : (
          <></>
        )}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <AvatarImage
            size={40}
            style={{ marginRight: 16 }}
            imgUrl={data?.user.photo_url}
          />
          <View
            style={{
              backgroundColor: colors.black50,
              height: 40,
              flex: 1,
              flexDirection: 'row',
              borderRadius: 8,
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder={'Add your comment...'}
              style={{ height: 40, flex: 1 }}
            />
            <TouchableOpacity onPress={null}>
              <Text style={{ ...fontStyle.helveticaBold }}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
