import React, { Component } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import {
  helveticaBlackBold,
  helveticaNormalFont,
} from '@components/commont-styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Amplitude from 'amplitude-js'
import BrandCard from '@components/molecules/brand-card'
import FilterTriger from '@components/organisms/brand-filter-buttons'
import {
  brandApi,
  changeSearch,
  clearSearch,
  resetBrand,
} from '@modules/brand/action'
import { brandListData } from '@hocs/data/brand'
import ThreeColumnListLoader from '@src/components/atoms/loaders/three-column-card-small'

const { width } = Dimensions.get('window')

const BrandHoc = brandListData(BrandCard)

class BrandList extends Component<any, any> {
  state = {
    skip: 0,
    headerName: 'Brand',
  }

  limit = 18
  skip = 0
  lastSkip = 0

  componentDidMount() {
    this._freshfetch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      this._freshfetch()
      return ''
    }
  }

  componentWillUnmount() {
    Amplitude.getInstance().logEvent('brand')

    this.props.clearSearch()
    this.props.resetBrand()
  }

  _freshfetch = async () => {
    try {
      this._fetchData(0)
      this.lastSkip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastSkip) {
        this.skip = newskip
        this.lastSkip = newskip
      }
      if (this.props.loading) {
        return
      }
      this._fetchData(this.skip)
    }
  }

  _fetchData = skip => {
    const { search, sort } = this.props
    const params: any = {
      limit: this.limit,
      offset: skip * this.limit,
      sort_by: 'date',
      sort_direction: 'desc',
      // ...sort.value,
      // ...appliedFilters,
    }

    if (search) {
      params.keyword = search
      Amplitude.getInstance().logEvent('search-brand', {
        keyword: search,
      })
    }
    this.props.brandApi(params)
  }

  _keyExtractor = (item, index) => '' + item + index

  _renderHeader = () => (
    <>
      <FilterTriger style={{ paddingHorizontal: 16 }} />
    </>
  )

  _renderItem = ({ item }) => {
    const _data = item.data
    const numColumns = 3
    return (
      <Div
        _width={width}
        _direction="row"
        align="flex-start"
        justify="flex-start"
        style={{ flexWrap: 'wrap' }}>
        {_data.map((v, key) => (
          <Div key={key} _width="33%" _height={150}>
            <BrandHoc
              idx={key}
              brandId={v}
              key={'' + v + key}
              imageOnly
              style={{
                flex: 1,
                wrappermargin: 4,
                width: width / numColumns - 8,
                paddingHorizontal: 0,
                marginLeft: 8,
                marginRight: 8,
              }}
            />
          </Div>
        ))}
      </Div>
    )
  }

  _renderFooter = () => {
    const { loading } = this.props

    return (
      <View style={{ height: 200 }}>
        {loading && this.skip !== 0 && <ThreeColumnListLoader />}
      </View>
    )
  }
  render() {
    const { headerName } = this.state
    const { brands, search, pagination, loading } = this.props
    const flatlistData = [
      {
        title: 'brands',
        data: brands,
      },
    ]

    const leftContent = ['back']

    // const rightContent = ['shop', 'notification', 'search']

    return (
      <>
        <NavbarTop
          leftContent={leftContent}
          // rightContent={rightContent}
          title={headerName}
          subtitle={`${pagination.total || 0} Items`}
        />

        <Div _width="100%" _flex="1" justify="flex-start">
          {this._renderHeader()}
          <FlatList
            onEndReached={this._fetchMore}
            refreshing={loading}
            onRefresh={this._freshfetch}
            onEndReachedThreshold={0.97}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment="center"
            data={flatlistData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            scrollIndicatorInsets={{ right: 1 }}
            ListFooterComponent={this._renderFooter}
          />
        </Div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      brandApi,
      changeSearch,
      clearSearch,
      resetBrand,
    },
    dispatch,
  )

const mapStateToProps = (state, { route }) => ({
  brands: state.brands.order,
  search: state.brands.search,
  pagination: state.brands.pagination,
  loading: state.brands.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)
