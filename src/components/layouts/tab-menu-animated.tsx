import React, { ReactElement, useRef, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import Animated from 'react-native-reanimated'
import { colors } from '@utils/constants'
import { onScroll } from 'react-native-redash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { futuraBoldFont16, fontStyle } from '@components/commont-styles'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.black100,
  },
  fontActive: {
    color: colors.white,
  },
})

const { width } = Dimensions.get('screen')

const { Value, Extrapolate, interpolate } = Animated

interface TabMenuItems {
  name: string
  Component: () => ReactElement | ReactElement
  title: any
}
interface TabmenuType {
  style?: ViewStyle
  items: Array<TabMenuItems>
  selectedItem: string
  forceRender: boolean
  TabMenuNavigator: (props: any) => ReactElement
  onChangeTab(item: TabMenuItems): void
  isScrollEnabled?: boolean
  isLazyload?: boolean
}

const getActiveStyle = (item, selectedItem) =>
  item.name === selectedItem ? styles.active : {}
const getActiveFont = (item, selectedItem) =>
  item.name === selectedItem ? styles.fontActive : {}

const TabMenuAnimated = ({
  items = [],
  selectedItem,
  onChangeTab,
  forceRender,
  style,
  isScrollEnabled,
  TabMenuNavigator,
  isLazyload = false,
}: TabmenuType) => {
  const scrolContent: any = useRef(null)

  // const x = new Value(0)

  const _onChangeTab = item => () => {
    onChangeTab(item)
  }
  const idx = items.findIndex(it => it.name === selectedItem)
  let timer = null

  useEffect(() => {
    if (scrolContent) {
      timer = setTimeout(() => {
        scrolContent.current.getNode().scrollTo({ x: idx * width })
      }, 50)
    }
    return () => clearTimeout(timer)
  }, [idx])

  const _onChangePage = ({ nativeEvent }) => {
    const idx = Math.ceil(nativeEvent.contentOffset.x / width)
    if (onChangeTab) {
      onChangeTab(items[idx])
    }
  }
  return useMemo(
    () => (
      <View style={{ ...style, flex: 1 }}>
        <View>
          {TabMenuNavigator && (
            <TabMenuNavigator
              items={items}
              selectedItem={selectedItem}
              // x={x}
              selectedIndex={idx}
            />
          )}
        </View>
        <Animated.ScrollView
          style={{
            marginVertical: 8,
            width: '100%',
            flex: 1,
          }}
          scrollEnabled={isScrollEnabled}
          ref={scrolContent}
          onMomentumScrollEnd={_onChangePage}
          centerContent
          scrollEventThrottle={4}
          // onScroll={onScroll({ x })}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal>
          {isLazyload
            ? items.map((item, key) =>
                key === idx ? (
                  typeof item.Component === 'function' ? (
                    <item.Component key={key} />
                  ) : (
                    item.Component
                  )
                ) : (
                  <Div _width={width} key={`tabmenu-${key}`} />
                ),
              )
            : items.map((item, key) =>
                typeof item.Component === 'function' ? (
                  <item.Component key={key} />
                ) : (
                  item.Component
                ),
              )}
        </Animated.ScrollView>
      </View>
    ),
    [selectedItem, isScrollEnabled, forceRender],
  )
}

const mapStateToProps = state => ({
  isScrollEnabled: state.uiInteraction.isScrollEnabled,
})

export default connect(mapStateToProps, null)(TabMenuAnimated)
