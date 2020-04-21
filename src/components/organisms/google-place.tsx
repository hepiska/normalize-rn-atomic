import React, { Component, PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  Button,
} from 'react-native'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Geolocation from 'react-native-geolocation-service'
import { colors } from '@utils/constants'
import { showAlert, checkLocationPermit } from '@utils/helpers'
import Animated, { Easing } from 'react-native-reanimated'
import { OutlineButton } from '@components/atoms/button'
import Field from '@components/atoms/field'
import { googeMapsReq } from '@utils/services'
import CirleLoader from '@src/components/atoms/loaders/cirle'

const { Value, timing } = Animated

const headerHeight = 54

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
  },
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  boldFont: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  loader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    borderColor: colors.black50,
    borderBottomWidth: 1,
  },
  smallFont: {
    marginTop: 8,
    fontFamily: 'Helvetica Neue',
    lineHeight: 14,
    fontSize: 12,
    color: colors.black60,
  },
})

class LocationItem extends React.PureComponent<any, any> {
  _onPress = () => {
    const location = { ...this.props.location }
    location.name = location.address_components[0].short_name
    this.props.onPress(location)
  }
  render() {
    const { location } = this.props
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this._onPress}>
          <View style={{ marginRight: 10 }}>
            <Icon name="map-marker" size={16} />
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={this._onPress}>
          <View>
            <Text style={styles.boldFont}>
              {location.address_components[0].short_name}
            </Text>
            <Text style={styles.smallFont}>{location.formatted_address}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

class GooglePlace extends Component<any, any> {
  state: any = { search: '', locations: [], loading: false, coords: {} }
  animate = new Value(0)

  toggleView = isOpen => {
    const iconAnimation = timing(this.animate, {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      easing: Easing.inOut(Easing.ease),
    })
    iconAnimation.start()
  }

  componentDidMount() {
    checkLocationPermit()
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
  _keyExtractor = (item, index) => `address${item.id}-${index}`

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
  _onFocus = () => {
    if (!this.props.isExpanded) {
      this.props.onSearchFocus()
    }
  }

  _getCurrentPosition = async () => {
    try {
      this.setState({ loading: true })
      const isGranted = await checkLocationPermit()
      if (!isGranted) throw new Error('permissions not granted')
      if (isGranted) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState({ coords: position.coords, loading: false }, () => {
              this._getCurrentLoc(this.state.coords)
            })
          },
          error => {
            showAlert(error.message)
            this.setState({ loading: false })
          },
          { enableHighAccuracy: true, timeout: 1000, maximumAge: 10000 },
        )
      }
    } catch (error) {
      this.setState({ loading: false })

      console.log(error)
    }
  }

  _getCurrentLoc = coords => {
    this.setState({ loading: true })
    const params = {
      key: Config.GOOGLE_MAP_KEY,
      language: 'id',
      radius: 1000,
      latlng: `${coords.latitude},${coords.longitude}`,
    }
    return googeMapsReq({ url: '/geocode/json', params }).then(res => {
      const location = { ...res.data.results[0] }
      location.name = location.address_components[0].short_name
      this.props.onAddressesChange(location)
      this.setState({ locations: [], loading: false })
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  Loader = (
    <View style={styles.loader}>
      <CirleLoader style={{ height: 50, width: 50 }} />
    </View>
  )
  emtyComponent = () => (
    <View>
      <TouchableOpacity
        onPress={this._getCurrentPosition}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
        }}>
        <MaterialIcon name="gps-fixed" size={16} style={{ marginRight: 12 }} />
        <Text style={styles.boldFont}>Use my current location </Text>
      </TouchableOpacity>
      {this.state.search.length !== 0 && (
        <View style={{ marginTop: 40 }}>
          <Text style={{ ...styles.boldFont, fontWeight: '300' }}>
            Looks like we can't find your desired address. Don't worry, you also
            can try to add address manually
          </Text>
          <OutlineButton
            style={{ borderColor: colors.blue50, marginTop: 32 }}
            fontStyle={{ color: colors.blue50, fontWeight: '500' }}
            onPress={() => {}}
            title="Add Address Manually"
          />
        </View>
      )}
    </View>
  )
  onItemPress = location => {
    this.props.onAddressesChange(location)
    this.setState({ locations: [], search: '' })
  }
  _renderItem = ({ item }) => (
    <LocationItem location={item} onPress={this.onItemPress} />
  )
  render() {
    const { search, locations, loading } = this.state
    const { isExpanded } = this.props
    return (
      <View style={styles.container}>
        <View style={{ height: 46 }}>
          <Field
            style={{ width: '100%' }}
            value={search}
            inputProps={{
              onFocus: this._onFocus,
              // onBlur: this.props.onSearchBlur,
            }}
            placeholder="Write city / district / building..."
            onChangeText={this._onSearchChange}
            leftIcon={
              <Icon
                size={16}
                style={{ marginRight: 8 }}
                name="search"
                color={colors.black90}
              />
            }
            rightIcon={
              isExpanded && (
                <Icon
                  onPress={this.props.onSearchBlur}
                  style={{ marginRight: 8 }}
                  name="times-circle"
                  size={16}
                  color={colors.black90}
                />
              )
            }
          />
        </View>
        <Text style={styles.smallFont}>
          Example: Kediri, Pertamina Tower, Komplek Banjar Indah
        </Text>
        <View style={{ flex: 1 }}>
          {loading && this.Loader}
          <FlatList
            keyExtractor={this._keyExtractor}
            ListEmptyComponent={loading ? null : this.emtyComponent}
            data={locations}
            refreshing={loading}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    )
  }
}

export default GooglePlace
