import React from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import TwoColumnListLoader from './two-column-card'

interface LoaderPropsType {
  style?: ViewStyle
}

const SearchPostLoader = (props: LoaderPropsType) => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <TwoColumnListLoader />
    </SafeAreaView>
  )
}
export default SearchPostLoader
