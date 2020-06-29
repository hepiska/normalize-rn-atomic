import React, { Component } from 'react'
import { View, SafeAreaView, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Field from '@components/atoms/field'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DiscoverTab from '@src/components/molecules/tab-menu-chip'
import TabMenuCursor from '@components/molecules/tab-menu-cursor'
import SearchProductResult from '@src/components/organisms/search-product-result'
import SearchBrandResult from '@src/components/organisms/search-brand-result'
import SearchUserResult from '@src/components/organisms/search-user-result'
import SearchPostResult from '@src/components/organisms/search-post-result'
import SearchListLoader from '@src/components/atoms/loaders/search-list'
import {
  getSearchPost,
  getSearchTag,
  getPostByTag,
} from '@src/modules/search-post/action'
import { getSearchBrand } from '@modules/search-brand/action'
import { getSearchUser } from '@modules/search-user/action'
import { getSearchProduct } from '@modules/search-product/action'

const Tab = createMaterialTopTabNavigator()

class SearchList extends Component<any, any> {
  state = {
    searchKey: '',
    finishAnimation: false,
    activeTab: 0,
  }

  timer = null
  skip = {}
  startSearch = true
  limit = 10

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  onChangeTab = activeTab => {
    this.limit = 10
    this.skip[activeTab] = 0
    this.setState(
      {
        activeTab: activeTab,
      },
      () => {
        if (this.state.searchKey.length > 2) {
          this._fetchData(this.skip[this.state.activeTab] || 0)
        }
      },
    )
  }

  resetSkip = activeTab => {
    this.skip[activeTab] = 0
  }

  _onBack = async () => {
    const { navigation } = this.props
    // if (onBeforeBack) {
    //   await onBeforeBack()
    // }
    if (navigation.canGoBack) {
      navigation.goBack()
    }
  }

  onSearchChange = text => {
    this.setState({ searchKey: text })
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (this.state.searchKey.length > 2) {
        this.skip[this.state.activeTab] = 0
        this._fetchData(this.skip[this.state.activeTab] || 0)

        this.startSearch = true
      }
    }, 600)
  }

  _fetchData = skip => {
    const { searchKey, activeTab } = this.state
    const { isTagSearch } = this.props
    const params = {
      query: searchKey,
      limit: this.limit,
      offset: this.limit * skip,
    }

    if (activeTab === 0) {
      this.props.getSearchProduct(params)
    }
    if (activeTab === 1) {
      this.props.getSearchBrand(params)
    }
    if (activeTab === 3) {
      if (!isTagSearch) {
        this.props.getSearchTag()
        this.props.getSearchPost(params)
      } else {
        let _params = {
          tag: searchKey.substr(1),
          limit: this.limit,
          offset: this.limit * skip,
        }
        this.props.getPostByTag(_params)
      }
    }

    if (activeTab === 2) {
      this.props.getSearchUser(params)
    }
  }

  fetchMore = () => {
    const newSkip = this.skip[this.state.activeTab] + 1
    this._fetchData(newSkip)
    this.skip[this.state.activeTab] = newSkip
  }

  removeSearch = () => {
    this.setState({ searchKey: '' })
  }

  renderScreen = type => () => {
    const { searchKey } = this.state

    switch (type) {
      case 'product':
        return (
          <SearchProductResult
            searchKey={searchKey}
            skip={this.skip['0']}
            fetchMore={this.fetchMore}
          />
        )
      case 'brand':
        return (
          <SearchBrandResult
            searchKey={searchKey}
            skip={this.skip['1']}
            fetchMore={this.fetchMore}
          />
        )
      case 'user':
        return (
          <SearchUserResult
            searchKey={searchKey}
            skip={this.skip['2']}
            fetchMore={this.fetchMore}
          />
        )
      case 'post':
        return (
          <SearchPostResult
            searchKey={searchKey}
            skip={this.skip['3']}
            fetchMore={this.fetchMore}
            onSearchChange={this.onSearchChange}
            resetSkip={this.resetSkip}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { searchKey, finishAnimation } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {finishAnimation ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 56,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                onPress={this._onBack}
                style={{
                  height: '100%',
                  width: 36,
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 7,
                  marginRight: 12,
                  marginVertical: 12,
                }}>
                <Field
                  value={searchKey}
                  placeholder={'Search...'}
                  onChangeText={this.onSearchChange}
                  leftIcon={
                    <Icon
                      style={{ marginRight: 8 }}
                      name="search"
                      color={colors.black90}
                    />
                  }
                  rightIcon={
                    <Icon
                      style={{ marginLeft: 8 }}
                      name="close"
                      color={colors.black90}
                      onPress={this.removeSearch}
                    />
                  }
                />
              </View>
            </View>
            <Tab.Navigator
              tabBar={props => {
                // this.setState({
                //   activeTab: props.state.index,
                // })
                return (
                  <TabMenuCursor
                    {...props}
                    // style={{ paddingHorizontal: 0 }}
                    onChangeTab={this.onChangeTab}
                  />
                )
              }}>
              <Tab.Screen
                name="Product"
                component={this.renderScreen('product')}
              />
              <Tab.Screen name="Brand" component={this.renderScreen('brand')} />
              <Tab.Screen name="User" component={this.renderScreen('user')} />
              <Tab.Screen name="Post" component={this.renderScreen('post')} />
            </Tab.Navigator>
          </>
        ) : (
          <SearchListLoader style={{ margin: 16 }} />
        )}
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchPost,
      getSearchTag,
      getSearchBrand,
      getSearchProduct,
      getSearchUser,
      getPostByTag,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    isTagSearch: state.searchPost.isTagSearch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
