import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@utils/constants'
import { googeMapsReq } from '@utils/services'
import Config from 'react-native-config'
import Field from '@components/atoms/field'

const styles = StyleSheet.create({
  locationItem: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
  },
  locationItemContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: colors.black50,
    borderStyle: 'solid',
  },
})

class AddressItem extends React.PureComponent<any, any> {
  _onPress = () => {
    const { location, onPress } = this.props
    onPress(location)
  }
  render() {
    const { location } = this.props
    const [name, ...resText] = location.formatted_address.split(',')

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.locationItemContainer}>
          <Text style={styles.locationItem}>
            <Text style={{ fontWeight: '500' }}>{name},</Text>
            <Text>{resText.join(',')}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class SearchAddress extends Component<any, any> {
  state = {
    locations: [],
    loading: false,
    search: '',
  }
  timer = null

  getData = () => {
    const { search } = this.state
    this.setState({ loading: true })
    const params = {
      key: Config.GOOGLE_MAP_KEY,
      language: 'id',
      address: search,
      fields: 'formatted_address,name,geometry',
      type: 'address',
    }
    return googeMapsReq({ url: '/geocode/json', params }).then(res => {
      this.setState({ locations: res.data.results, loading: false })
    })
  }

  _onSearchChange = e => {
    this.setState({ search: e })
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      if (this.state.search.length > 2) {
        this.getData()
      } else {
        this.setState({ locations: [] })
      }
    }, 800)
  }
  _onAddressSelected = data => {
    const { onAddressSelected } = this.props
    onAddressSelected(data)
    this.setState({ locations: [], search: '' })
  }

  _renderItem = ({ item }) => (
    <AddressItem location={item} onPress={this._onAddressSelected} />
  )
  _keyExtractor = (item, index) => `address${item.id}-${index}`
  render() {
    const { locations = [], search } = this.state
    return (
      <View style={{ height: 200 }}>
        <View style={{ height: 42 }}>
          <Field
            value={search}
            onChangeText={this._onSearchChange}
            leftIcon={
              <Icon
                name="search"
                style={{ marginRight: 8 }}
                color={colors.black60}
                size={14}
              />
            }
            placeholder="search..."
            style={{ backgroundColor: 'white', borderRadius: 8 }}
          />
        </View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={locations}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

export default SearchAddress
