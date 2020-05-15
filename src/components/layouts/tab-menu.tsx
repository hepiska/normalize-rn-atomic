import React, { ReactElement, useRef, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { futuraBoldFont16, fontStyle } from '@components/commont-styles'
import { changeValue as changeValueUiIneraction } from '@modules/ui-interaction/action'

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
  Component: ReactElement
  title: string
}
interface TabmenuType {
  style?: ViewStyle
  items: Array<TabMenuItems>
  selectedItem: string
  onChangeTab(item: TabMenuItems): void
  isScrollEnabled?: boolean
}

const getActiveStyle = (item, selectedItem) =>
  item.name === selectedItem ? styles.active : {}

const TabMenu = ({
  items = [],
  selectedItem,
  onChangeTab,
  style,
  isScrollEnabled,
}: TabmenuType) => {
  const scrolContent: any = useRef(null)
  const _onChangeTab = item => () => {
    onChangeTab(item)
  }
  const idx = items.findIndex(it => it.name === selectedItem)
  let timer = null

  useEffect(() => {
    if (scrolContent) {
      timer = setTimeout(
        () => scrolContent.current.scrollTo({ x: idx * width }),
        50,
      )
    }
    return () => clearTimeout(timer)
  }, [idx])

  const _onChangePage = ({ nativeEvent }) => {
    const idx = Math.ceil(nativeEvent.contentOffset.x / width)
    onChangeTab(items[idx])
  }
  return useMemo(
    () => (
      <Div _width={width} style={style}>
        <Div _width={width}>
          <ScrollView
            horizontal
            style={{ marginVertical: 8, width: '100%' }}
            showsHorizontalScrollIndicator={false}>
            {items.map(item => (
              <TouchableOpacity
                key={item.name + 'button'}
                onPress={_onChangeTab(item)}
                style={{
                  marginHorizontal: 8,
                  padding: 4,
                  ...getActiveStyle(item, selectedItem),
                }}>
                <Font style={{ ...fontStyle.futuraDemi, fontSize: 16 }}>
                  {item.title}
                </Font>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Div>
        <ScrollView
          style={{ marginVertical: 8, height: '100%' }}
          scrollEnabled={isScrollEnabled}
          ref={scrolContent}
          onMomentumScrollEnd={_onChangePage}
          centerContent
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal>
          {items.map(item => item.Component)}
        </ScrollView>
      </Div>
    ),
    [selectedItem, isScrollEnabled],
  )
}

const mapStateToProps = state => ({
  isScrollEnabled: state.uiInteraction.isScrollEnabled,
})

export default connect(mapStateToProps, null)(TabMenu)
