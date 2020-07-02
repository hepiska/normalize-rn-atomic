import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'

import AddressCardLoader from './address-card-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const AddressDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <AddressCardLoader />
      <AddressCardLoader style={{ marginTop: 52 }} />
      <AddressCardLoader style={{ marginTop: 52 }} />
      <AddressCardLoader style={{ marginTop: 52 }} />
      <AddressCardLoader style={{ marginTop: 52 }} />
    </SafeAreaView>
  )
}
export default AddressDetailLoader
