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

const styles = StyleSheet.create({
  base: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  baseIsDetail: {
    backgroundColor: colors.black10,
    borderRadius: 8,
  },
  baseIsCard: {
    backgroundColor: colors.white,
    borderTopColor: colors.black10,
    borderBottomColor: colors.black10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
})
const WriteComment = ({ me, postId, commentId, loading, isCard }) => {
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

      {!isCard && (
        <AvatarImage
          size={40}
          style={{ marginRight: 16 }}
          imgUrl={me?.photo_url || null}
        />
      )}
      <View
        style={{
          ...styles.base,
          backgroundColor: isCard ? colors.white : colors.black50,
          borderRadius: isCard ? 0 : 8,
          borderTopColor: colors.black50,
          borderBottomColor: colors.black50,
          borderBottomWidth: isCard ? 1 : 0,
          borderTopWidth: isCard ? 1 : 0,
        }}>
        <TextInput
          placeholder={'Add your comment...'}
          value={content}
          onChangeText={_handleChange}
          style={{ height: 40, flex: 1 }}
        />
        <TouchableOpacity onPress={_submitComment} disabled={!content}>
          <Text
            style={{
              ...fontStyle.helveticaBold,
              color: !content ? colors.black80 : colors.purple1,
            }}>
            POST
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  if (state.auth.data.user) {
    return {
      me: state.user.data[state.auth.data.user.id],
      loading: state.post.commentLoading,
    }
  }
  return {
    loading: state.post.commentLoading,
  }
}

export default connect(mapStateToProps)(memo(WriteComment))
