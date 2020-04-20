import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import Config from 'react-native-config'
import { GradientButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Geolocation from 'react-native-geolocation-service'
import { showAlert, checkLocationPermit } from '@utils/helpers'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { googeMapsReq } from '@utils/services'
import SearchAddress from '@components/organisms/search-address'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Modal from 'react-native-modal'

const headerHeight = 54

const styles = StyleSheet.create({
  header: { height: headerHeight },
  font: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    color: colors.black100,
    marginHorizontal: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  currentLocButton: {
    position: 'absolute',
    bottom: 162,
    right: 16,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bottomSection: {
    width: '100%',
    justifyContent: 'center',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  search: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: 20,
    left: 0,
  },
  button: {
    width: '100%',
    height: 46,
    marginVertical: 16,
    backgroundColor: '#8131E2',
  },
})

class MapModal extends React.PureComponent<any, any> {
  state: any = {
    location: this.props.initialLocation || {
      latitude: -6.2297465,
      longitude: 106.829518,
    },
    address: null,
    search: '',
    loading: false,
  }

  timer = null

  _onAddressSelected = address => {
    const newLocation = {
      latitude: address.geometry.location.lat,
      longitude: address.geometry.location.lng,
    }
    console.log(newLocation)
    this.setState({ address: address, location: newLocation })
  }

  _getCurrentPosition = async () => {
    try {
      this.setState({ loading: true })
      const isGranted = await checkLocationPermit()
      if (!isGranted) throw new Error('permissions not granted')
      if (isGranted) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position)
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
      this._onAddressSelected(location)
    })
  }

  _onMarkerMoved = e => {
    this._getCurrentLoc(e.nativeEvent.coordinate)
  }

  _applyLocation = () => {
    this.props.onLocationApplied(this.state.location, this.state.address)
  }
  _closeModal = () => {
    this.props.closeModal()
  }
  render() {
    const { visible, title } = this.props
    const { location, address } = this.state
    const mapsOrigin: any = {
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
      ...location,
    }

    return (
      <Modal
        isVisible={visible}
        style={{ margin: 0, justifyContent: 'flex-start' }}>
        <NavbarTop
          style={styles.header}
          leftAction={
            <Icon name="close" size={24} onPress={this._closeModal} />
          }
          title={title}
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <MapView
            liteMode
            style={StyleSheet.absoluteFill}
            region={mapsOrigin}
            provider={PROVIDER_GOOGLE}>
            <Marker
              coordinate={location}
              draggable
              onDragEnd={this._onMarkerMoved}
            />
          </MapView>
          <View style={styles.search}>
            <View style={{ width: '80%' }}>
              <SearchAddress onAddressSelected={this._onAddressSelected} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.currentLocButton}
            onPress={this._getCurrentPosition}>
            <Icon name="gps-fixed" />
          </TouchableOpacity>
          <View style={styles.bottomSection}>
            <Text style={{ ...styles.font, fontWeight: '500' }}>
              {address?.formatted_address
                .split(',')
                .splice(0, 2)
                .join(',')}
            </Text>
            <Text style={{ ...styles.font }}>{address?.formatted_address}</Text>
            <GradientButton
              onPress={this._applyLocation}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#3067E4', '#8131E2']}
              title="Set Location"
              fontStyle={styles.buttonText}
              style={styles.button}
              disabled={!address}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

export default MapModal
