import React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import TopicCard from '@components/molecules/topic-card'

interface DataType {
  id: string | number
  title: string
  image: any
  onPress?: () => void
}

interface InterestType {
  data: Array<DataType>
  style?: ViewStyle
  handleSelected: Function
  selected: any
  imageType?: string
  isPressable?: boolean
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
})

class InterestLayout extends React.Component<InterestType, any> {
  handlePressCard = id => () => {
    this.props.handleSelected(id)
  }

  _renderItem = (item, index) => {
    const isSelected = this.props.selected.find(val => val.id === item.id)
    return (
      <TopicCard
        topic={item}
        key={`topic-${index}`}
        onPress={this.handlePressCard(item.id)}
        selected={isSelected}
        imageType={this.props.imageType}
        isPressable={this.props.isPressable}
      />
    )
  }
  render() {
    const { style, data, selected } = this.props

    return (
      <View
        style={{
          ...styles.container,
          ...style,
        }}>
        {data &&
          data.map((value, key) => (
            <View key={`${value.toString()}-${key}`}>
              {this._renderItem(value, key)}
            </View>
          ))}
      </View>
    )
  }
}

export default InterestLayout
