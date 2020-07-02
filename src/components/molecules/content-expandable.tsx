import React, { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import Animated, { Easing, cos } from 'react-native-reanimated'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '@utils/constants'
import { capitalEachWord } from '@utils/helpers'
import { ViewStyle } from 'react-native'

const { Value, timing, interpolate, concat } = Animated

interface ContentExpandableType {
  id: string
  title: any
  rightTitle?: any
  content?: any
  isDisabledBorder?: boolean
  style?: ViewStyle
  divider?: any
  paddingTitleVertical?: number
  paddingTitleHorizontal?: number
}

class ContentExpandable extends React.Component<ContentExpandableType, any> {
  state = {
    isOpen: false,
  }

  iconAnimatedValue = new Value(0)
  componentDidMount() {
    this.toggleView(this.state.isOpen)
  }
  onExpandChange = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.toggleView(this.state.isOpen)
    })
  }

  toggleView = isOpen => {
    const iconAnimation = timing(this.iconAnimatedValue, {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      easing: Easing.inOut(Easing.ease),
    })
    iconAnimation.start()
  }

  render() {
    const {
      id,
      title,
      rightTitle,
      content,
      isDisabledBorder,
      style,
      divider,
      paddingTitleVertical,
      paddingTitleHorizontal,
    } = this.props
    const rotation = interpolate(this.iconAnimatedValue, {
      inputRange: [0, 1],
      outputRange: [0, 180],
    })
    // const height = interpolate(this.iconAnimatedValue, {
    //   inputRange: [0, 1],
    //   outputRange: [0, 248],
    // })
    const opacity = interpolate(this.iconAnimatedValue, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    const display = !this.state.isOpen ? 'flex' : 'none'
    const transform: any = [{ rotate: concat(rotation, 'deg') }]

    return (
      <View
        style={{
          width: '100%',
          borderColor: isDisabledBorder ? 'transparent' : colors.black50,
          borderBottomWidth: isDisabledBorder ? 0 : 1,
          ...style,
        }}>
        <TouchableWithoutFeedback onPress={this.onExpandChange}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingVertical: paddingTitleVertical || 32,
              paddingHorizontal: paddingTitleHorizontal || 0,
              justifyContent: 'space-between',
            }}>
            {/* left */}
            {typeof title === 'string' ? (
              <Font type="heading" size="18px">
                {capitalEachWord(title.replace('-', ' '))}
              </Font>
            ) : (
              title
            )}
            {/* right  */}
            <Div flexDirection="row">
              {rightTitle && rightTitle}
              <PressAbbleDiv onPress={this.onExpandChange} id={`${id}-button`}>
                <Animated.View style={{ transform }}>
                  <Icon name="chevron-down" size={16} />
                </Animated.View>
              </PressAbbleDiv>
            </Div>
          </View>
        </TouchableWithoutFeedback>
        {!this.state.isOpen && divider}
        <Animated.View
          style={{
            width: '100%',
            opacity,
            display,
            overflow: 'scroll',
            paddingBottom: 16,
          }}>
          {typeof content === 'string' ? (
            <HTML
              html={content.replace(/\\\\r\\\\n/g, '').replace(/\\r\\n/g, '')}
            />
          ) : (
            content
          )}
        </Animated.View>
      </View>
    )
  }
}

export default ContentExpandable
