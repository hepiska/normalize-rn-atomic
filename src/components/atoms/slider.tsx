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
import { Div, Font } from '@components/atoms/basic'
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
    alignSelf: 'flex-start',
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
  onMove({
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
  _x = new Value(0)
  _boundary = {
    x: 0,
    width: 0,
  }
  _lastPartisionPos = 0
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.props.changeParentScroll(false)
      // this._x.setValue(this._lastpost)
    },
    onPanResponderMove: (evt, gestureState) => {
      const delta = this._boundary.width / this.props.numberOfPartisions
      const newgesture = { ...gestureState }
      const limitRight = this._boundary.x + this._boundary.width - pinWidth
      if (newgesture.moveX <= limitRight) {
        this._x.setValue(newgesture.moveX)
        if (newgesture.moveX > delta * this._lastPartisionPos - 10) {
          this._lastPartisionPos += 1
          this.props.onMove({
            value: this._lastPartisionPos / this.props.numberOfPartisions,
            position: this._lastPartisionPos,
            partision: this.props.numberOfPartisions,
          })
        } else if (newgesture.moveX < delta * this._lastPartisionPos + 10) {
          this._lastPartisionPos -= 1
          this.props.onMove({
            value: this._lastPartisionPos / this.props.numberOfPartisions,
            position: this._lastPartisionPos,
            partision: this.props.numberOfPartisions,
          })
        }
      }
    },
    onPanResponderRelease: () => {
      this.props.changeParentScroll(true)
    },
    onPanResponderTerminationRequest: () => true,
  })
  _onLayout = event => {
    this._boundary = event.nativeEvent.layout
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
            {...this._panResponder.panHandlers}
            style={[styles.pin, { transform: [{ translateX: this._x }] }]}>
            <Div _width="4px" _height="12px" style={styles.innerPin} />
          </Animated.View>
        </Div>
      </Div>
    )
  }
}

export default Slider
