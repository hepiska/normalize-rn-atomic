import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Dimensions } from 'react-native'
import { colors } from '@utils/constants'
import { setSelectedSort } from '@modules/sort/action'
import SelectAbleItem, {
  SelectorShapeType,
} from '@components/molecules/filter-brand-item'
import { changeValue } from '@modules/product-filter/action'

const { width } = Dimensions.get('screen')

const sortData = [
  {
    name: 'Latest',
    id: 'time-desc',
    value: { sort_by: 'date', sort_direction: 'desc' },
  },
  {
    name: 'Name: A to Z',
    id: 'name-asc',
    value: { sort_by: 'name', sort_direction: 'asc' },
  },
  {
    name: 'Name: Z to A',
    id: 'name-desc',
    value: { sort_by: 'name', sort_direction: 'desc' },
  },
  {
    name: 'Price: Low to High',
    id: 'price-asc',
    value: { sort_by: 'price', sort_direction: 'asc' },
  },
  {
    name: 'Price: High to low',
    id: 'price-desc',
    value: { sort_by: 'price', sort_direction: 'desc' },
  },
]

class SortOrg extends React.Component<any, any> {
  _onPress = item => {
    this.props.setSelectedSort(item)
    this.props.changeValue({ key: 'isOpen', value: false })
  }
  _isSelected = (item: any): boolean => item.id === this.props.sort.id

  render() {
    return (
      <View
        style={{
          height: '100%',
          paddingHorizontal: 16,
          backgroundColor: 'white',
          width,
        }}>
        {sortData.map(data => (
          <SelectAbleItem
            fontStyle={{ color: colors.black100 }}
            isSelected={this._isSelected(data)}
            onPress={this._onPress}
            item={data}
            key={data.id}
            selectorShape={SelectorShapeType.circle}
          />
        ))}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSelectedSort, changeValue }, dispatch)
const mapStateToProps = state => ({ sort: state.sort.selected })

export default connect(mapStateToProps, mapDispatchToProps)(SortOrg)
