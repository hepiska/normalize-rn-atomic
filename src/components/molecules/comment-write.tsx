import React, { useState, useCallback, memo } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import AvatarImage from '../atoms/avatar-image'
import { connect, useDispatch } from 'react-redux'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import { postComment } from '@modules/post/action'
import CirleLoader from '@components/atoms/loaders/circle'

const WriteComment = ({ me, postId, commentId, loading }) => {
  const [content, setComment] = useState('')
  const dispatch = useDispatch()
  const _handleChange = useCallback(data => {
    setComment(com => {
      return data
    })
  }, [])
  const _submitComment = useCallback(() => {
    dispatch(
      postComment({ postId, content, commentId }, data => {
        setComment(com => {
          return ''
        })
      }),
    )
  }, [content])

  return (
    <View style={{ flexDirection: 'row', marginTop: 8 }}>
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,

            {
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          ]}>
          <CirleLoader style={{ width: 40 }} loaderColor={colors.gold} />
        </View>
      )}

      <AvatarImage
        size={40}
        style={{ marginRight: 16 }}
        imgUrl={me?.photo_url || null}
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
          value={content}
          onChangeText={_handleChange}
          style={{ height: 40, flex: 1 }}
        />
        <TouchableOpacity onPress={_submitComment}>
          <Text style={{ ...fontStyle.helveticaBold }}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    me: state.user.data[state.auth.data.user.id],
    loading: state.post.commentLoading,
  }
}

export default connect(mapStateToProps)(memo(WriteComment))
