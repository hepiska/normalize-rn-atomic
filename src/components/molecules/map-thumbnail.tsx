import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

interface MapThumbnailType {
  location?: any
  desc?: string
  style?: ViewStyle
  onPress?: () => void
}

const styles = StyleSheet.create({
  container: {},
  constMapContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 8,
    width: '98%',
    backgroundColor: colors.black10,
  },
  desc: {
    marginTop: 8,
    color: colors.black60,
    fontSize: 10,
    fontFamily: 'Helvetica Neue',
  },
})

const MapThumbnail = ({ location, style, onPress, desc }: MapThumbnailType) => {
  const composeStyle = { ...styles.container, ...style }
  const region: any = {
    latitudeDelta: 0.0032,
    longitudeDelta: 0.00321,
    ...location,
  }
  return (
    <View style={composeStyle}>
      <TouchableOpacity style={styles.constMapContainer} onPress={onPress}>
        {location ? (
          <>
            <MapView
              liteMode
              style={StyleSheet.absoluteFill}
              region={region}
              provider={PROVIDER_GOOGLE}>
              <Marker coordinate={location} />
            </MapView>
            <View style={[StyleSheet.absoluteFill]} />
          </>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-marker" size={14} />
            <Text
              style={{
                marginLeft: 8,
                fontFamily: 'Helvetica Neue',
                fontWeight: '500',
              }}>
              Set Locatiion
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {desc && <Text style={styles.desc}>{desc}</Text>}
    </View>
  )
}

export default MapThumbnail
