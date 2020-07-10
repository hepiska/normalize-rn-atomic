import React, { useMemo, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import Icon from 'react-native-vector-icons/FontAwesome'
import { formStyles, fontStyle } from '@components/commont-styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInputOutline from '@src/components/atoms/field-floating'
import { GradientButton } from '@components/atoms/button'
import {
  addNewAddress,
  editAddress,
  getOneUserAddressById,
  setAddressLoading,
} from '@modules/address/action'
import { Checkbox } from '@components/atoms/checkbox'
import PickerPopup from '@components/molecules/picker'
import { shonetLocation } from '@utils/services'
import { deepClone } from '@utils/helpers'
import { useFormValidator } from '@src/hooks/use-form-validator'
import MapThumbnail from '@components/molecules/map-thumbnail'
import { colors, regex } from '@utils/constants'
import MapModal from '@components/organisms/gmaps-modal'
import { navigate } from '@src/root-navigation'
import FormLoader from '@src/components/atoms/loaders/form'

const headerHeight = 54

const regionMap = {
  countries: {
    parent: 'countries',
    current: 'countries',
    child: 'regions',
  },
  regions: {
    name: 'Province',
    parent: 'countries',
    current: 'regions',
    key: 'region_id',
    child: 'cities',
  },
  cities: {
    name: 'City',
    child: 'districts',
    key: 'city_id',
    parent: 'regions',
    current: 'cities',
  },
  districts: {
    name: 'District',
    key: 'district_id',
    parent: 'cities',
    child: 'villages',
    current: 'districts',
  },
  villages: {
    name: 'Village',
    key: 'village_id',
    parent: 'districts',
    current: 'villages',
  },
}

const dataQueryMap = {
  city: 'cities',
  // village: 'villages',
  district: 'districts',
  region: 'regions',
}

const mapaddressValue = addressRes => {
  const selectedLocation = {}
  if (addressRes) {
    Object.keys(addressRes).forEach(key => {
      if (typeof addressRes[key] === 'object') {
        selectedLocation[`${key}_id`] = addressRes[key].id
      } else {
        selectedLocation[key] = addressRes[key]
      }
    })
  }

  return selectedLocation
}

const getLocation = (selectedLevel, id) => {
  return shonetLocation({
    url: `${regionMap[selectedLevel].current}/${id}/${regionMap[selectedLevel].child}`,
  }).then(res => res.data.data)
}
const getZipCode = params =>
  shonetLocation({ url: 'zip_codes', params }).then(res => res.data.data)

const styles = StyleSheet.create({
  header: { height: headerHeight },
  smallFont: {
    ...fontStyle.helveticaBold,
    marginVertical: 12,
    lineHeight: 14,
    fontSize: 12,
    color: colors.black80,
  },
})

const mapDataName = (data, selectedValue) => {
  return data.find(_dat => _dat.name === selectedValue)
    ? data.find(_dat => _dat.name === selectedValue).label
    : ''
}

const AddAddressManual = props => {
  let pickerRef = null
  const [activeRegionLevel, SetActiveRegionLevel] = useState('countries')
  const [selectedLocation, setSelectedLocation] = useState<any>({
    countries: 360,
  })
  const [mapsModalVisible, setModalVisible] = useState(false)
  const [initialAddress, setInitialAddress] = useState<any>({})
  const [selectedDataPos, setSelectedDataPos] = useState<any>({})
  const [locationOptions, setLocationOptions] = useState<any>({})

  const [finishAnimation, setFinishAnimation] = useState(false)

  const getData = (activeLocation, id) => {
    getLocation(activeLocation, id).then(data => {
      const newLocationOptions = { ...locationOptions }
      newLocationOptions[regionMap[activeRegionLevel].child] = data.map(
        _data => ({
          label: '' + _data.name,
          name: _data.id,
        }),
      )
      setLocationOptions(newLocationOptions)
    })
  }
  const _getInitialData = section => {
    if (selectedLocation[regionMap[section].parent]) {
      getLocation(
        regionMap[section].parent,
        selectedLocation[regionMap[section].parent],
      ).then(data => {
        const newLocationOptions = { ...locationOptions }
        const newDataPos = { ...selectedDataPos }
        newLocationOptions[section] = data.map((_data, idx) => {
          if (_data.id === selectedLocation[section]) {
            newDataPos[section] = idx
          }
          return {
            label: '' + _data.name,
            name: _data.id,
          }
        })
        setSelectedDataPos(newDataPos)
        setLocationOptions(newLocationOptions)
      })
    }
  }

  const _changeSelectedDataPos = (name, pos) => {
    const newSelectedData = { ...selectedDataPos }
    newSelectedData[name] = pos
    setSelectedDataPos(newSelectedData)
  }

  useEffect(() => {
    const { route, setAddressLoading, getOneUserAddressById } = props

    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
      setAddressLoading(false)
      if (
        route.params?.type &&
        route.params.type === 'edit' &&
        route.params.addressId
      ) {
        getOneUserAddressById(route.params.addressId)
      }
      if (activeRegionLevel !== 'villages')
        getData(activeRegionLevel, selectedLocation[activeRegionLevel])
    })
  }, [])
  const _getInitialSelected = address => {
    const newSelectedLocation = { ...selectedLocation }
    newSelectedLocation.cities = address.city.id
    newSelectedLocation.regions = address.region.id
    newSelectedLocation.districts = address.district.id
    newSelectedLocation.villages = address.village.id
    setSelectedLocation(newSelectedLocation)
  }
  useEffect(() => {
    if (props.address) {
      const newInitialData = {}
      Object.keys(props.address).forEach(key => {
        if (typeof props.address[key] === 'object') {
          newInitialData[`${key}_id`] = {}
          newInitialData[`${key}_id`][props.address[key].id] =
            props.address[key].name || props.address[key].code
        }
      })
      setInitialAddress(newInitialData)
      _getInitialSelected(props.address)
    }
  }, [props.address])

  const _onSubmit = async ({ isValid, state }) => {
    const { route, addNewAddress, navigation, editAddress } = props
    // const result = {}
    // Object.keys(state).forEach(key => {
    //   result[key] = state[key].value
    // })
    // await addNewAddress(result)

    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        if (key === 'is_primary') {
          result[key] = Boolean(state[key].value)
        } else {
          result[key] = state[key].value
        }
      })

      if (
        route.params?.type &&
        route.params.type === 'edit' &&
        route.params.addressId
      ) {
        editAddress(route.params.addressId, result)
      } else {
        await addNewAddress(result)
      }

      if (route.params?.afterSubmit) {
        navigate('Screens', route.params?.afterSubmit)
      } else {
        navigation.goBack()
      }
    }
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      label: {
        required: true,
      },
      recipient_name: { required: true },
      email: {
        required: true,
        pattern: {
          message: 'please input correct email',
          regEx: regex.email,
        },
      },
      phone_number: {
        required: true,
        pattern: {
          message: 'please input correct phone number',
          regEx: regex.phoneNumber,
        },
      },
      region_id: {
        required: true,
      },
      city_id: {
        required: true,
      },
      district_id: {
        required: true,
      },
      village_id: {
        required: true,
      },
      zip_code_id: {
        required: true,
      },
      line_1: {
        required: true,
      },
      latitude: {
        required: true,
      },
      longitude: {
        required: true,
      },
      is_primary: {
        initialValue: false,
      },
    },
    _onSubmit,
    {
      reduxState: mapaddressValue(props.address),
    },
  )

  const onSelect = id => {
    const newSelectedLocation = { ...selectedLocation }
    setInitialAddress({})
    newSelectedLocation[activeRegionLevel] = id
    setSelectedLocation(newSelectedLocation)
    // if (activeRegionLevel !== 'villages') getData(activeRegionLevel, id)
    if (activeRegionLevel == 'villages') {
      getZipCode({
        city_id: selectedLocation.cities,
        district_id: selectedLocation.districts,
        village_id: id,
      }).then(data => {
        const newLocationOptions = deepClone(locationOptions)
        const zipCode = data[0]
        newLocationOptions.zip_code = zipCode
        setLocationOptions(newLocationOptions)
        const newSelectedLocation = { ...selectedLocation }
        newSelectedLocation.zip_code = zipCode.id
        setSelectedLocation(newSelectedLocation)
        handleOnChange('zip_code_id')(zipCode?.id)
      })
    }
  }

  const _locationApplied = location => {
    handleOnChange('longitude')(location.longitude)
    handleOnChange('latitude')(location.latitude)
    setModalVisible(false)
  }

  const _closeModal = () => {
    setModalVisible(false)
  }
  const pickerOptions = locationOptions[activeRegionLevel] || []

  const pickerTitle = `Choose ${regionMap[activeRegionLevel].name}`
  const title =
    props.route.params?.type === 'edit' ? 'Edit Address' : 'Add New Address'
  return useMemo(
    () => (
      <>
        <NavbarTop style={styles.header} leftContent={['back']} title={title} />
        {finishAnimation ? (
          <>
            <PickerPopup
              pickerRef={e => (pickerRef = e)}
              value={selectedDataPos[activeRegionLevel]}
              title={pickerTitle}
              items={pickerOptions}
              onValueChange={(value, index, data) => {
                if (data) {
                  _changeSelectedDataPos(activeRegionLevel, value)
                  onSelect(data.name)
                  handleOnChange(regionMap[activeRegionLevel].key)(data.name)
                }
              }}
            />
            <MapModal
              visible={mapsModalVisible}
              initialLocation={{
                latitude: state.latitude.value || -6.117664,
                longitude: state.longitude.value || 106.906349,
              }}
              title={title}
              closeModal={_closeModal}
              onLocationApplied={_locationApplied}
            />
            <ScrollView
              style={{ flex: 1, paddingHorizontal: 16, marginTop: 12 }}>
              <Text style={formStyles.title}>Recipient Information</Text>
              <TextInputOutline
                label="Recepient Name"
                style={formStyles.field}
                value={state.recipient_name.value}
                onChangeText={handleOnChange('recipient_name')}
                error={state.recipient_name.error}
                autoCapitalize="none"
              />
              <TextInputOutline
                label="email"
                style={formStyles.field}
                value={state.email.value}
                onChangeText={handleOnChange('email')}
                error={state.email.error}
                autoCapitalize="none"
              />
              <TextInputOutline
                label="Phone Number"
                keyboardType="numeric"
                style={formStyles.field}
                value={state.phone_number.value}
                onChangeText={handleOnChange('phone_number')}
                error={state.phone_number.error}
                autoCapitalize="none"
              />
              <Text style={{ ...formStyles.title, marginTop: 28 }}>
                Shipping Address
              </Text>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                  SetActiveRegionLevel('regions')
                  _getInitialData('regions')
                  pickerRef.show()
                }}>
                <TextInputOutline
                  label="Province"
                  value={
                    initialAddress.region_id
                      ? initialAddress.region_id[state.region_id.value]
                      : mapDataName(
                          locationOptions.regions || [],
                          state.region_id.value,
                        )
                  }
                  error={state.region_id.error}
                  style={formStyles.field}
                  disabled
                  rightIcon={
                    <Icon
                      name={'caret-down'}
                      size={22}
                      color={colors.black80}
                    />
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                  SetActiveRegionLevel('cities')
                  _getInitialData('cities')
                  pickerRef.show()
                }}>
                <TextInputOutline
                  label="City"
                  value={
                    initialAddress.city_id
                      ? initialAddress.city_id[state.city_id.value]
                      : mapDataName(
                          locationOptions.cities || [],
                          state.city_id.value,
                        )
                  }
                  error={state.city_id.error}
                  style={formStyles.field}
                  disabled
                  rightIcon={
                    <Icon
                      name={'caret-down'}
                      size={22}
                      color={colors.black80}
                    />
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                  SetActiveRegionLevel('districts')
                  _getInitialData('districts')

                  pickerRef.show()
                }}>
                <TextInputOutline
                  style={formStyles.field}
                  label="District"
                  value={
                    (initialAddress.district_id &&
                      initialAddress.district_id[state.district_id.value]) ||
                    mapDataName(
                      locationOptions.districts || [],
                      state.district_id.value,
                    )
                  }
                  error={state.district_id.error}
                  disabled
                  rightIcon={
                    <Icon
                      name={'caret-down'}
                      size={22}
                      color={colors.black80}
                    />
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                  SetActiveRegionLevel('villages')
                  _getInitialData('villages')

                  pickerRef.show()
                }}>
                <TextInputOutline
                  style={formStyles.field}
                  label="Sub District"
                  value={
                    (initialAddress.village_id &&
                      initialAddress.village_id[state.village_id.value]) ||
                    mapDataName(
                      locationOptions.villages || [],
                      state.village_id.value,
                    )
                  }
                  error={state.district_id.error}
                  disabled
                  rightIcon={
                    <Icon
                      name={'caret-down'}
                      size={22}
                      color={colors.black80}
                    />
                  }
                />
              </TouchableOpacity>
              <TextInputOutline
                style={formStyles.field}
                label="Zip Code"
                value={
                  (initialAddress.zip_code_id &&
                    initialAddress.zip_code_id[state.zip_code_id.value]) ||
                  locationOptions.zip_code?.code
                }
                error={state.zip_code_id.error}
                disabled
              />
              <TextInputOutline
                style={formStyles.field}
                label="Address Detail"
                desc="Example: Street name, House Number, Blok, RT/RW, Building level, etc"
                value={state.line_1.value}
                error={state.line_1.error}
                onChangeText={handleOnChange('line_1')}
                autoCapitalize="none"
              />
              <TextInputOutline
                style={formStyles.field}
                label="Address Label"
                desc="Example: Home, office, apartment"
                value={state.label.value}
                error={state.label.error}
                onChangeText={handleOnChange('label')}
                autoCapitalize="none"
              />
              <MapThumbnail
                desc="For express delivery"
                onPress={() => {
                  setModalVisible(true)
                }}
                style={formStyles.distance}
                location={{
                  latitude: state.latitude.value || -6.117664,
                  longitude: state.longitude.value || 106.906349,
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  marginBottom: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Checkbox
                  isChecked={state.is_primary.value}
                  onPress={() =>
                    handleOnChange('is_primary')(!state.is_primary.value)
                  }
                />
                <Text
                  style={{
                    ...styles.smallFont,
                    marginLeft: 8,
                    marginVertical: 0,
                  }}>
                  Set as primary address
                </Text>
              </View>
              <GradientButton
                onPress={handleOnSubmit}
                loading={props.loading}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3067E4', '#8131E2']}
                title="Add and Use Address"
                fontStyle={formStyles.buttonText}
                style={formStyles.button}
                disabled={disable}
              />
            </ScrollView>
          </>
        ) : (
          <FormLoader style={{ marginHorizontal: 16 }} />
        )}
      </>
    ),
    [
      state,
      selectedDataPos,
      locationOptions,
      props,
      activeRegionLevel,
      selectedLocation,
      disable,
      mapsModalVisible,
      finishAnimation,
    ],
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.addresses.loading,
    address: state.addresses.data[ownProps.route.params?.addressId],
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addNewAddress, editAddress, setAddressLoading, getOneUserAddressById },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressManual)
