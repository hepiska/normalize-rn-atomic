import React, { useState } from 'react'
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import Animated, { Easing } from 'react-native-reanimated'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '@utils/constants'

const { Value, timing, interpolate, concat } = Animated

interface ContentExpandable {
  id: string
  title: string
  content?: string
  isFirst?: boolean
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

const iconAnimatedValue = new Value(0)

const toggleView = isOpen => {
  const iconAnimation = timing(iconAnimatedValue, {
    duration: 300,
    toValue: isOpen ? 0 : 1,
    easing: Easing.inOut(Easing.ease),
  })
  iconAnimation.start()
}

const expandableState = () => {
  const [isOpen, setIsopen] = useState(false)
  const onExpandChange = async () => {
    setIsopen(!isOpen)
    toggleView(isOpen)
  }
  return [{ isOpen }, { onExpandChange }]
}

const ContentExpandable: React.SFC<ContentExpandable> = ({
  id,
  title,
  content,
  isFirst,
}) => {
  const [_, { onExpandChange }] = expandableState()
  const rotation = interpolate(iconAnimatedValue, {
    inputRange: [0, 1],
    outputRange: [0, 180],
  })
  const height = interpolate(iconAnimatedValue, {
    inputRange: [0, 1],
    outputRange: [0, 248],
  })

  const transform: any = [{ rotate: concat(rotation, 'deg') }]

  return (
    <Div _width="100%" style={getborderStyle(isFirst)}>
      <Div
        _direction="row"
        _width="100%"
        justify="space-between"
        padd="32px 0px">
        <Font type="Futura" weight="bold" size="18px">
          {title}
        </Font>
        <PressAbbleDiv onPress={onExpandChange} id={`${id}-button`}>
          <Animated.View style={{ transform }}>
            <Icon name="chevron-down" size={16} />
          </Animated.View>
        </PressAbbleDiv>
      </Div>
      <Animated.ScrollView
        style={{ width: '100%', height: height, overflow: 'scroll' }}>
        <HTML html={content} />
      </Animated.ScrollView>
    </Div>
  )
}

export default ContentExpandable
