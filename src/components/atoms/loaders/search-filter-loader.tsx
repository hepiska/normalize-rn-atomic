import React, { useState } from 'react'
import { View, ViewStyle, Text } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'

interface LoaderPropsType {
  style?: ViewStyle
  disableFilter?: boolean
}

const SearchAndFilterLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  return (
    <View onLayout={_setLayout} style={props.style}>
      {layout && (
        <ContentLoader
          viewBox={`0 0 ${layout.width} 103`}
          height={103}
          width={layout.width}>
          <Rect x="" y="0" rx="8" ry="8" width={layout.width} height="42" />
          {!props.disableFilter && (
            <>
              <Rect x="" y="50" rx="8" ry="8" width={86} height="42" />
              <Rect x="102" y="50" rx="8" ry="8" width={86} height="42" />
              <Rect x="196" y="50" rx="8" ry="8" width={86} height="42" />
            </>
          )}
        </ContentLoader>
      )}
    </View>
  )
}
export default SearchAndFilterLoader
