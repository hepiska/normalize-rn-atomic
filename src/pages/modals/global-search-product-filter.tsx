import React, { Component, useState, memo, useRef, useEffect } from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  View,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font } from '@components/atoms/basic'
import Icon from 'react-native-vector-icons/FontAwesome'
import BottomSheet from 'reanimated-bottom-sheet'
import { colors } from '@utils/constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabMenuCursor from '@src/components/molecules/tab-menu-cursor'
import { changeValue } from '@modules/product-filter/action'
import FilterPriceOrg from '@src/components/organisms/filter-price'
import FilterCategoryOrg from '@src/components/organisms/filter-category'
import FilterBrandOrg from '@src/components/organisms/filter-brand-global-search'
import ProductFilterAction from '@components/molecules/product-filter-action'
import FilterColor from '@components/organisms/filter-color'
import {
  globalSearchCategoriesData,
  globalSearchFilterPriceData,
  globalSearchActionData,
  globalSearchFilterColorData,
} from '@hocs/data/filter'

const { height, width } = Dimensions.get('screen')

const CategoryFilter = globalSearchCategoriesData(FilterCategoryOrg)
const PriceFilterWithData = globalSearchFilterPriceData(FilterPriceOrg)
const ProductFilterWithData = globalSearchActionData(ProductFilterAction)
const FilterColorWithData = globalSearchFilterColorData(FilterColor)

const Tab = createMaterialTopTabNavigator()

const styles = StyleSheet.create({
  bottomSheetHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    padding: 16,
  },

  tab: {
    paddingHorizontal: 16,
  },
})

const Header = props => {
  const text = 'Filters'
  return (
    <View style={styles.bottomSheetHeader}>
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
        <TouchableOpacity onPress={props.onBack}>
          <Icon name="chevron-left" size={16} color={colors.black100} />
        </TouchableOpacity>
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
    </View>
  )
}

const snapPoints = [Math.ceil(height * 0.92), Math.max(360, height * 0.5), 0]
const totalheaderheight = 90

class ProductFilterBottomSheet extends React.Component<any, any> {
  state = {
    finishAnimation: false,
  }
  bottomSheet = null
  timeOut = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
    setTimeout(() => {
      this.bottomSheet.snapTo(0)
    }, 300)
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
  }

  _onBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  renderContentBottomSheet = () => {
    const { route } = this.props
    const { finishAnimation } = this.state
    if (!finishAnimation) {
      return null
    }

    return (
      <View
        style={{
          height: snapPoints[0],
          width,
          paddingBottom: totalheaderheight + 72,
          backgroundColor: 'white',
        }}>
        <Tab.Navigator
          initialRouteName={route.params?.section}
          lazy
          tabBar={props => <TabMenuCursor {...props} />}>
          <Tab.Screen name="colors" component={FilterColorWithData} />
          <Tab.Screen name="Brand" component={FilterBrandOrg} />
          <Tab.Screen name="Category" component={CategoryFilter} />
          <Tab.Screen name="Price" component={PriceFilterWithData} />
        </Tab.Navigator>
        <ProductFilterWithData style={{ bottom: totalheaderheight }} />
      </View>
    )
  }

  render() {
    return (
      <View style={{ height }}>
        <BottomSheet
          onCloseEnd={this._onBack}
          ref={ref => {
            this.bottomSheet = ref
          }}
          initialSnap={2}
          springConfig={{
            stiffness: 500,
            damping: 500,
            mass: 3,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.1,
          }}
          enabledBottomInitialAnimation={true}
          enabledBottomClamp={true}
          enabledContentGestureInteraction={false}
          renderHeader={() => <Header onBack={this._onBack} />}
          snapPoints={snapPoints}
          renderContent={this.renderContentBottomSheet}
        />

        <TouchableWithoutFeedback onPress={this._onBack}>
          <Div bg="rgba(0,0,0,0.7)" _height={height} _width="100%" />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProductFilterBottomSheet
