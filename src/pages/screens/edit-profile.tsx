import React, { useEffect, useState, useMemo } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  ImageStore,
  Platform,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import { getUser, editUserProfile, setUserLoading } from '@modules/user/action'
import { useFormValidator } from '@src/hooks/use-form-validator'
import TextInputOutline from '@src/components/atoms/field-floating'
import { formStyles } from '@src/components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import PickerPopup from '@components/molecules/picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import dayjs from 'dayjs'
import DatePicker from '@components/atoms/datepicker'
import ProfilePicture from '@src/components/organisms/profile-picture-card'
import Camera from '@src/pages/modals/camera'
import { request } from '@utils/services'
import RNFS from 'react-native-fs'
import { calculateYear } from '@utils/helpers'

const options = {
  gender: [
    { label: 'Female', name: 'F' },
    { label: 'Male', name: 'M' },
  ],
}

const EditProfile = props => {
  const [activeLevel, setActiveLevel] = useState('gender')
  const [selectedDataPos, setSelectedDataPos] = useState<any>({})
  const [isCameraOpen, setCameraOpen] = useState(false)
  const [pictureSection, setPictureSection] = useState(null)
  let pickerRef = null
  let datePickerRef = null

  useEffect(() => {
    const { userId } = props
    if (userId) {
      getUser(userId, 'id')
    }
  }, [])

  const _onSubmit = async ({ isValid, state }) => {
    const { navigation, editUserProfile } = props
    if (isValid) {
      const result = {}
      Object.keys(state).forEach(key => {
        if (key === 'is_primary') {
          result[key] = Boolean(state[key].value)
        } else {
          result[key] = state[key].value
        }
      })
      result['name'] = result['first_name'] + ' ' + result['last_name']
      result['birthdate'] = new Date(
        dayjs(result['birthdate']).format('MM/DD/YYYY'),
      ).toISOString()
      delete result['first_name']
      delete result['last_name']

      await editUserProfile(result)
      navigation.goBack()
    }
  }

  const mapDataUser = data => {
    let newValue = { ...data }

    newValue.first_name = newValue.name.substr(0, newValue.name.indexOf(' '))
    newValue.last_name = newValue.name.substr(newValue.name.indexOf(' ') + 1)
    delete newValue.name

    return newValue
  }

  const mapDataName = (data, selectedValue) => {
    return data.find(_dat => _dat.name === selectedValue)
      ? data.find(_dat => _dat.name === selectedValue).label
      : ''
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useFormValidator(
    {
      photo_url: {
        required: false,
      },
      username: {
        required: true,
      },
      first_name: {
        required: true,
      },
      last_name: {
        required: true,
      },
      biography: {
        required: true,
      },
      gender: {
        required: true,
      },
      birthdate: {
        required: true,
      },
    },
    _onSubmit,
    {
      reduxState: mapDataUser(props.user),
    },
  )

  const _changeSelectedDataPos = (name, pos) => {
    const newSelectedData = { ...selectedDataPos }
    newSelectedData[name] = pos
    setSelectedDataPos(newSelectedData)
  }

  const openCamera = fieldName => () => {
    setCameraOpen(true)
    setPictureSection(fieldName)
  }

  const closeCamera = () => {
    setCameraOpen(false)
    setPictureSection(null)
  }

  const getImages = async selectedImages => {
    try {
      props.setUserLoading(true)
      const imagePath = `${
        RNFS.DocumentDirectoryPath
      }/${new Date().toISOString()}.jpg`.replace(/:/g, '-')
      let newUri = selectedImages.image.uri

      if (!selectedImages.image.base64) {
        if (Platform.OS === 'ios') {
          newUri = await RNFS.copyAssetsFileIOS(
            selectedImages.image.uri,
            imagePath,
            0,
            0,
            1,
            1.0,
            'contain',
          )
            .then(res => {
              return 'file://' + res
            })
            .catch(err => {
              console.log('ERROR IOS: image file write failed!!!', err.message)
            })
        }
      }

      const imageBase64 = await RNFS.readFile(newUri, 'base64')
        .then(res => {
          return res
        })
        .catch(err => {
          console.log('read error ---', err)
        })

      // hit upload image
      const params = {
        filename: selectedImages.image.filename,
      }
      request
        .request({
          url: 'files/upload',
          params,
          data: imageBase64,
          method: 'POST',
        })
        .then(res => {
          const { url } = res.data.data
          handleOnChange(pictureSection)(url)
          setPictureSection(null)
          props.setUserLoading(false)
        })
        .catch(err => {
          props.setUserLoading(false)
          Alert.alert('Image size too big!')
        })
    } catch (err) {
      console.log('err getImages ---', err)
    }
  }

  const pickerTitle = `Choose ${activeLevel}`
  const pickerOptions = options[activeLevel] || []

  const { user, loading } = props
  if (loading && !user) {
    return null
  }

  return useMemo(
    () => (
      <>
        <Camera
          isOpen={isCameraOpen}
          getImages={getImages}
          closeCamera={closeCamera}
          isCamRollAvailable
        />
        <NavbarTop
          title="Edit Profile"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <PickerPopup
          pickerRef={e => (pickerRef = e)}
          value={selectedDataPos[activeLevel]}
          title={pickerTitle}
          items={pickerOptions}
          onValueChange={(value, index, data) => {
            if (data) {
              _changeSelectedDataPos(activeLevel, value)
              // onSelect(data.name)
              handleOnChange(activeLevel)(data.name)
            }
          }}
        />
        <DatePicker
          datePickerRef={e => (datePickerRef = e)}
          value={
            state.birthdate.value ? new Date(state.birthdate.value) : new Date()
          }
          onChange={date =>
            handleOnChange('birthdate')(date.toLocaleDateString())
          }
          maximumDate={new Date(calculateYear(10))}
        />
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <ProfilePicture
            photoUrl={state.photo_url.value}
            openCamera={openCamera}
            type="edit"
          />

          {/* user info */}
          <View style={{ marginTop: 52, paddingHorizontal: 16 }}>
            <TextInputOutline
              label="Username"
              style={formStyles.field}
              value={state.username.value}
              onChangeText={handleOnChange('username')}
              error={state.username.error}
              autoCapitalize="none"
            />
            <TextInputOutline
              label="First Name"
              style={formStyles.field}
              value={state.first_name.value}
              onChangeText={handleOnChange('first_name')}
              error={state.first_name.error}
              autoCapitalize="none"
            />
            <TextInputOutline
              label="Last Name"
              style={formStyles.field}
              value={state.last_name.value}
              onChangeText={handleOnChange('last_name')}
              error={state.last_name.error}
              autoCapitalize="none"
            />
            <TextInputOutline
              label="Bio"
              style={formStyles.field}
              value={state.biography.value.replace(/(<([^>]+)>)/gi, '')}
              onChangeText={handleOnChange('biography')}
              error={state.biography.error}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                setActiveLevel('gender')
                pickerRef.show()
              }}>
              <TextInputOutline
                label="Gender"
                value={mapDataName(options.gender, state.gender.value)}
                error={state.gender.error}
                style={formStyles.field}
                disabled
                rightIcon={
                  <Icon name={'caret-down'} size={22} color={colors.black80} />
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => datePickerRef.open()}
              style={{ width: '100%' }}>
              <TextInputOutline
                label="Date Of Birth"
                value={dayjs(state.birthdate.value).format('DD/MM/YYYY')}
                error={state.birthdate.error}
                style={formStyles.field}
                disabled
                rightIcon={
                  <Icon name={'caret-down'} size={22} color={colors.black80} />
                }
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ padding: 16 }}>
          <GradientButton
            onPress={handleOnSubmit}
            loading={props.loading}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3067E4', '#8131E2']}
            title="Save"
            fontStyle={formStyles.buttonText}
            style={formStyles.button}
            disabled={disable}
          />
        </View>
      </>
    ),
    [state, props, isCameraOpen],
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser,
      editUserProfile,
      setUserLoading,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  let user
  const userId = state.auth.data?.user.id || null
  const loading = state.user.loading
  if (userId) {
    user = state.user.data[userId] || []
  }

  return {
    userId,
    user,
    loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
