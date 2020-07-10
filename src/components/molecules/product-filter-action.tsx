import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Button, GradientButton } from '@components/atoms/button'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@utils/constants'
import { formatCur } from '@utils/helpers'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  bottomSheetHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  redFont: {
    color: colors.red2,
    fontWeight: 'bold',
  },
  whiteFont: {
    color: 'white',
  },
  largeButton: { flex: 1, display: 'flex' },
  buttonStyle: {
    marginHorizontal: 16,
  },
  absoluteBottom: {
    position: 'absolute',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.black50,
    bottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 16,
    width,
    flexDirection: 'row',
    height: 72,
    left: 0,
  },
  tab: {
    paddingHorizontal: 16,
  },
})

const ProductFilterAction = ({
  count,
  style,
  isLoading,
  selectedFilter,
  fetchCountProduct,
  searchKey,
  clearFilter,
  applyFilter,
}: any) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (fetchCountProduct) {
      fetchCountProduct({ ...selectedFilter, query: searchKey })
    }
  }, [
    selectedFilter.brand_ids,
    selectedFilter.color_ids,
    selectedFilter.maximum_price,
    selectedFilter.minimum_price,
    selectedFilter.category_ids,
  ])

  const _applyFilter = () => {
    applyFilter()
    navigation.goBack()
  }

  return (
    <View style={[styles.absoluteBottom, style]}>
      <Button
        style={styles.buttonStyle}
        title="Clear All"
        onPress={() => clearFilter()}
        fontStyle={styles.redFont}
      />
      <GradientButton
        title={isLoading ? '...' : `Show ${formatCur(count)} Products`}
        disabled={isLoading || !count}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ ...styles.largeButton, ...styles.buttonStyle }}
        colors={['#3067E4', '#8131E2']}
        fontStyle={styles.whiteFont}
        onPress={_applyFilter}
      />
    </View>
  )
}

export default ProductFilterAction
