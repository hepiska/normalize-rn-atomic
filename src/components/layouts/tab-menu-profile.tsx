import React, { ReactElement, useRef, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { Div, Font, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { fontStyle } from '@components/commont-styles'

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2,
    borderColor: colors.black100,
    borderStyle: 'solid',
  },
})

const { width } = Dimensions.get('screen')

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
  onChangeTab(item: TabMenuItems): void
  isScrollEnabled?: boolean
  isLazyload?: boolean
}

const getActiveStyle = (item, selectedItem) =>
  item.name === selectedItem ? styles.active : {}

const TabMenu = ({
  items = [],
  selectedItem,
  onChangeTab,
  forceRender,
  style,
  isScrollEnabled,
  isLazyload = false,
}: TabmenuType) => {
  // const scrolContent: any = useRef(null)
  const _onChangeTab = item => () => {
    onChangeTab(item)
  }
  // const idx = items.findIndex(it => it.name === selectedItem)
  // let timer = null

  // useEffect(() => {
  //   if (scrolContent) {
  //     timer = setTimeout(
  //       () => scrolContent.current.scrollTo({ x: idx * width }),
  //       50,
  //     )
  //   }
  //   return () => clearTimeout(timer)
  // }, [idx])

  // const _onChangePage = ({ nativeEvent }) => {
  //   const idx = Math.ceil(nativeEvent.contentOffset.x / width)
  //   onChangeTab(items[idx])
  // }
  return useMemo(
    () => (
      <View style={{ ...style, flex: 1 }}>
        <View
          style={{
            borderBottomColor: colors.black50,
            borderBottomWidth: 1,
          }}>
          <ScrollDiv
            bounces={false}
            horizontal
            _width="100%"
            showsHorizontalScrollIndicator={false}>
            {items.map(item => (
              <TouchableOpacity
                key={item.name + 'button'}
                onPress={_onChangeTab(item)}
                style={{
                  ...getActiveStyle(item, selectedItem),
                  paddingHorizontal: 16,
                  paddingBottom: 8,
                }}>
                {typeof item.title === 'string' ? (
                  <Font
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 16,
                      color:
                        item.name === selectedItem
                          ? colors.black100
                          : colors.black60,
                    }}>
                    {item.title}
                  </Font>
                ) : (
                  item.title
                )}
              </TouchableOpacity>
            ))}
          </ScrollDiv>
        </View>
        {/* <ScrollView
          style={{
            width: '100%',
            flex: 1,
          }}
          scrollEnabled={isScrollEnabled}
          ref={scrolContent}
          onMomentumScrollEnd={_onChangePage}
          centerContent
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
                  <Div _width={width} key={key} />
                ),
              )
            : items.map((item, key) =>
                typeof item.Component === 'function' ? (
                  <item.Component key={key} />
                ) : (
                  item.Component
                ),
              )}
        </ScrollView> */}
      </View>
    ),
    [selectedItem, isScrollEnabled, forceRender],
  )
}

const mapStateToProps = state => ({
  isScrollEnabled: state.uiInteraction.isScrollEnabled,
})

export default connect(mapStateToProps, null)(TabMenu)
