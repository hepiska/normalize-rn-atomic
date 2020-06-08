import React from 'react'
import { View, SectionList, ViewStyle, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Column from '@components/organisms/mansory-column'
import Animated from 'react-native-reanimated'
import CircleLoader from '@components/atoms/loaders/cirle'
import { onScroll } from 'react-native-redash'

export enum LayoutType {
  mansory = 'mansory',
  list = 'list',
  normal = 'normal',
}

const styles = StyleSheet.create({
  loaderContainerL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    backgroundColor: 'rgba(16,16,16,0.3)',
    alignItems: 'center',
  },
  loader: {
    height: 52,
    width: 52,
  },
})

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

interface ListStikyHeaderType {
  data: Array<any>
  header: () => React.ReactElement | React.ReactElement | React.ReactInstance
  rowStyle: ViewStyle
  columnStyle: ViewStyle
  y: any
  renderItem: () =>
    | React.ReactElement
    | React.ReactElement
    | React.ReactInstance
  numOfColumn: number
  stickyHeader: () =>
    | React.ReactElement
    | React.ReactElement
    | React.ReactInstance
  layoutType: LayoutType
}

class ListMansoryStickyHeader extends React.Component<
  ListStikyHeaderType & any,
  any
> {
  _groupData = data => {
    const { numColumns, layoutType } = this.props
    if (!data.length) return data
    switch (layoutType) {
      case LayoutType.mansory:
        const mansoryData = []

        data.forEach((data, idx) => {
          const mod = idx % numColumns
          if (mansoryData[mod]) {
            mansoryData[mod].push(data)
          } else {
            mansoryData[mod] = [data]
          }
        })
        return [mansoryData]
      default:
        return data
    }
  }
  _renderSection = ({ item, index }) => {
    const {
      layoutType,
      renderItem,
      columnStyle,
      rowStyle,
      bounces,
    } = this.props
    switch (layoutType) {
      case LayoutType.mansory:
        return (
          <View style={{ flexDirection: 'row', ...rowStyle }}>
            {item.map((_data, _index) => {
              return (
                <Column
                  style={columnStyle}
                  bounces={bounces}
                  initialNumInColsToRender={2}
                  colIndex={_index}
                  data={_data}
                  key={`column-${_index}`}
                  renderItem={renderItem}
                />
              )
            })}
          </View>
        )
      default:
        return renderItem({ item, index })
    }
  }

  _keyExtractor = (item, index) => `mansory-column-${index}`

  render() {
    const {
      data,
      header,
      layoutType,
      y,
      loading,
      renderItem,
      numColumns,
      columnWrapperStyle,
      ...props
    } = this.props
    const groupData = this._groupData(data)
    const composeprops = { ...props }
    if (layoutType === LayoutType.normal) {
      composeprops.numColumns = numColumns
      composeprops.columnWrapperStyle = columnWrapperStyle
    }
    if (header) {
      composeprops.stickyHeaderIndices = [0]
      composeprops.ListHeaderComponent = header
    }
    return (
      <View style={{ flex: 1 }}>
        <AnimatedFlatlist
          data={groupData}
          onScroll={onScroll({ y })}
          key="flat-list"
          keyExtractor={this._keyExtractor}
          renderItem={this._renderSection}
          {...composeprops}
        />
        {/* <AnimatedFlatlist
          removeClippedSubviews={true}
          ListHeaderComponent={header}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          onScroll={onScroll({ y })}
          stickyHeaderIndices={[0]}
          stickySectionHeadersEnabled={true}
          automaticallyAdjustContentInsets={false}
          renderSectionHeader={stickyHeader}
          key="section-list"
          {...props}
          data={groupData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderSection}
        /> */}
        {/* {loading && (
          <View style={styles.loaderContainerL}>
            <CircleLoader style={styles.loader} />
          </View>
        )} */}
      </View>
    )
  }
}
export default ListMansoryStickyHeader
