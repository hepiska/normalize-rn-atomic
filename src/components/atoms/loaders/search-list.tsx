import React, { useState } from 'react'
import { View, ViewStyle, SafeAreaView } from 'react-native'
import SearchFilterLoader from './search-filter-loader'
import TwoColumnListLoader from './two-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const SearchListLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <SearchFilterLoader style={{ marginTop: 16 }} disableFilter />
      <TwoColumnListLoader />
    </SafeAreaView>
  )
}
export default SearchListLoader
