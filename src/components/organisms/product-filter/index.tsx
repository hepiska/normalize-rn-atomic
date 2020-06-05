import React, { Component, useState, memo, useRef, useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome'
import BottomSheet from 'reanimated-bottom-sheet'
import { colors } from '@utils/constants'
import { changeValue } from '@modules/product-filter/action'
import FilterPriceOrg from '@src/components/organisms/filter-price'
import FilterCategoryOrg from '@src/components/organisms/filter-category'
import FilterBrandOrg from '@src/components/organisms/filter-brand'
import ProductFilterAction from '@components/molecules/product-filter-action'
import SortOrg from '@components/organisms/sort-organism'

import TabMenu from '@src/components/layouts/tab-menu'

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  bottomSheetHeader: {
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tab: {
    paddingHorizontal: 16,
  },
})

const TabMenuData = [
  {
    name: 'category',
    title: 'Category',
    Component: <FilterCategoryOrg key="category" />,
  },
  {
    name: 'brand',
    title: 'Brand',
    Component: <FilterBrandOrg key="brand" />,
  },
  {
    name: 'price',
    title: 'Price',
    Component: <FilterPriceOrg key="price" />,
  },
]

const mapStateToProps = (state: any) => ({ ...state.productFilter })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeValue,
    },
    dispatch,
  )

const FilterContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  return (
    <Div
      _width="100%"
      _background="white"
      _height="100%"
      _padding="0px 16px 80px"
      justify="flex-start">
      <TabMenu
        style={{ width }}
        items={TabMenuData}
        selectedItem={props.section}
        onChangeTab={selectedItem => {
          props.changeValue({ key: 'section', value: selectedItem.name })
        }}
      />
      <ProductFilterAction />
    </Div>
  )
})

const Header = props => {
  const text = props.section === 'sort' ? 'Sort Results By' : 'Filters'
  return (
    <Div _background="white" _padding="16px" style={styles.bottomSheetHeader}>
      <Div
        _width="40px"
        _height="4px"
        _background={colors.black90}
        radius="2"
      />
      <Div
        _direction="row"
        _width="100%"
        _padding="16px 0px"
        justify="space-between">
        {props.section !== 'sort' && (
          <TouchableOpacity onPress={props.onBack}>
            <Icon name="chevron-left" size={16} color={colors.black100} />
          </TouchableOpacity>
        )}

        <Div _flex="1">
          <Font
            style={{
              fontSize: 18,
              color: colors.black100,
              fontWeight: 'bold',
              transform: [{ translateX: -8 }],
            }}>
            {text}
          </Font>
        </Div>
      </Div>
    </Div>
  )
}

const FilterBottomSheet = props => {
  const [finishAnimation, setFinishAnimation] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinishAnimation(true)
    })
  }, [])

  const { isOpen, section } = props

  const _snapPoint =
    section !== 'sort'
      ? [height * 0.8, height * 0.5, 0]
      : [Math.max(360, height * 0.5), 0]

  return (
    <>
      {finishAnimation && (
        <BottomSheet
          onCloseEnd={() => props.navigation.goBack()}
          initialSnap={0}
          enabledContentGestureInteraction={false}
          renderHeader={() => (
            <Header
              onBack={() => props.navigation.goBack()}
              section={section}
            />
          )}
          snapPoints={_snapPoint}
          renderContent={() =>
            section === 'sort' ? <SortOrg /> : <FilterContent />
          }
        />
      )}

      {/* <RBSheet ref={refRBSheet}>
        <FilterContent />
      </RBSheet> */}

      <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
        <Div bg="rgba(0,0,0,0.7)" _height={height} _width="100%" />
      </TouchableWithoutFeedback>
    </>
  )
}

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(FilterBottomSheet),
)
