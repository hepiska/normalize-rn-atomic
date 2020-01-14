import styled from 'styled-components/native'
import { colors, shadows } from '@utils/constants'

export const Div = styled.View`
  /* width:${(({ _width }) => _width || 'null')}; */
  padding:${({ padd, _padding }) => padd || _padding || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => flx || _flex ? `flex:${flx || _flex};` : ''}
  ${({ brdr, _border }) => brdr ? `border:${brdr || _border};` : ''}
  ${({ _height }) => _height ? `height:${_height};` : ''}
  ${({ maxHeight }) => maxHeight ? `max-height:${maxHeight};` : ''}
  ${({ _width, wdth }) => _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  border-radius: ${({ radius, borderRadius }) => borderRadius || radius || '0px'};
  flex-direction: ${({ flexDirection, _direction }) => flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) => justifyContent || justify || 'center'};
  background: ${({ bg, _background }) => bg || _background || 'transparent'};
  ${({ shadow }) => {
    switch (shadow) {
      case 'idle':
        return shadows.idle
      case 'focus':
        return shadows.focused
      default:
        return ''
    }
  }}
`


export const Image = styled.Image`
  border-radius: ${({ radius, borderRadius, _borderRadius }) => _borderRadius || borderRadius || radius || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  resize-mode: ${({ _resizeMode, resizeMode }) => _resizeMode || resizeMode || 'cover'};
  padding: ${({ padd, _padding }) => padd || _padding || '0px'};
  ${({ _width, wdth }) => _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  ${({ _height, hght }) => _height ? `height:${_height};` : hght ? `height:${hght};` : ''}
`

export const PressAbbleDiv = styled.TouchableOpacity`
  padding:${({ padd, _padding }) => padd || _padding || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => flx ? `flex:${flx || _flex};` : ''}
  ${({ brdr, _border }) => brdr ? `border:${brdr || _border};` : ''}
  ${({ _height }) => _height ? `height:${_height};` : ''}
  ${({ maxHeight }) => maxHeight ? `max-height:${maxHeight};` : ''}
  ${({ _width, wdth }) => _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  border-radius: ${({ radius, borderRadius }) => borderRadius || radius || '0px'};
  flex-direction: ${({ flexDirection, _direction }) => flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) => justifyContent || justify || 'center'};
  background: ${({ bg, _background }) => bg || _background || 'transparent'};
  ${({ shadow }) => {
    switch (shadow) {
      case 'idle':
        return shadows.idle
      case 'focus':
        return shadows.focused
      default:
        return ''
    }
  }}
`


export const ScrollDiv = styled.ScrollView`
  padding:${({ padd, _padding }) => padd || _padding || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => flx ? `flex:${flx || _flex};` : ''}
  ${({ brdr, _border }) => brdr ? `border:${brdr || _border};` : ''}
  ${({ _height }) => _height ? `height:${_height};` : ''}
  ${({ maxHeight }) => maxHeight ? `max-height:${maxHeight};` : ''}
  ${({ _width, wdth }) => _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  border-radius: ${({ radius }) => radius || '8px'};
  flex-direction: ${({ flexDirection, _direction }) => flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) => justifyContent || justify || 'center'};
  background: ${({ bg, _background }) => bg || _background || 'transparent'};
  ${({ shadow }) => {
    switch (shadow) {
      case 'idle':
        return shadows.idle
      case 'focus':
        return shadows.focused
      default:
        return ''
    }
  }}
`

export const FlatList = styled.FlatList`

`

export const Text = styled.Text`
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  padding: ${({ padd, _padding }) => padd || _padding || '0px'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0px'};
  line-height:  ${({ lineHeight, _lineHeight }) => _lineHeight || lineHeight || '0px'};
  font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '16px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '14px'
    } else {
      return '13px'
    }
  }};
  color: ${({ color }) => color || colors.primaryText};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  `