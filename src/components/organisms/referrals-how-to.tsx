import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  ViewStyle,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { Button } from '@components/atoms/button'
import { colors } from '@utils/constants'
import HowToCard from '@src/components/molecules/how-to-card'
import NavbarTop from '@components/molecules/navbar-top'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 24,
    color: colors.black100,
  },
  text: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black60,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackSection: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.black100,
  },
  textStyle: {
    marginLeft: 0,
    color: colors.black100,
    ...fontStyle.helveticaBold,
  },
  cursor: {
    width: 8,
    height: 4,
    marginHorizontal: 2,
    backgroundColor: colors.black10,
    borderRadius: 4,
  },
  activeCursor: {
    width: 16,
    backgroundColor: colors.black70,
    marginHorizontal: 2,

    height: 4,
    borderRadius: 4,
  },
  textbold: {
    ...fontStyle.helveticaBold,
    color: colors.black100,
  },
  cartTitle: {},
})

const _renderItem = ({ item }) => <HowToCard {...item} key={item.title} />

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: 95,
}

interface ReveralHowToType {
  data: any
  style?: ViewStyle
}

const ReveralHowTo = ({ data, style }: ReveralHowToType) => {
  const inpStyle = StyleSheet.flatten(style)
  const [activeIdx, setActiveIdx] = useState(0)
  const onViewAbleChange = useCallback(info => {
    setActiveIdx(() => {
      return info.changed[0]?.index || 0
    })
  }, [])

  return (
    <View style={inpStyle}>
      <FlatList
        style={[styles.rowContainer]}
        horizontal
        pagingEnabled
        data={data}
        onViewableItemsChanged={onViewAbleChange}
        snapToInterval={280}
        keyExtractor={(item, index) => 'key' + index}
        viewabilityConfig={viewabilityConfig}
        renderItem={_renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorContainer}>
        {data.map((data, index) => (
          <View
            key={'cursor' + index}
            style={index === activeIdx ? styles.activeCursor : styles.cursor}
          />
        ))}
      </View>
    </View>
  )
}

export default ReveralHowTo
