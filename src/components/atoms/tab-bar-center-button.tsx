import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  // TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated, { Easing, cos } from 'react-native-reanimated'
import { Div, PressAbbleDiv } from '@components/atoms/basic'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'
import Modal from 'react-native-modal'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'

const { Value, timing, interpolate, concat } = Animated
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  actionContainer: {
    position: 'absolute',
    top: 48,
    width: 165,
    height: 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black50,
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 3,
  },
  itemContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttontext: {
    fontSize: 12,
    marginTop: 8,
    color: colors.black80,
    ...fontStyle.helvetica,
  },
})

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const animatedButtonVal = useMemo(() => new Value(0), [])

  const changeButtonPos = () => {
    setIsOpen(!isOpen)
    const iconAnimation = timing(animatedButtonVal, {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      easing: Easing.inOut(Easing.ease),
    })
    iconAnimation.start()
  }

  const handleActionPress = action => () => {
    if (action === 'jurnal') {
      navigate('Screens', { screen: 'CreateJurnal' })
    } else {
      navigate('Screens', { screen: 'CreateCollection' })
    }
    changeButtonPos()
  }

  const buttonPos = interpolate(animatedButtonVal, {
    inputRange: [0, 1],
    outputRange: [0, -(96 + 48)],
  })
  const opacity = interpolate(animatedButtonVal, {
    inputRange: [0.7, 1],
    outputRange: [0.4, 1],
  })

  // const screenPosition = interpolate(animatedButtonVal, {
  //   inputRange: [0.7, 1],
  //   outputRange: [0, -height],
  // })

  const buttonRotation = interpolate(animatedButtonVal, {
    inputRange: [0, 1],
    outputRange: [0, 45],
  })

  return (
    <>
      {/* <Animated.View
        style={{
          height,
          opacity: 0,
          zIndex: 2,
          width,
          position: 'absolute',
          top: 40,
          backgroundColor: 'rgba(0,0,0, 0.3)',
          transform: [{ translateY: screenPosition }],
        }}>
        <TouchableWithoutFeedback style={StyleSheet.absoluteFill}>
          <View />
        </TouchableWithoutFeedback>
      </Animated.View> */}
      <Animated.View
        style={[
          styles.actionContainer,
          {
            opacity: opacity,
            transform: [{ translateY: buttonPos }],
          },
        ]}>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={handleActionPress('jurnal')}>
            <Image
              source={require('@assets/icons/jurnal.png')}
              style={{ width: 24, height: 16 }}
            />
            <Text style={styles.buttontext}>Jurnal+ </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 1, backgroundColor: colors.black50 }} />
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={handleActionPress('collection')}
            style={styles.itemContainer}>
            <Image
              source={require('@assets/icons/tag.png')}
              style={{ width: 25, height: 20 }}
            />
            <Text style={styles.buttontext}>Collection </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Div _position="absolute" align="center" style={{ top: -16, zIndex: 3 }}>
        <PressAbbleDiv
          _width="32px"
          _height="32px"
          bg="white"
          onPress={changeButtonPos}
          radius="16px"
          style={{ top: 0 }}>
          <Animated.View
            style={{ transform: [{ rotate: concat(buttonRotation, 'deg') }] }}>
            <Icon name="plus-circle" size={32} color={colors.black100} />
          </Animated.View>
        </PressAbbleDiv>
      </Div>
    </>
  )
}

export default AddButton
