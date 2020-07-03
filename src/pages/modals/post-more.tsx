import React, { useEffect, useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Animated, { Easing, cos } from 'react-native-reanimated'
import { Button } from '@components/atoms/button'
import { fontStyle } from '@components/commont-styles'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { request } from '@src/utils/services'
import { archivePost } from '@modules/user-post/action'
import ConfirmationBox from '@components/molecules/confirmation-box'
import Toast from '@components/molecules/toast'
import { dispatch } from '@src/root-navigation'

const { Value, timing, interpolate, Extrapolate } = Animated

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 30,
    ...fontStyle.helveticaBold,
  },
  actiontext: {
    fontSize: 16,
    ...fontStyle.helvetica,
  },
  subtitle: {
    fontSize: 14,
    ...fontStyle.helvetica,
  },
})

const reportPost = postId => {
  return request({
    method: 'post',
    url: '/reports',
    data: {
      comment: 'Post is inappropriate',
      target_id: postId,
      type: 'post',
    },
  })
}

const PostMoreModal = ({ navigation, route }) => {
  let timer = null

  const dispatch = useDispatch()
  const { postId } = route.params || {}
  const [showsheet, setShowSheet] = useState(true)
  const [showPopUp, setShowPopUp] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const { isMyPost, post } = useSelector(state => {
    const post = state.post.data[postId] || {}
    const posUser = post?.user_id || null
    const me = state.auth.data.user?.id || 0
    const isMyPost = me === posUser

    return { isMyPost, post }
  })

  const animated = useMemo(() => {
    return {
      modal: new Animated.Value(0),
      sheet: new Animated.Value(0),
      pop: new Animated.Value(0),
    }
  }, [])

  useEffect(() => {
    const sheet = timing(animated.sheet, {
      duration: 300,
      toValue: showsheet ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    })
    sheet.start()
  }, [showsheet])

  useEffect(() => {
    const sheet = timing(animated.pop, {
      duration: 300,
      toValue: showPopUp ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    })
    sheet.start()
  }, [showPopUp])

  const changeModalFade = useCallback(to => {
    const modalRunner = timing(animated.modal, {
      duration: 300,
      toValue: to,
      easing: Easing.inOut(Easing.ease),
    })
    modalRunner.start()
  }, [])

  useEffect(() => {
    changeModalFade(1)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  const changeSheet = useCallback(() => {
    setShowSheet(val => {
      return !val
    })
  }, [])

  const closeToast = useCallback(() => {
    setShowToast(() => {
      return false
    })

    closeModal()
  }, [])

  const openToast = useCallback(() => {
    setShowToast(() => {
      return true
    })
    changeModalFade(0)
    timer = setTimeout(() => {
      closeToast()
    }, 3000)
  }, [])

  const closeModal = useCallback(() => {
    navigation.goBack()
  }, [])

  const handleReportPost = useCallback(() => {
    reportPost(postId)
    setShowPopUp(() => {
      return false
    })
    openToast()
  }, [postId])

  const handleArchive = useCallback(() => {
    dispatch(archivePost(postId))
    closeModal()
  }, [postId])

  const handleEdit = useCallback(() => {
    navigation.navigate('Screens', {
      screen: 'PostEdit',
      params: { postId },
    })
  }, [postId])

  const changePop = useCallback(() => {
    setShowPopUp(val => {
      return !val
    })
    setShowSheet(val => {
      return !val
    })
  }, [])

  const drawAction = useMemo(() => {
    return isMyPost
      ? [
          { title: 'Edit', icon: 'pencil', onPress: handleEdit },
          { title: 'Archive', icon: 'archive', onPress: handleArchive },
        ]
      : [{ title: 'Report this Post', icon: 'flag', onPress: changePop }]
  }, [])

  const modalOpacity = interpolate(animated.modal, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const positionSheet = interpolate(animated.sheet, {
    inputRange: [0, 1],
    outputRange: [-200, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  const popUpOpacity = interpolate(animated.pop, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          backgroundColor: 'white',
          bottom: positionSheet,
          width: '100%',
          padding: 16,
          paddingBottom: 24,
        }}>
        {drawAction?.map((data, idx) => {
          return (
            <TouchableOpacity
              key={'' + idx}
              onPress={data.onPress}
              style={{
                marginHorizontal: 8,
                flexDirection: 'row',
                marginVertical: 8,
              }}>
              <FontAwesome name={data.icon} size={20} />
              <Text style={[styles.actiontext, { marginLeft: 16 }]}>
                {data.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
      {showPopUp && (
        <Animated.View
          style={{
            zIndex: 2,
            width: '80%',
            opacity: popUpOpacity,
          }}>
          <ConfirmationBox
            title="Report this post for being inappropriate"
            subtitle="Are you sure to report ?"
            actions={[
              {
                title: 'Report',
                background: colors.black100,
                fontColor: colors.white,
                onPress: handleReportPost,
              },
              {
                title: 'Cancel',
                background: colors.white,
                fontColor: colors.black100,
                onPress: closeModal,
              },
            ]}
          />
        </Animated.View>
      )}
      <Toast
        message="Thank you for making The Shonet a better place for everyone. We have successfully received your report."
        toastPos={200}
        isOpen={showToast}
        closeToast={closeToast}
      />
      <TouchableWithoutFeedback
        onPress={closeModal}
        style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.4)', opacity: modalOpacity },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default PostMoreModal
