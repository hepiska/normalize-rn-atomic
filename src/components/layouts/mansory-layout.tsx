import React from 'react'
import { View, Text } from 'react-native'

const reshapeData = (data, numColumns = 2) => {
  if (!data.length) return data
  const newData = []
  data.forEach((_dat, idx) => {
    const mod = idx % numColumns
    if (newData[mod]) {
      newData[mod].push(_dat)
    } else {
      newData[mod] = [_dat]
    }
  })
  return newData
}

const MansoryLayout = ({ data, numColumns, renderItem, style }: any) => {
  const newData = reshapeData(data, numColumns)
  return (
    <View style={{ ...style, flex: 1, width: '100%', flexDirection: 'row' }}>
      {newData.map((_data, idx) => {
        return (
          <View key={'col' + idx} style={{ flex: 1 }}>
            {_data.map((_da, idx) => {
              return <View key={'row' + idx}>{renderItem(_da)}</View>
            })}
          </View>
        )
      })}
    </View>
  )
}
export default MansoryLayout
