import React, { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import Animated, { Easing } from 'react-native-reanimated'
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
  isFirst?: boolean
  style?: ViewStyle
  divider?: any
  paddingTitleVertical?: number
  paddingTitleHorizontal?: number
}

const getborderStyle = isFirst => {
  const style: any = {
    borderColor: colors.black50,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  }
  if (isFirst) {
    style.borderTopWidth = 1
  }
  return style
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
      isFirst,
      style,
      divider,
      paddingTitleVertical,
      paddingTitleHorizontal,
    } = this.props
    const rotation = interpolate(this.iconAnimatedValue, {
      inputRange: [0, 1],
      outputRange: [0, 180],
    })
    const height = interpolate(this.iconAnimatedValue, {
      inputRange: [0, 1],
      outputRange: [0, 248],
    })
    const transform: any = [{ rotate: concat(rotation, 'deg') }]

    return (
      <View
        style={{
          width: '100%',
          ...(style || getborderStyle(isFirst)),
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
        <Animated.ScrollView
          style={{ width: '100%', height: height, overflow: 'scroll' }}>
          {typeof content === 'string' ? (
            <HTML
              html={content.replace(/\\\\r\\\\n/g, '').replace(/\\r\\n/g, '')}
            />
          ) : (
            content
          )}
        </Animated.ScrollView>
      </View>
    )
  }
}

export default ContentExpandable
