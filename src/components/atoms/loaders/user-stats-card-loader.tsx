import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import CircleLoader from './cirle'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}

const UserStatsCardLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <View style={{ alignItems: 'flex-start', ...props.style }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CircleLoader r={40} />
        <View style={{ marginLeft: 16 }}>
          <LineLoader style={{ width: 172, height: 18 }} />
          <LineLoader style={{ width: 64, height: 14, marginTop: 8 }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <View style={{ width: 106, height: 52 }}>
          <LineLoader style={{ width: 44, height: 14, marginTop: 8 }} />
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ width: 12, height: 12, marginTop: 8 }} />
            <LineLoader
              style={{ width: 52, height: 12, marginTop: 8, marginLeft: 8 }}
            />
          </View>
        </View>
        <View style={{ width: 106, height: 52 }}>
          <LineLoader style={{ width: 44, height: 14, marginTop: 8 }} />
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ width: 12, height: 12, marginTop: 8 }} />
            <LineLoader
              style={{ width: 52, height: 12, marginTop: 8, marginLeft: 8 }}
            />
          </View>
        </View>
        <View style={{ width: 106, height: 52 }}>
          <LineLoader style={{ width: 44, height: 14, marginTop: 8 }} />
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ width: 12, height: 12, marginTop: 8 }} />
            <LineLoader
              style={{ width: 52, height: 12, marginTop: 8, marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <View style={{ width: 106, height: 52 }}>
          <LineLoader style={{ width: 44, height: 14, marginTop: 8 }} />
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ width: 12, height: 12, marginTop: 8 }} />
            <LineLoader
              style={{ width: 52, height: 12, marginTop: 8, marginLeft: 8 }}
            />
          </View>
        </View>
        <View style={{ width: 106, height: 52 }}>
          <LineLoader style={{ width: 44, height: 14, marginTop: 8 }} />
          <View style={{ flexDirection: 'row' }}>
            <LineLoader style={{ width: 12, height: 12, marginTop: 8 }} />
            <LineLoader
              style={{ width: 52, height: 12, marginTop: 8, marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
export default UserStatsCardLoader
