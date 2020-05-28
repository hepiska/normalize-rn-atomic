import React from 'react'
import { View, Text, SectionList, Dimensions } from 'react-native'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import Animated from 'react-native-reanimated'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productApi } from '@modules/product/action'
import { getProductSaved } from '@modules/product-saved/action'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'
import ActionTabMenu from '@components/molecules/action-tab-menu'
import { capitalEachWord } from '@utils/helpers'

import MansoryStickyHeader, {
  LayoutType,
} from '@src/components/layouts/list-sticky-header'
import SearchFilter from '@components/organisms/search-filter'

const ProductWithCardHoc = productListData(ProductCard)

const { Value, interpolate, Extrapolate } = Animated
const { width } = Dimensions.get('window')

class MyProfile extends React.Component<any, any> {
  constructor(props) {
    super(props)
    const initialActiveTab = 'userpost'

    this.state = {
      activeTab: initialActiveTab,
      selectedFilter: this._filterOptions(initialActiveTab),
    }
  }
  y = new Value(0)
  dimentionConstant = {
    imageHeight: 200,
  }
  limit = 20

  skip = 0
  lastskip = 0
  _numofColumn = 2

  componentDidMount() {
    this._freshfetch()
  }

  _fetchData = skip => {
    const params: any = {
      limit: this.limit,
      is_commerce: true,
      offset: skip * this.limit,
    }
    this.props.getProductSaved(params)
  }
  _freshfetch = async () => {
    try {
      this._fetchData(0)
      this.lastskip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }
  _groupData = data => {
    const groupData = []
    data.forEach((data, idx) => {
      const mod = idx % this._numofColumn
      if (groupData[mod]) {
        groupData[mod].push(data)
      } else {
        groupData[mod] = [data]
      }
    })
    return groupData
  }

  tabmenu = [
    {
      value: 'userpost',
      name: 'Posts',
    },
    {
      value: 'saved',
      name: 'Saved List',
    },
    {
      value: 'insight',
      name: 'Insight',
    },
  ]

  _filterOptions = (tab?: string) => {
    const { activeTab } = this.state || {}
    const { userPostStatus } = this.props
    const options = {
      userpost: [
        { value: 'all', name: 'All Posts' },
        ...userPostStatus.map(_data => ({
          value: _data,
          name: capitalEachWord(_data),
        })),
      ],
    }
    return options[tab || activeTab]
  }

  changeActiveTab = item => {
    this.setState(state => {
      const newState = { ...state }
      newState.activeTab = item.value
      newState.selectedFilter = this._filterOptions(item.value)
      return newState
    })
  }

  _renderItem = ({ item, index }) => {
    return (
      <ProductWithCardHoc
        style={{
          wrappermargin: 16,
          width: width / 2,
        }}
        productId={item}
        key={'producty ' + item + index}
      />
    )
  }

  header = () => {
    return (
      <View style={{ height: 200, backgroundColor: 'blue' }}>
        <Text>header</Text>
      </View>
    )
  }
  stickyHeader = () => {
    const { selectedFilter } = this.state

    const marginTop = interpolate(this.y, {
      inputRange: [
        this.dimentionConstant.imageHeight - 55,
        this.dimentionConstant.imageHeight,
      ],
      outputRange: [0, 55],
      extrapolate: Extrapolate.CLAMP,
    })

    return (
      <Animated.View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          marginTop,
        }}>
        <ActionTabMenu
          items={this.tabmenu}
          selecteditemValue={this.state.activeTab}
          onPress={this.changeActiveTab}
        />
        <SearchFilter
          style={{ marginVertical: 8 }}
          selectedFilter={
            selectedFilter?.length === this._filterOptions().length
              ? ['all']
              : selectedFilter
          }
          filterItems={this._filterOptions()}
        />
        {/* <View style={{ height: 40, backgroundColor: 'green' }} /> */}
      </Animated.View>
    )
  }

  render() {
    const { userPostStatus, productsSaved } = this.props
    return (
      <>
        <NavbarTopAnimated
          title={'name'}
          y={this.y}
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
        />
        <MansoryStickyHeader
          stickyHeader={this.stickyHeader}
          header={this.header}
          rowStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          y={this.y}
          layoutType={LayoutType.normal}
          data={productsSaved}
          renderItem={this._renderItem}
          numColumns={2}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    productsSaved: state.productsSaved.order,
    userPostStatus: state.userPosts.status,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ productApi, getProductSaved }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)

// export default MyProfile
