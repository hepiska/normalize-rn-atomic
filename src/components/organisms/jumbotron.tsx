import React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Div, PressAbbleDiv } from '@components/atoms/basic'
import ListItemJumbotron from '../molecules/list-item-jumbotron'
import { globalDimention } from '@utils/constants'

const { width } = Dimensions.get('window')

/* revisi: need to change based on response API */
interface DataType {
  id: number
  image_url: string
  target_url: string
}

interface JumbotronType {
  data: Array<DataType>
  navigation: any
  navigateTarget: any
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 240,
  },
  indicator: {
    bottom: 76,
    right: width / 2 - 80,
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

  _keyExtractor = item => item.id

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
    const { data } = this.props
    return (
      <View style={globalDimention.jumbotronSize}>
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
        <Div flexDirection="row" position="absolute" style={styles.indicator}>
          {data.map((_, k) => (
            <PressAbbleDiv
              _width="8px"
              _height="8px"
              radius="10"
              key={k}
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