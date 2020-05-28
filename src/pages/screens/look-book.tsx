import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { images } from '@utils/constants'

const LookBookDetail = props => {
  return (
    <View style={{ padding: 40, flex: 1 }}>
      <View>
        <Text>Lookbook</Text>
      </View>
    </View>
  )
}

export default LookBookDetail
