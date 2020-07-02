import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import MyShoppingLoader from './my-shopping-loader'
import MySocialLoader from './my-social-loader'
import UserStatsCardLoader from './user-stats-card-loader'
import ActionListLoader from './action-list-loader'

interface LoaderPropsType {
  style?: ViewStyle
}

const AddressDetailLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <UserStatsCardLoader style={{ marginTop: 16 }} />
      <MyShoppingLoader style={{ marginTop: 16, width: '100%' }} hasTitle />
      <MySocialLoader style={{ marginTop: 75 }} />
      {/* <ActionListLoader style={{ marginTop: 16 }} hasLeftIcon /> */}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
