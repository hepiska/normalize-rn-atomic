import React, { Component } from 'react'
import { View, SafeAreaView, InteractionManager } from 'react-native'
import { connect, batch } from 'react-redux'
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
import {
  setSearchKey,
  setActiveTab,
  setSkip,
} from '@modules/global-search-ui/action'
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeTab === this.props.activeTab &&
      prevProps.skip[prevProps.activeTab] !==
        this.props.skip[prevProps.activeTab]
    ) {
      this._fetchData(this.props.skip[prevProps.activeTab])
    }
  }

  onChangeTab = async activeTab => {
    const newSkip = { ...this.props.skip }
    const { searchKey, setSkip } = this.props

    if (!newSkip[activeTab]) {
      newSkip[activeTab] = 0
    }

    await batch(() => {
      this.props.setActiveTab(activeTab)
      this.props.setSkip(newSkip)
    })

    if (searchKey.length > 2) {
      this._fetchData(newSkip[activeTab] || 0)
    }
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
    const newSkip = { ...this.props.skip }
    const { activeTab, searchKey, setSkip } = this.props

    this.props.setSearchKey(text)
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (searchKey.length > 2) {
        newSkip[activeTab] = 0
        batch(() => {
          this._fetchData(this.skip[activeTab] || 0)

          setSkip(newSkip)
        })
      }
    }, 600)
  }

  _fetchData = skip => {
    const { searchKey, activeTab } = this.props
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

  render() {
    const { finishAnimation } = this.state
    const { searchKey, skip } = this.props

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
                return (
                  <TabMenuCursor
                    {...props}
                    // style={{ paddingHorizontal: 0 }}
                    onChangeTab={this.onChangeTab}
                  />
                )
              }}>
              <Tab.Screen name="Product" component={SearchProductResult} />
              <Tab.Screen name="Brand" component={SearchBrandResult} />
              <Tab.Screen name="User" component={SearchUserResult} />
              <Tab.Screen name="Post" component={SearchPostResult} />
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
      setSearchKey,
      setActiveTab,
      setSkip,
    },
    dispatch,
  )
const mapStateToProps = state => {
  return {
    searchKey: state.globalSearchUi.searchKey,
    skip: state.globalSearchUi.skip,
    activeTab: state.globalSearchUi.activeTab,
    isTagSearch: state.searchPost.isTagSearch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
