import React, { useState } from 'react'
import { ViewStyle, SafeAreaView, View } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import LineLoader from '@components/atoms/loaders/line'

interface LoaderPropsType {
  style?: ViewStyle
  type?: string
}

const AddressDetailLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...props.style }} onLayout={_setLayout}>
      {layout && (
        <>
          <View style={{ flexDirection: 'row', marginTop: 24 }}>
            <LineLoader style={{ height: 144, width: 108 }} />
            <View style={{ marginLeft: 16 }}>
              <LineLoader style={{ height: 16, width: 48 }} />
              <LineLoader style={{ height: 14, width: 190, marginTop: 8 }} />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 32, marginBottom: 16 }}>
            <LineLoader style={{ height: 18, width: 43 }} />
            <LineLoader style={{ height: 14, width: 70, marginLeft: 8 }} />
          </View>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 50`}
            height={50}
            width={layout.width}>
            <Circle r="20" cx="20" cy={20} />
            <Circle r="20" cx="70" cy={20} />
            <Circle r="20" cx="120" cy={20} />
            <Circle r="20" cx="170" cy={20} />
          </ContentLoader>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 450,
            }}>
            <View>
              <LineLoader style={{ width: 74, height: 12 }} />
              <LineLoader style={{ width: 95, height: 18, marginTop: 8 }} />
            </View>
            <LineLoader style={{ width: 156, height: 46 }} />
          </View>
        </>
      )}
    </SafeAreaView>
  )
}
export default AddressDetailLoader
