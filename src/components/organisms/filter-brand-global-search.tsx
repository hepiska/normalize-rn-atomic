import React, {
  Component,
  useState,
  memo,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import { Dimensions, StyleSheet, SectionList, View, Text } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import Field from '@components/atoms/field'
import FilterListLoader from '@components/atoms/loaders/filter-list'
import { connect, batch, useDispatch } from 'react-redux'
import { colors } from '@utils/constants'
import {
  getProductBrand,
  changeSelectedBrand,
} from '@modules/global-search-product-filter/action'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AlvabetSelectorMol from '@components/molecules/alvabet-selector'
import {
  getBrands,
  getGlobalSearchBrandOrder,
  makeGetGroupBrandSelector,
} from '@modules/global-search-product-filter/selector'
import FilterBrandItem from '@src/components/molecules/selectable-item'
import { fontStyle } from '../commont-styles'
import { deepClone } from '@src/utils/helpers'
import { dispatch } from '@src/root-navigation'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 16,
  },

  container: {
    backgroundColor: 'white',
    paddingTop: 8,
    flex: 1,
  },
})

let skip = 0
const limit = 20
let timer = null
const useBrandFilter = (props: any) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const _onChangeAlvabet = useCallback(e => {
    if (e === '#') setFilter('')
    else setFilter(e)
  }, [])

  const _fetchData = skip => {
    dispatch(
      getProductBrand({
        offset: skip * limit,
        limit,
        keyword: search || filter,
      }),
    )
  }

  const _changeSelected = useCallback(item => {
    dispatch(changeSelectedBrand(item.id))
  }, [])

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      skip = 0
      _fetchData(0)
    }, 300)
  }, [search, filter])

  const _fetchMore = useCallback(() => {
    skip = skip + 1
    if (!props.loading) {
      _fetchData(skip)
    }
  }, [search, filter])

  const _onSearchChange = useCallback(e => {
    setSearch(() => e)
  }, [])

  return [
    { search, filter, availableAlfabet },
    { _onSearchChange, _onChangeAlvabet, _fetchMore, _changeSelected },
  ]
}

const availableAlfabet = ''

const GlobalSearchFilterBrand = (props: any) => {
  const [
    { search },
    { _onChangeAlvabet, _onSearchChange, _fetchMore, _changeSelected },
  ] = useBrandFilter(props)

  const _renderItem = useMemo(
    () => ({ item }) => {
      return (
        <FilterBrandItem
          waiting
          key={'key-brand' + item.id}
          fontStyle={fontStyle.helvetica}
          onPress={_changeSelected}
          isSelected={props.selectedBrand.includes(item.id)}
          item={item}
        />
      )
    },
    [props.selectedBrand],
  )
  const firstLoading = props.loading && skip < 1

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={{ height: 36 }}>
          <Field
            style={{ width: '100%' }}
            value={search}
            placeholder="Search Brand..."
            onChangeText={_onSearchChange}
            leftIcon={
              <Icon
                style={{ marginRight: 8 }}
                name="search"
                color={colors.black90}
              />
            }
          />
        </View>
        <AlvabetSelectorMol
          onSelect={_onChangeAlvabet}
          available={availableAlfabet}
        />
      </View>
      {firstLoading ? (
        <FilterListLoader />
      ) : (
        <SectionList
          style={{ paddingHorizontal: 16 }}
          onEndReached={_fetchMore}
          onEndReachedThreshold={0.9}
          stickySectionHeadersEnabled
          renderSectionHeader={({ section: { title } }) => (
            <Div _width="100%" bg="white" padd="8px 0px" align="flex-start">
              <Font _padding="16px 0px 0px" style={fontStyle.helvetica}>
                {title}
              </Font>
            </Div>
          )}
          sections={props.brands}
          renderItem={_renderItem}
        />
      )}
    </View>
  )
}

const memoizeFilterOrg = memo(
  GlobalSearchFilterBrand,
  (currentProp, nextProp) => {
    if (currentProp.brands.length !== nextProp.brands.length) {
      return false
    }

    if (currentProp.selectedBrand !== nextProp.selectedBrand) {
      return false
    }

    return true
  },
)

const mapStateToProps = () => {
  const getfilterbrands = makeGetGroupBrandSelector(
    getGlobalSearchBrandOrder,
    getBrands,
  )
  return state => ({
    brands: getfilterbrands(state),
    loading: state.globalSearchProductFilter.loading,
    selectedPrice: state.globalSearchProductFilter.selected.price,
    selectedBrand: state.globalSearchProductFilter.selected.brand_ids || '',
    selectedCategory:
      state.globalSearchProductFilter.selected.category_ids || '',
  })
}

export default connect(mapStateToProps, null)(memoizeFilterOrg)
