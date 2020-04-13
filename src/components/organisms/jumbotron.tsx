import React from 'react'
import { Dimensions, FlatList, View, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import { Div, PressAbbleDiv } from '@components/atoms/basic'
import ListItemJumbotron from '../molecules/list-item-jumbotron'

const { width } = Dimensions.get('window')

/* revisi: need to change based on response API */
interface DataType {
  id: string | number
  image_url: string
  target_url: string
}

interface JumbotronType {
  data: Array<DataType>
  navigation: any
  navigateTarget: any
  style: ViewStyle
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 240,
  },
  indicator: {
    bottom: 20,
    left: 16,
  },
})

class Jumbotron extends React.Component<JumbotronType, any> {
  state = {
    childPosition: 0,
  }

  _itemVisiblePercentThreshold = {
    itemVisiblePercentThreshold: 80,
  }

  _onViewAbleChange = ({ viewableItems }) => {
    if (viewableItems.length) {
      this.setState({ childPosition: viewableItems[0].index })
    }
  }

  _keyExtractor = (item, index) => {
    return item.id.toString() + index
  }

  _renderItem = ({ item }) => {
    /* revisi : need to be parsed */
    const { navigation, navigateTarget } = this.props

    return (
      <ListItemJumbotron
        item={item}
        navigation={navigation}
        navigateTarget={navigateTarget}
      />
    )
  }

  render() {
    const { data, style } = this.props
    return (
      <View style={style}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={width}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onViewableItemsChanged={this._onViewAbleChange}
          viewabilityConfig={this._itemVisiblePercentThreshold}
        />
        <Div
          flexDirection="row"
          position="absolute"
          style={styles.indicator}
          justify="flex-start">
          {data.map((_, k) => (
            <PressAbbleDiv
              _width="8px"
              _height="8px"
              radius="10"
              key={`jumbotron-${k}`}
              mar="0px 4px"
              bg={k === this.state.childPosition ? '#455BE3' : '#949494'}
            />
          ))}
        </Div>
      </View>
    )
  }
}

export default Jumbotron
