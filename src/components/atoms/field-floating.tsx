import React from 'react'
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  StyleProp,
  I18nManager,
  Platform,
  TextStyle,
  Animated,
  LayoutChangeEvent,
  Text,
} from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import { Font } from './basic'

// CONSTANTS
const MAXIMIZED_LABEL_FONT_SIZE = 16
const MINIMIZED_LABEL_FONT_SIZE = 12
const LABEL_WIGGLE_X_OFFSET = 4
const LABEL_PADDING_HORIZONTAL = 12

const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -6
const LABEL_PADDING_TOP = 8
const MIN_HEIGHT = 64
const MIN_DENSE_HEIGHT = 48
const INPUT_PADDING_HORIZONTAL = 14

const BLUR_ANIMATION_DURATION = 180
const FOCUS_ANIMATION_DURATION = 150

// TYPE
type TextInputProps = React.ComponentPropsWithRef<typeof NativeTextInput> & {
  disabled?: boolean
  label?: string
  rightIcon?: any
  placeholder?: string
  error?: boolean
  onChangeText?: Function
  selectionColor?: string
  underlineColor?: string
  dense?: boolean
  desc?: string
  multiline?: boolean
  numberOfLines?: number
  onFocus?: (args: any) => void
  onBlur?: (args: any) => void
  render?: (props: RenderProps) => React.ReactNode
  value?: string
  style?: any
  theme: any
}

type State = {
  labeled: Animated.Value
  error: Animated.Value
  focused: boolean
  placeholder: string | null | undefined
  value: string | null | undefined
  labelLayout: { measured: boolean; width: number; height: number }
}

type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type TextInputTypesWithoutMode = $Omit<TextInputProps, 'mode'>

type ChildTextInputProps = {
  parentState: State
  innerRef: (ref: NativeTextInput | null | undefined) => void
  onFocus?: (args: any) => void
  onBlur?: (args: any) => void
  onChangeText?: (value: string) => void
  onLayoutAnimatedText: (args: any) => void
} & TextInputTypesWithoutMode

type RenderProps = {
  ref: (a: NativeTextInput | null | undefined) => void
  onChangeText?: (a: string) => void
  placeholder?: string
  placeholderTextColor?: string
  editable?: boolean
  selectionColor?: string
  onFocus?: (args: any) => void
  onBlur?: (args: any) => void
  underlineColorAndroid?: string
  style: any
  multiline?: boolean
  numberOfLines?: number
  value?: string
  adjustsFontSizeToFit?: boolean
}

type PaddingProps = {
  height: number | null
  labelHalfHeight: number
  multiline: boolean | null
  dense: boolean | null
  topPosition: number
  fontSize: number
  label?: string | null
  scale: number
  offset: number
  isAndroid: boolean
  styles: { paddingTop: number; paddingBottom: number }
}

type AdjProps = PaddingProps & {
  pad: number
}

type Padding = { paddingTop: number; paddingBottom: number }

type OutlineType = {
  activeColor: string
  hasActiveOutline: boolean | undefined
  outlineColor: string | undefined
  backgroundColor: string | undefined
  theme: any
}

type LabelProps = {
  placeholderStyle: any
  placeholderOpacity: number | Animated.Value | Animated.AnimatedInterpolation
  baseLabelTranslateX: number
  baseLabelTranslateY: number
  wiggleOffsetX: number
  labelScale: number
  fontSize: number
  fontWeight: TextStyle['fontWeight']
  font: any
  topPosition: number
  paddingOffset?: { paddingHorizontal: number } | null | undefined
  placeholderColor: string | null | undefined
  backgroundColor?: string | null | undefined
  label?: string | null | undefined
  hasActiveOutline: boolean | null | undefined
  activeColor: string
  errorColor?: string
  error: boolean | null | undefined
  onLayoutAnimatedText: (args: any) => void
}

type InputLabelProps = {
  parentState: State
  labelProps: LabelProps
  labelBackground?: any
}

type LabelBackgroundProps = {
  labelProps: LabelProps
  labelStyle: any
  parentState: State
}

type AnimatedTextProps = React.ComponentProps<typeof Animated.Text> & {
  style?: StyleProp<TextStyle>
  theme: any
}

// HELPERS

const calculateInputHeight = (
  labelHeight: number,
  height: any = 0,
  minHeight: number,
): number => {
  const finalHeight = height > 0 ? height : labelHeight

  if (height > 0) return height
  return finalHeight < minHeight ? minHeight : finalHeight
}

const calculateLabelTopPosition = (
  labelHeight: number,
  height: number = 0,
  optionalPadding: number = 0,
): number => {
  const customHeight = height > 0 ? height : 0

  return Math.floor((customHeight - labelHeight) / 2 + optionalPadding)
}

const calculateTextAreaPadding = (props: PaddingProps) => {
  const { dense } = props

  return dense ? 10 : 20
}

const calculateInputPadding = ({
  topPosition,
  fontSize,
  multiline,
  scale,
  dense,
  offset,
  isAndroid,
}: PaddingProps): number => {
  const refFontSize = scale * fontSize
  let result = Math.floor(topPosition / 2)

  result =
    result +
    Math.floor((refFontSize - fontSize) / 2) -
    (scale < 1 ? offset / 2 : 0)

  if (multiline && isAndroid)
    result = Math.min(dense ? offset / 2 : offset, result)

  return result
}

const calculatePadding = (props: PaddingProps): number => {
  const { height, multiline = false } = props

  let result = 0

  if (multiline) {
    if (height && multiline) {
      result = calculateTextAreaPadding(props)
    } else {
      result = calculateInputPadding(props)
    }
  }

  return Math.max(0, result)
}

const adjustPaddingOut = ({
  pad,
  multiline,
  label,
  scale,
  height,
  fontSize,
  dense,
  offset,
  isAndroid,
}: AdjProps): Padding => {
  const refFontSize = scale * fontSize
  let result = pad

  if (height) {
    return {
      paddingTop: Math.max(0, (height - (fontSize + 6)) / 2),
      paddingBottom: Math.max(0, (height - (fontSize + 6)) / 2),
    }
  }
  if (!isAndroid && multiline) {
    if (dense) {
      if (label) {
        result += scale < 1 ? Math.min(offset, (refFontSize / 2) * scale) : 0
      } else {
        result += 0
      }
    }
    if (!dense) {
      if (label) {
        result +=
          scale < 1
            ? Math.min(offset, refFontSize * scale)
            : Math.min(offset / 2, refFontSize * scale)
      } else {
        result += scale < 1 ? Math.min(offset / 2, refFontSize * scale) : 0
      }
    }
    result = Math.floor(result)
  }
  return { paddingTop: result, paddingBottom: result }
}

const interpolatePlaceholder = (
  labeled: Animated.Value,
  hasActiveOutline: boolean | undefined,
) =>
  labeled.interpolate({
    inputRange: [0, 1],
    outputRange: [hasActiveOutline ? 0 : 1, 1],
  })

// STYLES
const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0,
  },
  input: {
    flexGrow: 1,
    fontFamily: 'HelveticaNeue',
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    margin: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    zIndex: 1,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  rightIconInput: {
    position: 'absolute',
    top: 6,
    right: 16,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    zIndex: 2,
  },
  view: {
    position: 'absolute',
    top: 6,
    left: 10,
    width: 8,
    height: 2,
  },
  outlinedLabel: {
    position: 'absolute',
    left: 18,
    paddingHorizontal: 0,
    color: 'transparent',
  },
})

// COMPONENTS

const InputLabel = (props: InputLabelProps) => {
  const { parentState, labelBackground } = props

  const {
    label,
    error,
    onLayoutAnimatedText,
    hasActiveOutline,
    activeColor,
    placeholderStyle,
    baseLabelTranslateX,
    baseLabelTranslateY,
    font,
    fontSize,
    fontWeight,
    placeholderOpacity,
    wiggleOffsetX,
    labelScale,
    topPosition,
    paddingOffset,
    placeholderColor,
    errorColor,
  } = props.labelProps

  const labelTranslationX = {
    transform: [
      {
        // Offset label scale since RN doesn't support transform origin
        translateX: parentState.labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [baseLabelTranslateX, 0],
        }),
      },
    ],
  }

  const labelStyle = {
    fontSize,
    fontWeight,
    transform: [
      {
        // Wiggle the label when there's an error
        translateX: parentState.error.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, parentState.value && error ? wiggleOffsetX : 0, 0],
        }),
      },
      {
        // Move label to top
        translateY: parentState.labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [baseLabelTranslateY, 0],
        }),
      },
      {
        // Make label smaller
        scale: parentState.labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [labelScale, 1],
        }),
      },
    ],
  }

  return label ? (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          opacity:
            // Hide the label in minimized state until we measure it's width
            parentState.value || parentState.focused
              ? parentState.labelLayout.measured
                ? 1
                : 0
              : 1,
        },
        labelTranslationX,
      ]}>
      {labelBackground?.({
        parentState,
        labelStyle,
        labelProps: props.labelProps,
      })}
      <AnimatedText
        onLayout={onLayoutAnimatedText}
        style={[
          placeholderStyle,
          {
            top: topPosition,
          },
          labelStyle,

          paddingOffset || {},
          {
            color: activeColor,
            opacity: parentState.labeled.interpolate({
              inputRange: [0, 1],
              outputRange: [hasActiveOutline ? 1 : 0, 0],
            }),
          },
        ]}
        numberOfLines={1}>
        {label}
      </AnimatedText>
      <AnimatedText
        style={[
          placeholderStyle,
          {
            top: topPosition,
          },
          labelStyle,
          paddingOffset,
          fontStyle.helvetica,
          {
            color: placeholderColor,
            opacity: placeholderOpacity,
          },
        ]}
        numberOfLines={1}>
        {label}
      </AnimatedText>
    </Animated.View>
  ) : null
}

const LabelBackground = ({
  parentState,
  labelProps: {
    placeholderStyle,
    baseLabelTranslateX,
    topPosition,
    hasActiveOutline,
    label,
    backgroundColor,
  },
  labelStyle,
}: LabelBackgroundProps) => {
  const hasFocus = hasActiveOutline || parentState.value
  const opacity = parentState.labeled.interpolate({
    inputRange: [0, 1],
    outputRange: [hasFocus ? 1 : 0, 0],
  })

  const labelTranslationX = {
    transform: [
      {
        translateX: parentState.labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [-baseLabelTranslateX, 0],
        }),
      },
    ],
  }

  return label
    ? [
        <Animated.View
          key="labelBackground-view"
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            styles.view,
            {
              backgroundColor,
              opacity,
            },
            labelTranslationX,
          ]}
        />,
        <AnimatedText
          key="labelBackground-text"
          style={[
            placeholderStyle,
            labelStyle,
            styles.outlinedLabel,
            {
              top: topPosition + 1,
              backgroundColor,
              opacity,
              transform: [
                ...labelStyle.transform,
                {
                  scaleY: parentState.labeled.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1],
                  }),
                },
              ],
            },
          ]}
          numberOfLines={1}>
          {label}
        </AnimatedText>,
      ]
    : null
}

function AnimatedText({ style, ...rest }: AnimatedTextProps) {
  return (
    <Animated.Text
      {...rest}
      style={[
        {
          color: 'black',
          textAlign: 'left',
        },
        fontStyle.helvetica,
        style,
      ]}
    />
  )
}

const Outline = ({
  theme,
  hasActiveOutline,
  activeColor,
  outlineColor,
  backgroundColor,
}: OutlineType) => (
  <View
    pointerEvents="none"
    style={[
      styles.outline,
      {
        backgroundColor,
        borderRadius: 5,
        borderWidth: hasActiveOutline ? 2 : 1,
        borderColor: hasActiveOutline ? activeColor : outlineColor,
      },
    ]}
  />
)

class TextInputOutlined extends React.Component<ChildTextInputProps, {}> {
  static defaultProps = {
    disabled: false,
    error: false,
    multiline: false,
    editable: true,
    render: (props: RenderProps) => <NativeTextInput {...props} />,
  }

  render() {
    const {
      disabled,
      editable,
      label,
      error,
      selectionColor,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      underlineColor,
      dense,
      style,
      theme,
      render,
      multiline,
      parentState,
      innerRef,
      onFocus,
      onBlur,
      desc,
      onChangeText,
      onLayoutAnimatedText,
      rightIcon,
      ...rest
    } = this.props

    const font = 'HelveticaNeue'
    const hasActiveOutline = parentState.focused || error

    const {
      fontSize: fontSizeStyle,
      fontWeight,
      height,
      backgroundColor = colors.white,
      ...viewStyle
    } = (StyleSheet.flatten(style) || {}) as TextStyle
    const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE

    let inputTextColor,
      activeColor,
      outlineColor,
      placeholderColor,
      errorColor,
      containerStyle

    if (disabled) {
      inputTextColor = activeColor = 'grey'
      placeholderColor = outlineColor = colors.black60
    } else {
      inputTextColor = colors.black100
      activeColor = error ? colors.redBookmark : colors.black100
      placeholderColor = outlineColor = colors.black60
      errorColor = colors.redBookmark
    }

    const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize
    const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize

    const labelWidth = parentState.labelLayout.width
    const labelHeight = parentState.labelLayout.height
    const labelHalfWidth = labelWidth / 2
    const labelHalfHeight = labelHeight / 2

    const baseLabelTranslateX =
      (I18nManager.isRTL ? 1 : -1) *
      (labelHalfWidth -
        (labelScale * labelWidth) / 2 -
        (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale)

    const minInputHeight =
      (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT) - LABEL_PADDING_TOP

    const inputHeight = calculateInputHeight(
      labelHeight,
      height,
      minInputHeight,
    )

    const topPosition = calculateLabelTopPosition(
      labelHeight,
      inputHeight,
      LABEL_PADDING_TOP,
    )

    if (height && typeof height !== 'number')
      // eslint-disable-next-line
      console.warn('Currently we support only numbers in height prop')

    const paddingSettings = {
      height: height ? +height : null,
      labelHalfHeight,
      offset: LABEL_PADDING_TOP,
      multiline: multiline ? multiline : null,
      dense: dense ? dense : null,
      topPosition,
      fontSize,
      label,
      scale: fontScale,
      isAndroid: Platform.OS === 'android',
      styles: StyleSheet.flatten(
        dense ? styles.inputOutlinedDense : styles.inputOutlined,
      ) as Padding,
    }

    const pad = calculatePadding(paddingSettings)

    const paddingOut = adjustPaddingOut({ ...paddingSettings, pad })

    const baseLabelTranslateY =
      -labelHalfHeight - (topPosition + OUTLINE_MINIMIZED_LABEL_Y_OFFSET)

    const placeholderOpacity = interpolatePlaceholder(
      parentState.labeled,
      hasActiveOutline,
    )

    const labelProps = {
      label,
      onLayoutAnimatedText,
      placeholderOpacity,
      error,
      placeholderStyle: styles.placeholder,
      baseLabelTranslateY,
      baseLabelTranslateX,
      font,
      fontSize,
      fontWeight,
      labelScale,
      wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
      topPosition,
      hasActiveOutline,
      activeColor,
      placeholderColor,
      backgroundColor,
      errorColor,
    }

    const minHeight = height || (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT)

    return (
      <View style={[{ width: '100%' }, containerStyle, viewStyle]}>
        <View>
          <Outline
            theme={theme}
            hasActiveOutline={hasActiveOutline}
            activeColor={!!error ? colors.redBookmark : activeColor}
            outlineColor={outlineColor}
            backgroundColor={backgroundColor}
          />
          <View
            style={{
              paddingTop: LABEL_PADDING_TOP,
              paddingBottom: 0,
              minHeight,
            }}>
            {disabled ? (
              <View
                style={{
                  minHeight,
                  justifyContent: 'center',
                  padding: 16,
                }}>
                {rest.value ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: -8,
                        left: 10,
                        paddingHorizontal: 2,
                        backgroundColor: 'white',
                      }}>
                      <Font
                        size={12}
                        style={fontStyle.helvetica}
                        color={colors.black70}
                        _margin="0px 0px 1px">
                        {label}
                      </Font>
                    </View>

                    <Font
                      size={16}
                      color={colors.black100}
                      style={fontStyle.helvetica}>
                      {rest.value}
                    </Font>
                  </>
                ) : (
                  <Text
                    style={{
                      color: colors.black60,
                      fontSize: 17,
                      ...fontStyle.helvetica,
                    }}>
                    {label}
                  </Text>
                )}
              </View>
            ) : (
              <>
                <InputLabel
                  parentState={parentState}
                  labelProps={labelProps}
                  labelBackground={LabelBackground}
                />
                {render?.({
                  ...rest,
                  ref: innerRef,
                  onChangeText,
                  placeholder: label
                    ? parentState.placeholder
                    : this.props.placeholder,
                  placeholderTextColor: placeholderColor,
                  editable: !disabled && editable,
                  selectionColor:
                    typeof selectionColor === 'undefined'
                      ? activeColor
                      : selectionColor,
                  onFocus,
                  onBlur,
                  underlineColorAndroid: 'transparent',
                  multiline,
                  style: [
                    styles.input,
                    !multiline || (multiline && height)
                      ? { height: inputHeight }
                      : {},
                    paddingOut,
                    {
                      ...fontStyle.helvetica,

                      fontSize,
                      color: inputTextColor,
                      textAlignVertical: multiline ? 'top' : 'center',
                    },
                  ],
                } as RenderProps)}
              </>
            )}

            {rightIcon && (
              <View style={styles.rightIconInput}>{rightIcon}</View>
            )}
          </View>
        </View>
        {!!error && (
          <Font
            size={10}
            color={colors.redBookmark}
            _margin="8px 4px 0px"
            style={fontStyle.helveticaBold}>
            {error}
          </Font>
        )}
        {desc && !error && (
          <Font
            size={10}
            color={colors.black60}
            _margin="8px 4px 0px"
            style={fontStyle.helvetica}>
            {desc}
          </Font>
        )}
      </View>
    )
  }
}

class TextInput extends React.Component<TextInputProps, State> {
  static defaultProps: Partial<TextInputProps> = {
    dense: false,
    disabled: false,
    error: false,
    multiline: false,
    editable: true,
    render: (props: RenderProps) => <NativeTextInput {...props} />,
  }

  static getDerivedStateFromProps(nextProps: TextInputProps, prevState: State) {
    return {
      value:
        typeof nextProps.value !== 'undefined'
          ? nextProps.value
          : prevState.value,
    }
  }

  state = {
    labeled: new Animated.Value(
      (this.props.value !== undefined
      ? this.props.value
      : this.props.defaultValue)
        ? 0
        : 1,
    ),
    error: new Animated.Value(this.props.error ? 1 : 0),
    focused: false,
    placeholder: '',
    value:
      this.props.value !== undefined
        ? this.props.value
        : this.props.defaultValue,
    labelLayout: {
      measured: false,
      width: 0,
      height: 0,
    },
  }

  ref: NativeTextInput | undefined | null

  componentDidUpdate(prevProps: TextInputProps, prevState: State) {
    if (
      prevState.focused !== this.state.focused ||
      prevState.value !== this.state.value ||
      prevState.labelLayout !== this.state.labelLayout
    ) {
      if (this.state.value || this.state.focused) {
        this.minimizeLabel()
      } else {
        this.restoreLabel()
      }
    }

    if (
      prevState.focused !== this.state.focused ||
      prevProps.label !== this.props.label
    ) {
      if (this.state.focused || !this.props.label) {
        this.showPlaceholder()
      } else {
        this.hidePlaceholder()
      }
    }

    if (prevProps.error !== this.props.error) {
      if (this.props.error) {
        this.showError()
      } else {
        this.hideError()
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  private showPlaceholder = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(
      () =>
        this.setState({
          placeholder: this.props.placeholder,
        }),
      50,
    )
  }

  private hidePlaceholder = () =>
    this.setState({
      placeholder: '',
    })

  private timer?: number
  private root: NativeTextInput | undefined | null

  private showError = () => {
    Animated.timing(this.state.error, {
      toValue: 1,
      duration: FOCUS_ANIMATION_DURATION * 1.0,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start(this.showPlaceholder)
  }

  private hideError = () => {
    Animated.timing(this.state.error, {
      toValue: 0,
      duration: BLUR_ANIMATION_DURATION * 1.0,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start()
  }

  private restoreLabel = () => {
    Animated.timing(this.state.labeled, {
      toValue: 1,
      duration: FOCUS_ANIMATION_DURATION * 1.0,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start()
  }

  private minimizeLabel = () => {
    Animated.timing(this.state.labeled, {
      toValue: 0,
      duration: BLUR_ANIMATION_DURATION * 1.0,
      useNativeDriver: Platform.select({
        ios: false,
        default: true,
      }),
    }).start()
  }

  private handleFocus = (args: any) => {
    if (this.props.disabled || !this.props.editable) {
      return
    }

    this.setState({ focused: true })

    if (this.props.onFocus) {
      this.props.onFocus(args)
    }
  }

  private handleBlur = (args: Object) => {
    if (this.props.disabled || !this.props.editable) {
      return
    }

    this.setState({ focused: false })

    if (this.props.onBlur) {
      this.props.onBlur(args)
    }
  }

  private handleChangeText = (value: string) => {
    if (!this.props.editable) {
      return
    }

    this.setState({ value })
    this.props.onChangeText && this.props.onChangeText(value)
  }

  private handleLayoutAnimatedText = (e: LayoutChangeEvent) => {
    this.setState({
      labelLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
        measured: true,
      },
    })
  }

  setNativeProps(args: Object) {
    return this.root && this.root.setNativeProps(args)
  }

  isFocused() {
    return this.root && this.root.isFocused()
  }

  clear() {
    return this.root && this.root.clear()
  }

  focus() {
    return this.root && this.root.focus()
  }

  blur() {
    return this.root && this.root.blur()
  }

  render() {
    const { ...rest } = this.props as $Omit<TextInputProps, 'ref'>

    return (
      <TextInputOutlined
        {...rest}
        value={this.state.value}
        parentState={this.state}
        innerRef={ref => {
          this.root = ref
        }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChangeText={this.handleChangeText}
        onLayoutAnimatedText={this.handleLayoutAnimatedText}
      />
    )
  }
}

export default TextInput
