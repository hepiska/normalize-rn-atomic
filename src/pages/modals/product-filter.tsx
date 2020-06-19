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
import FilterBrandOrg from '@src/components/organisms/filter-brand'
import ProductFilterAction from '@components/molecules/product-filter-action'

const { height, width } = Dimensions.get('screen')

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

const snapPoints = [height * 0.98, Math.max(360, height * 0.5), 3]
const totalheaderheight = 140

class ProductFilterBottomSheet extends React.Component<any, any> {
  state = {
    finishAnimation: false,
  }
  bottomSheet = null

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  _onBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  renderContentBottomSheet = () => {
    const { route } = this.props

    return (
      <View
        style={{
          height: snapPoints[0],
          width,
          paddingBottom: totalheaderheight + 72,
          backgroundColor: 'white',
        }}>
        <Tab.Navigator
          initialRouteName={route.params.section}
          lazy
          tabBar={props => <TabMenuCursor {...props} />}>
          <Tab.Screen name="Category" component={FilterCategoryOrg} />
          <Tab.Screen name="Brand" component={FilterBrandOrg} />
          <Tab.Screen name="Price" component={FilterPriceOrg} />
        </Tab.Navigator>
        <ProductFilterAction style={{ bottom: totalheaderheight }} />
      </View>
    )
  }

  render() {
    const { finishAnimation } = this.state

    return (
      <SafeAreaView>
        {finishAnimation ? (
          <BottomSheet
            onCloseEnd={this._onBack}
            ref={ref => (this.bottomSheet = ref)}
            enabledBottomInitialAnimation={true}
            initialSnap={0}
            enabledBottomClamp={true}
            enabledContentGestureInteraction={false}
            renderHeader={() => <Header onBack={this._onBack} />}
            snapPoints={snapPoints}
            renderContent={this.renderContentBottomSheet}
          />
        ) : null}

        <TouchableWithoutFeedback onPress={this._onBack}>
          <Div bg="rgba(0,0,0,0.7)" _height={height} _width="100%" />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}

export default ProductFilterBottomSheet
