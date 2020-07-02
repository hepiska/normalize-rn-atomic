import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import ProfileCardLoader from './profile-card-loader'
import ConnectionCardLoader from './connection-card-loader'
import LatestUpdateCardLoader from './latest-update-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const ProfileLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <ProfileCardLoader style={{ marginTop: 16 }} />
      <ConnectionCardLoader style={{ marginTop: 42 }} />
      <LatestUpdateCardLoader style={{ marginTop: 40 }} />
    </SafeAreaView>
  )
}
export default ProfileLoader
