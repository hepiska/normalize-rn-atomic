import React, { ReactElement, useRef, useEffect } from 'react'
import { StyleSheet, Dimensions, ViewStyle } from 'react-native'
import { Div, Font, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import { connect } from 'react-redux'
import { futuraBoldFont16 } from '@components/commont-styles'

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

  useEffect(() => {
    let timer = null
    if (scrolContent) {
      timer = setTimeout(
        () => scrolContent.current.scrollTo({ x: idx * width }),
        100,
      )
    }
    return () => clearTimeout(timer)
  }, [idx])

  console.log('asa', isScrollEnabled)
  const _onChangePage = ({ nativeEvent }) => {
    const idx = Math.ceil(nativeEvent.contentOffset.x / width)
    onChangeTab(items[idx])
  }
  return (
    <Div _width={width} style={style}>
      <Div _width={width}>
        <ScrollDiv
          horizontal
          _margin="8px 0px"
          _width="100%"
          showsHorizontalScrollIndicator={false}>
          {items.map(item => (
            <PressAbbleDiv
              _margin="0px 8px"
              key={item.name + 'button'}
              _padding="4px"
              onPress={_onChangeTab(item)}
              style={{ ...getActiveStyle(item, selectedItem) }}>
              <Font {...futuraBoldFont16}>{item.title}</Font>
            </PressAbbleDiv>
          ))}
        </ScrollDiv>
      </Div>
      <ScrollDiv
        _height="100%"
        _margin="8px 0px"
        scrollEnabled={isScrollEnabled}
        ref={scrolContent}
        onMomentumScrollEnd={_onChangePage}
        _width="100%"
        centerContent
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal>
        {items.map(item => item.Component)}
      </ScrollDiv>
    </Div>
  )
}

const mapStateToProps = state => ({
  isScrollEnabled: state.uiInteraction.isScrollEnabled,
})
export default connect(mapStateToProps, null)(TabMenu)
