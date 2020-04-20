import React, { useMemo, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import Icon from 'react-native-vector-icons/FontAwesome'
import { formStyles } from '@components/commont-styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInputOutline from '@src/components/atoms/field-floating'
import { GradientButton } from '@components/atoms/button'
import { setnewaddress } from '@modules/address/action'
import CirleLoader from '@src/components/atoms/loaders/cirle'
import { Checkbox } from '@components/atoms/checkbox'
import PickerPopup from '@components/molecules/picker'
import { shonetLocation } from '@utils/services'
import { deepClone } from '@utils/helpers'
import { useFormValidator } from '@src/hooks/use-form-validator'
import MapThumbnail from '@components/molecules/map-thumbnail'
import { colors, regex } from '@utils/constants'
import MapModal from '@components/organisms/gmaps-modal'

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
    marginVertical: 12,
    fontFamily: 'Helvetica Neue',
    lineHeight: 14,
    fontSize: 12,
    color: colors.black80,
  },
})

const mapDataName = (data, selectedValue) =>
  data.find(_dat => _dat.name === selectedValue)?.label

const AddAddressManual = props => {
  let pickerRef = null
  const [activeRegionLevel, SetActiveRegionLevel] = useState('countries')
  const [selectedLocation, setSelectedLocation] = useState<any>({
    countries: 360,
  })
  const [mapsModalVisible, setModalVisible] = useState(false)
  const [locationOptions, setLocationOptions] = useState<any>({})

  const getData = (activeLocation, id) => {
    getLocation(activeLocation, id).then(data => {
      const newLocationOptions = deepClone(locationOptions)
      newLocationOptions[regionMap[activeRegionLevel].child] = data.map(
        _data => ({
          label: '' + _data.name,
          name: _data.id,
        }),
      )
      setLocationOptions(newLocationOptions)
    })
  }

  useEffect(() => {
    if (activeRegionLevel !== 'villages')
      getData(activeRegionLevel, selectedLocation[activeRegionLevel])
  }, [])

  const _onSubmit = ({ isValid, state }) => {
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        result[key] = state[key].value
      })
      console.log(result)
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
        pattern: {
          message: 'please input correct phone number',
          regEx: regex.phoneNumber,
        },
      },
    },
    _onSubmit,
  )

  const onSelect = id => {
    const newSelectedLocation = { ...selectedLocation }
    newSelectedLocation[activeRegionLevel] = id
    setSelectedLocation(newSelectedLocation)
    if (activeRegionLevel !== 'villages') getData(activeRegionLevel, id)
    else
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

  return (
    <>
      <NavbarTop
        style={styles.header}
        leftContent={['back']}
        title="Add New Address"
      />
      <PickerPopup
        pickerRef={e => (pickerRef = e)}
        value={null}
        title={pickerTitle}
        items={pickerOptions}
        onValueChange={(value, index, data) => {
          onSelect(data.name)
          handleOnChange(regionMap[activeRegionLevel].key)(data.name)
        }}
      />
      <MapModal
        visible={mapsModalVisible}
        initialLocation={{
          latitude: state.latitude.value || -6.117664,
          longitude: state.longitude.value || 106.906349,
        }}
        title="Add New Address"
        closeModal={_closeModal}
        onLocationApplied={_locationApplied}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={formStyles.title}>Recepient Information</Text>
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
        <Text style={formStyles.title}>Shipping Address</Text>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            SetActiveRegionLevel('regions')
            pickerRef.show()
          }}>
          <TextInputOutline
            label="Province"
            value={mapDataName(
              locationOptions.regions || [],
              state.region_id.value,
            )}
            error={state.region_id.error}
            style={formStyles.field}
            disabled
            rightIcon={
              <Icon name={'caret-down'} size={22} color={colors.black80} />
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            SetActiveRegionLevel('cities')
            pickerRef.show()
          }}>
          <TextInputOutline
            label="City"
            value={mapDataName(
              locationOptions.cities || [],
              state.city_id.value,
            )}
            error={state.city_id.error}
            style={formStyles.field}
            disabled
            rightIcon={
              <Icon name={'caret-down'} size={22} color={colors.black80} />
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            SetActiveRegionLevel('districts')
            pickerRef.show()
          }}>
          <TextInputOutline
            style={formStyles.field}
            label="District"
            value={mapDataName(
              locationOptions.districts || [],
              state.district_id.value,
            )}
            error={state.district_id.error}
            disabled
            rightIcon={
              <Icon name={'caret-down'} size={22} color={colors.black80} />
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            SetActiveRegionLevel('villages')
            pickerRef.show()
          }}>
          <TextInputOutline
            style={formStyles.field}
            label="Sub District"
            value={mapDataName(
              locationOptions.villages || [],
              state.village_id.value,
            )}
            error={state.district_id.error}
            disabled
            rightIcon={
              <Icon name={'caret-down'} size={22} color={colors.black80} />
            }
          />
        </TouchableOpacity>
        <TextInputOutline
          style={formStyles.field}
          label="Zip Code"
          value={locationOptions.zip_code?.code}
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
            style={{ ...styles.smallFont, marginLeft: 8, marginVertical: 0 }}>
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
  )
}

export default AddAddressManual
