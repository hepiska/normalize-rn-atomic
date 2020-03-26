import React, { Component, useState, memo } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'
import { Button, OutlineButton, GradientButton } from '@components/atoms/button'
import BottomSheet from 'reanimated-bottom-sheet'
import { colors } from '@utils/constants'
import { useNavigation } from '@react-navigation/native'
import { changeValue } from '@modules/product-filter/action'
import FilterPriceOrg from '@src/components/organisms/filter-price'
import FilterCategoryOrg from '@src/components/organisms/filter-category'
import FilterBrandOrg from '@src/components/organisms/filter-brand'
import ProductFilterAction from '@components/molecules/product-filter-action'
import SortOrg from '@components/organisms/sort-organism'

import TabMenu from '@src/components/layouts/tab-menu'

const { height } = Dimensions.get('screen')

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
          <Icon
            name="chevron-left"
            onPress={props.onBack}
            size={16}
            color={colors.black100}
          />
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
  const { isOpen, section } = props
  const _snapPoint = [height * 0.8, height * 0.5, 0]
  return (
    <Modal transparent visible={isOpen}>
      <BottomSheet
        onCloseEnd={() => props.changeValue({ key: 'isOpen', value: false })}
        initialSnap={0}
        renderHeader={() => (
          <Header
            onBack={() => props.changeValue({ key: 'isOpen', value: false })}
            section={section}
          />
        )}
        snapPoints={_snapPoint}
        renderContent={() =>
          section === 'sort' ? <SortOrg /> : <FilterContent />
        }
      />
      <TouchableWithoutFeedback
        onPress={() => props.changeValue({ key: 'isOpen', value: false })}>
        <Div bg="rgba(0,0,0,0.7)" _height={height} _width="100%" />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(FilterBottomSheet),
)
