import React, { useState } from 'react'
import { ViewStyle, SafeAreaView } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import { Rect } from 'react-native-svg'
import { shimmerLoader } from '@utils/constants'

interface LoaderPropsType {
  style?: ViewStyle
}

const FormLoader = (props: LoaderPropsType) => {
  const [layout, setLayout] = useState(null)

  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return (
    <SafeAreaView
      style={{ alignItems: 'center', ...props.style }}
      onLayout={_setLayout}>
      {layout && (
        <>
          <ContentLoader
            {...shimmerLoader}
            viewBox={`0 0 ${layout.width} 400`}
            height={400}
            width={layout.width}>
            <Rect x="0" y="0" rx="8" ry="8" width={140} height={10} />
            <Rect x="0" y="20" rx="8" ry="8" width={layout.width} height={30} />
            <Rect x="0" y="70" rx="8" ry="8" width={140} height={10} />
            <Rect x="0" y="90" rx="8" ry="8" width={layout.width} height={30} />
            <Rect x="0" y="140" rx="8" ry="8" width={140} height={10} />
            <Rect
              x="0"
              y="160"
              rx="8"
              ry="8"
              width={layout.width}
              height={30}
            />
          </ContentLoader>
        </>
      )}
    </SafeAreaView>
  )
}
export default FormLoader
