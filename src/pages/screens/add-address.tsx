import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import Config from 'react-native-config'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { googeMapsReq } from '@utils/services'
import GooglePlace from '@components/organisms/google-place'
import DetailAddress from '@components/organisms/detail-address'
import RecepientData from '@components/organisms/recepient-data'

import { colors } from '@utils/constants'

import Animated, { Easing } from 'react-native-reanimated'

const { width, height } = Dimensions.get('screen')

const { Value, timing, interpolate, concat } = Animated

const headerHeight = 54
const mapheight = 0.4 * height
const componentHeight = 0.6 * height - headerHeight

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
  },
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

const initialRegion = {
  latitude: -6.117664,
  longitude: 106.906349,
  latitudeDelta: 0.0122,
  longitudeDelta: 0.0121,
}

class AddNewAddress extends Component<any, any> {
  state: any = {
    active: true,
    address: {},
    part: 0,
    loading: false,
    markerPos: {
      latitude: -6.1753871,
      longitude: 106.8249641,
    },
  }
  animate = new Value(0)

  toggleView = isOpen => {
    const iconAnimation = timing(this.animate, {
      duration: 300,
      toValue: !isOpen ? 0 : 1,
      easing: Easing.inOut(Easing.ease),
    })
    iconAnimation.start()
  }

  _onAddressesChanged = location => {
    const { geometry } = location
    this.setState(
      {
        address: location,
        markerPos: {
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
        },
        active: false,
        part: 1,
      },
      () => {
        this.toggleView(this.state.active)
      },
    )
  }

  _getAddressFromLoc = coords => {
    this.setState({ loading: true, markerPos: coords })
    const params = {
      key: Config.GOOGLE_MAP_KEY,
      language: 'id',
      radius: 1000,
      latlng: `${coords.latitude},${coords.longitude}`,
    }

    return googeMapsReq({ url: '/geocode/json', params }).then(res => {
      const location = { ...res.data.results[0] }
      location.name = location.address_components[0].short_name
      this.setState(
        {
          address: location,
          loading: false,
          active: false,
          part: 1,
        },
        () => {
          this.toggleView(this.state.active)
        },
      )
    })
  }

  _setDetail = detail => {
    this.setState({ detail: detail, part: 2, active: true }, () => {
      this.toggleView(this.state.active)
    })
  }

  onExpandChange = () => {
    this.setState({ active: !this.state.active }, () => {
      this.toggleView(this.state.active)
    })
  }

  componentOptions = part => {
    const data = [
      <GooglePlace
        key="GooglePlace"
        onAddressesChange={this._onAddressesChanged}
        onSearchFocus={this.onExpandChange}
        onSearchBlur={this.onExpandChange}
        isExpanded={this.state.active}
      />,
      <DetailAddress
        key="detail"
        getDetail={this._setDetail}
        address={this.state.address}
        loading={this.state.loading}
      />,
      <RecepientData
        key="recepientdata"
        address={this.state.address}
        loading={this.state.loading}
      />,
    ]

    return data[part]
  }

  _moveMarker = e => {
    this._getAddressFromLoc(e.nativeEvent.coordinate)
    // console.log(e.nativeEvent.coordinate)
  }
  render() {
    const { markerPos, part, address } = this.state

    const region = {
      latitudeDelta: 0.0092,
      longitudeDelta: 0.00921,
      ...markerPos,
    }
    const animatesPost = interpolate(this.animate, {
      inputRange: [0, 1],
      outputRange: [0, headerHeight + 10],
    })
    const animatedHeight = interpolate(this.animate, {
      inputRange: [0, 1],
      outputRange: [componentHeight, height],
    })

    const transformStyle = {
      transform: [
        {
          translateY: animatesPost,
        },
      ],
    }
    return (
      <>
        <NavbarTop
          style={styles.header}
          leftContent={['back']}
          title="Add New Address"
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: 'black',
              height: height * 0.5,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
            <MapView
              style={{ width: width, height: mapheight }}
              region={region}
              provider={PROVIDER_GOOGLE}
              initialRegion={initialRegion}>
              <Marker
                draggable
                coordinate={markerPos}
                onDragEnd={this._moveMarker}
              />
            </MapView>
          </View>
          <Animated.View
            style={[
              {
                display: 'flex',
                position: 'absolute',
                width,
                height: animatedHeight,
                bottom: 0,
                left: 0,
              },
              transformStyle,
            ]}>
            {this.componentOptions(part)}
          </Animated.View>
        </View>
      </>
    )
  }
}

export default AddNewAddress
