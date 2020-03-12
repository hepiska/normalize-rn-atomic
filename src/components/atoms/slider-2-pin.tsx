import React, {
  useState,
  useEffect,
  ReactType,
  ReactElement,
  Component,
} from 'react'
import {
  Image,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Animated,
  PanResponder,
  TextInput,
} from 'react-native'
// import Animated from 'react-native-reanimated'
import { Div } from '@components/atoms/basic'
import { colors } from '@utils/constants'

const { Value } = Animated
const pinWidth = 24

const styles = StyleSheet.create({
  pin: {
    width: pinWidth,
    zIndex: 3,
    borderRadius: pinWidth / 2,
    height: pinWidth,
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.black90,
  },
  innerPin: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.black90,
  },
})

interface SliderPropsType {
  changeParentScroll(value: boolean): void
  numberOfPartisions: number
  onMoveLeft({
    value,
    position,
    partision,
  }: {
    value: number
    position: number
    partision: number
  }): void
  onMoveRight({
    value,
    position,
    partision,
  }: {
    value: number
    position: number
    partision: number
  }): void
}

class Slider extends React.Component<SliderPropsType, any> {
  _xLeft = new Value(0)
  _xRight = new Value(0)
  _leftPos = 0
  _boundary = {
    x: 0,
    width: 0,
  }
  _rightPos = 300

  _lastPartision1Pos = 0
  _lastPartision2Pos = this.props.numberOfPartisions

  _timer: any = null
  componentDidMount() {
    this._timer = setInterval(() => {
      this._rightPos = this._boundary.width
    }, 200)
  }

  componentWillUnmount() {
    clearTimeout(this._timer)
  }

  _panResponderPin2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.props.changeParentScroll(false)
    },
    onPanResponderMove: (evt, gestureState) => {
      const newgesture = { ...gestureState }
      const limitRight = this._boundary.x + this._boundary.width - pinWidth
      const delta = this._boundary.width / this.props.numberOfPartisions

      this._rightPos = newgesture.moveX

      if (newgesture.moveX <= limitRight && this._rightPos > this._leftPos) {
        this._xRight.setValue(newgesture.moveX)
        if (newgesture.moveX > delta * this._lastPartision2Pos - pinWidth + 1) {
          this._lastPartision2Pos += 1
        } else if (
          this._boundary.width - newgesture.moveX >
          this._boundary.width - delta * this._lastPartision2Pos
        ) {
          this._lastPartision2Pos -= 1
        }
      }
    },
    onPanResponderRelease: () => {
      this.props.onMoveRight({
        value: this._lastPartision2Pos / this.props.numberOfPartisions,
        position: this._lastPartision2Pos,
        partision: this.props.numberOfPartisions,
      })

      this.props.changeParentScroll(true)
    },
    onPanResponderTerminationRequest: () => true,
  })
  _panResponderPin1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.props.changeParentScroll(false)
      // this._x.setValue(this._lastpost)
    },
    onPanResponderMove: (evt, gestureState) => {
      const newgesture = { ...gestureState }
      this._leftPos = newgesture.moveX
      const delta = this._boundary.width / this.props.numberOfPartisions

      const limitRight = this._boundary.x + this._boundary.width - pinWidth
      if (newgesture.moveX <= limitRight && this._rightPos > this._leftPos) {
        this._xLeft.setValue(newgesture.moveX)
        if (newgesture.moveX > delta * this._lastPartision1Pos - 20) {
          this._lastPartision1Pos += 1
        } else if (newgesture.moveX < delta * this._lastPartision1Pos + 20) {
          this._lastPartision1Pos -= 1
        }
      }
    },
    onPanResponderRelease: () => {
      this.props.onMoveLeft({
        value: this._lastPartision1Pos / this.props.numberOfPartisions,
        position: this._lastPartision1Pos,
        partision: this.props.numberOfPartisions,
      })
      this.props.changeParentScroll(true)
    },
    onPanResponderTerminationRequest: () => true,
  })
  _onLayout = event => {
    this._boundary = event.nativeEvent.layout
    const rightInitialPos = this._boundary.width - 24
    this._xRight.setValue(rightInitialPos)
  }
  render() {
    return (
      <Div _width="100%" padd="4px 0px" _height="60">
        <Div
          _width="100%"
          overflow="visible"
          _padd="0px 8px"
          onLayout={this._onLayout}>
          <Div
            _width="98%"
            _height="4px"
            _background="black"
            overflow="visible"
          />
          <Animated.View
            {...this._panResponderPin1.panHandlers}
            style={[
              styles.pin,
              {
                transform: [{ translateX: this._xLeft }],
                alignSelf: 'flex-start',
              },
            ]}>
            <Div _width="4px" _height="12px" style={styles.innerPin} />
          </Animated.View>
          <Animated.View
            {...this._panResponderPin2.panHandlers}
            style={[
              styles.pin,
              {
                transform: [{ translateX: this._xRight }],
                alignSelf: 'flex-start',
              },
            ]}>
            <Div _width="4px" _height="12px" style={styles.innerPin} />
          </Animated.View>
        </Div>
      </Div>
    )
  }
}

export default Slider
