import React from 'react'
import { View, SectionList, ViewStyle } from 'react-native'
import Column from '@components/organisms/mansory-column'
import Animated from 'react-native-reanimated'

import { onScroll } from 'react-native-redash'

export enum LayoutType {
  mansory = 'mansory',
  list = 'list',
  normal = 'normal',
}

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

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
    switch (layoutType) {
      case LayoutType.mansory:
        const mansoryData = []

        data.forEach((data, idx) => {
          const mod = idx % this.props.numColumns
          if (mansoryData[mod]) {
            mansoryData[mod].push(data)
          } else {
            mansoryData[mod] = [data]
          }
        })
        return mansoryData

      case LayoutType.normal:
        const listData = []
        let inerArray = []
        let res = []
        for (let i = 0; i < data.length - 1; i = i + numColumns) {
          if (data.length - 1 - i > numColumns) {
            inerArray = data.slice(i, i + numColumns)
          } else {
            inerArray = data.slice(i, i + numColumns)
            res = data.slice(i + numColumns)
          }
          listData.push(inerArray)
          if (res.length) {
            listData.push(res)
          }
        }
        return listData
      default:
        return data
    }
  }
  _renderSection = ({ section, index }) => {
    const { data } = section
    const {
      layoutType,
      renderItem,
      numOfColumn,
      columnStyle,
      rowStyle,
    } = this.props
    switch (layoutType) {
      case LayoutType.mansory:
        return (
          <View style={{ flexDirection: 'row', ...rowStyle }}>
            {data.map((_data, _index) => {
              return (
                <Column
                  style={columnStyle}
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
      case LayoutType.normal:
        return (
          <View
            key={'' + index}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              ...rowStyle,
            }}>
            {data[index].map((item, _idx) =>
              renderItem({ item, index: index * numOfColumn + _idx }),
            )}
          </View>
        )

      default:
        return renderItem({ item: data[index], index })
    }
  }

  _keyExtractor = (item, index) => `mansory-column-${index}`

  render() {
    const { data, header, stickyHeader, numColumns, y, ...props } = this.props
    const groupData = this._groupData(data)
    const sectionData = this.props.data
      ? [
          {
            title: 'mantap',
            data: groupData,
          },
        ]
      : []
    console.log(sectionData)
    return (
      <View style={{ flex: 1 }}>
        <AnimatedSectionList
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
          sections={sectionData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderSection}
        />
      </View>
    )
  }
}
export default ListMansoryStickyHeader
