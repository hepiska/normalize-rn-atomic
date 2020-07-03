import React from 'react'
import { StyleSheet, ViewStyle, View, Dimensions, Text } from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { connect } from 'react-redux'
import Tooltip from 'rn-tooltip'
import { futuraBlackFont24, fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import CourierCart from './courier-cart'
import { helveticaBlackFont12 } from '@components/commont-styles'
const { width } = Dimensions.get('screen')

interface ShipmentCartType {
  style?: ViewStyle
  shipment: any
  onPress: () => void
  index?: number
  variantIds?: any
  addressId?: any
  warehouseId?: any
  navigation?: any
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: colors.black50,
    borderWidth: 1,
    padding: 16,
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ' rgba(26, 26, 26, 0.04)',
    borderRadius: 100,
    width: 32,
    height: 24,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  futuraBold24: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 24,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

class ShipmentCart extends React.PureComponent<ShipmentCartType, any> {
  state = {
    defaultImage: null,
  }

  render() {
    const {
      style,
      shipment,
      onPress,
      index,
      variantIds,
      addressId,
      warehouseId,
      navigation,
    } = this.props

    if (!shipment) {
      return null
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ marginTop: index > 0 ? 22 : 24, ...style }}>
          <View {...styles.title}>
            <Text style={{ ...styles.futuraBold24 }}>{shipment.name}</Text>
            <Tooltip
              actionType="press"
              popover={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={{ ...styles.helvetica12 }}>
                    {shipment.description}
                  </Text>
                  <IconMi name="cancel" size={14} color={colors.black100} />
                </View>
              }
              height={35}
              withOverlay={false}
              backgroundColor={colors.black10}
              containerStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                left: 16,
              }}
              width={width - 32}>
              <View {...styles.iconContainer}>
                <Icon name="stopwatch" size={12} color={colors.black100} />
              </View>
            </Tooltip>
          </View>

          <View>
            {shipment.shipping_methods?.map((value, key) => {
              return (
                <CourierCart
                  key={`courier-${key}`}
                  type="choose-courier"
                  courier={value}
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderTopWidth: key > 0 ? 1 : 0,
                    borderTopColor: key > 0 ? colors.black50 : colors.white,
                  }}
                  variantIds={variantIds}
                  addressId={addressId}
                  warehouseId={warehouseId}
                  navigation={navigation}
                />
              )
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ShipmentCart
