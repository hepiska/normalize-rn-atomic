import React, { useEffect, useMemo, useCallback } from 'react'
import { View, Text } from 'react-native'
import List from '@components/layouts/list-header'
import FilterListLoader from '@components/atoms/loaders/filter-list'

import SelectAbleItem, {
  SelectorShapeType,
} from '@src/components/molecules/selectable-item'

const FilterColor = (props: any) => {
  useEffect(() => {
    if (props.getProductColor) {
      props.getProductColor({ limit: 100 })
    }
  }, [])
  const _selecColor = useCallback(item => {
    props.changeSelectedColor(item.id)
  }, [])
  const _renderitem = useMemo(
    () => ({ item }) => {
      return (
        <SelectAbleItem
          waiting
          key={item.id}
          onPress={_selecColor}
          item={{ ...item, name: item.label }}
        />
      )
    },
    [],
  )

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {props.loading ? (
        <FilterListLoader />
      ) : (
        <List
          style={{ paddingHorizontal: 16 }}
          data={props.colors || []}
          renderItem={_renderitem}
          type="list"
        />
      )}
    </View>
  )
}
export default FilterColor
