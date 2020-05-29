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
import NavbarTop from '@components/molecules/navbar-top'
import ListInterest from '@src/components/layouts/list-interest'
import {
  oily,
  normal,
  dry,
  combination,
  sensitive,
  allType,
} from '@src/utils/image-skin'
import TotalCommisionCard from '@components/molecules/total-commision-card'
import TransactionHistoryCard from '@components/molecules/transaction-history-card'

import MansoryStickyHeader, {
  LayoutType,
} from '@src/components/layouts/list-header'
import SearchFilter from '@components/organisms/search-filter'
import TitleDescriptionCard from '@src/components/molecules/title-description-card'
import { fontStyle } from '@src/components/commont-styles'

const ProductWithCardHoc = productListData(ProductCard)

const { Value, interpolate, Extrapolate } = Animated
const { width } = Dimensions.get('window')

const dummy = [
  {
    id: 1,
    title: 'oily',
    image: oily,
  },
  {
    id: 2,
    title: 'bam',
    image: normal,
  },
  {
    id: 3,
    title: 'dum',
    image: dry,
  },
  {
    id: 4,
    title: 'nih',
    image: combination,
  },
  {
    id: 5,
    title: 'bam',
    image: sensitive,
  },
  {
    id: 6,
    title: 'dum',
    image: allType,
  },
  {
    id: 7,
    title: 'nah',
    image: oily,
  },
]

class MyProfile extends React.Component<any, any> {
  constructor(props) {
    super(props)
    const initialActiveTab = 'userpost'

    this.state = {
      activeTab: initialActiveTab,
      selectedFilter: this._filterOptions(initialActiveTab),
      selectedInterest: [{ id: 7 }, { id: 5 }],
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
    // return null
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
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
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
      </View>
    )
  }

  handleSelectedInterest = id => {
    const isSelected = this.state.selectedInterest.find(
      value => value.id === id,
    )
    let newSelected
    if (isSelected) {
      newSelected = this.state.selectedInterest.filter(value => value.id !== id)
    } else {
      newSelected = [...this.state.selectedInterest, { id: id }]
    }
    this.setState({
      selectedInterest: newSelected,
    })
  }

  render() {
    const { userPostStatus, productsSaved } = this.props

    console.log('selectedInterest ---', this.state.selectedInterest)

    return (
      <>
        <NavbarTop title={'name'} />
        {/* <ListInterest
          data={dummy}
          handleSelected={this.handleSelectedInterest}
          selected={this.state.selectedInterest}
        /> */}
        <TitleDescriptionCard
          title="What is score?"
          description="Score is loyalty program.. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        />
        <TotalCommisionCard />
        <TransactionHistoryCard index={0} />
        <TransactionHistoryCard index={1} />
        <TransactionHistoryCard index={2} />
        <TransactionHistoryCard type="more" data={dummy} />

        {/* <MansoryStickyHeader
          header={this.header}
          rowStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          y={this.y}
          layoutType={LayoutType.mansory}
          data={productsSaved}
          renderItem={this._renderItem}
          numColumns={2}
        /> */}
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
