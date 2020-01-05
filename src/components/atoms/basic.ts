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
  border-radius: ${({ radius, borderRadius }) => borderRadius || radius || '0px'};
  margin: ${({ mar, _margin }) => mar || _margin || '0px'};
  resize-mode: ${({ resizeMode }) => resizeMode || 'cover'};
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