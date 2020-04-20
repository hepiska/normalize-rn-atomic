import styled from 'styled-components/native'
import { colors, shadows } from '@utils/constants'

export const Div = styled.View`
  /* width:${({ _width }) => _width || 'null'}; */
  /* padding:${({ padd, _padding }) => padd || _padding || '0px'}; */
  ${({ padd, _padding }) =>
    _padding ? `padding:${_padding};` : padd ? `padding:${padd};` : ''}
  ${({ _margin, mar }) =>
    _margin ? `margin:${_margin};` : mar ? `margin:${mar};` : ''}
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  overflow: ${({ overflow }) => overflow || 'hidden'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => (flx || _flex ? `flex:${flx || _flex};` : '')}
  ${({ brdr, _border }) =>
    brdr || _border ? `border:${brdr || _border};` : ''}
  ${({ _height }) => (_height ? `height:${_height};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight};` : '')}
  ${({ _width, wdth }) =>
    _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  ${({ radius, borderRadius }) =>
    radius
      ? `border-radius:${radius};`
      : borderRadius
      ? `border-radius:${borderRadius};`
      : ''}
  flex-direction: ${({ flexDirection, _direction }) =>
    flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) =>
    justifyContent || justify || 'center'};
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
  border-radius: ${({ radius, borderRadius, _borderRadius }) =>
    _borderRadius || borderRadius || radius || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  resize-mode: ${({ _resizeMode, resizeMode }) =>
    _resizeMode || resizeMode || 'cover'};
  padding: ${({ padd, _padding }) => padd || _padding || '0px'};
  ${({ _width, wdth }) =>
    _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  ${({ _height, hght }) =>
    _height ? `height:${_height};` : hght ? `height:${hght};` : ''}
`

export const PressAbbleDiv = styled.TouchableOpacity`
    ${({ padd, _padding }) =>
      _padding ? `padding:${_padding};` : padd ? `padding:${padd};` : ''}
  ${({ _margin, mar }) =>
    _margin ? `margin:${_margin};` : mar ? `margin:${mar};` : ''}
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => (flx ? `flex:${flx || _flex};` : '')}
  ${({ brdr, _border }) => (brdr ? `border:${brdr || _border};` : '')}
  ${({ _height }) => (_height ? `height:${_height};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight};` : '')}
  ${({ _width, wdth }) =>
    _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  border-radius: ${({ radius, borderRadius }) =>
    borderRadius || radius || '0px'};
  flex-direction: ${({ flexDirection, _direction }) =>
    flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) =>
    justifyContent || justify || 'center'};
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

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  padding:${({ padd, _padding }) => padd || _padding || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  display: ${({ disp, _display }) => disp || _display || 'flex'};
  position: ${({ pos, _position }) => pos || _position || 'relative'};
  ${({ flx, _flex }) => (flx ? `flex:${flx || _flex};` : '')}
  ${({ brdr, _border }) => (brdr ? `border:${brdr || _border};` : '')}
  ${({ _height }) => (_height ? `height:${_height};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight};` : '')}
  ${({ _width, wdth }) =>
    _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  z-index: ${({ zIndex }) => zIndex || '0'};
  border-radius: ${({ radius, borderRadius }) =>
    borderRadius || radius || '0px'};
  flex-direction: ${({ flexDirection, _direction }) =>
    flexDirection || _direction || 'column'};
  align-items: ${({ align, alignItems }) => alignItems || align || 'center'};
  justify-content: ${({ justify, justifyContent }) =>
    justifyContent || justify || 'center'};
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
  ${({ brdr, _border }) => (brdr ? `border:${brdr || _border};` : '')}
  ${({ _height }) => (_height ? `height:${_height};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight};` : '')}
  ${({ _width, wdth }) =>
    _width ? `width:${_width};` : wdth ? `width:${wdth};` : ''}
  z-index: ${({ zIndex }) => zIndex || '0'};
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

export const FlatList = styled.FlatList``

const fontTypeRegex = {
  regular: /Regular|regular/,
  light: /Light|light/,
  demi: /Demi|demi/,
  book: /Book|book/,
  bold: /Bold|bold/,
  thin: /Thin|thin/,
}

export const Font = styled.Text`
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  padding: ${({ padd, _padding }) => padd || _padding || '0px'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0px'};
  ${({ lineHeight, _lineHeight }) =>
    `line-height:${_lineHeight}` || `line-height:${lineHeight}`};
  font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    }
    if (sizeType === 'title' || sizeType === 'h1') {
      return '16px'
    }
    if (sizeType === 'h2' || sizeType === 'body') {
      return '14px'
    }
    return '12px'
  }};
  ${({ type, weight, fontFamily }) => {
    if (fontFamily) {
      return `font-family:${fontFamily}`
    }
    switch (type) {
      case 'HelveticaNeue':
        if (weight) {
          return `font-family: HelveticaNeue-${weight}`
        }
        return `font-family: HelveticaNeue`
      case 'Futura':
        if (weight) {
          return `font-family: Futura-${weight}`
        }
        return `font-family: Futura`
      case 'text':
        return `font-family: HelveticaNeue`
      case 'meta':
        return `font-family: HelveticaNeue-Thin`
      case 'title':
        return `font-family: HelveticaNeue-Bold`
      case 'titleRegular':
        return `font-family: HelveticaNeue`
      case 'heading':
        return `font-family: FuturaDemi`
      default:
        return 'font-family: HelveticaNeue'
    }
  }};
  color: ${({ color }) => color || colors.font2};
  text-align: ${({ textAlign }) => textAlign || 'left'};
`
