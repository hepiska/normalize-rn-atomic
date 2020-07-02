import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'
import LineLoader from './line'

interface LoaderPropsType {
  style?: ViewStyle
}

const ArticleLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView
      style={{ alignItems: 'flex-start', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <LineLoader style={{ width: 280, height: 18, marginTop: 52 }} />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 20 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
          <LineLoader
            style={{ width: layout.width, height: 18, marginTop: 8 }}
          />
        </>
      )}
    </SafeAreaView>
  )
}
export default ArticleLoader
