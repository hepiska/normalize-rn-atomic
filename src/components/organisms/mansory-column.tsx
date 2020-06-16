import React from 'react'
import { FlatList } from 'react-native'

class Column extends React.PureComponent<any, any> {
  _renderItem = () => {}
  _keyExtractor = (item, index): string => {
    return (
      'IMAGE-CELL-' +
      index.toString() +
      '---' +
      (item.id ? item.id : this.props.colIndex)
    )
  }

  render() {
    const {
      data,
      colIndex,
      renderItem,
      initialNumInColsToRender,

      style = {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      ...props
    } = this.props
    return (
      <FlatList
        key={colIndex}
        renderItem={renderItem}
        removeClippedSubviews={true}
        data={data}
        {...props}
        initialNumToRender={initialNumInColsToRender}
        listKey={this._keyExtractor}
        keyExtractor={this._keyExtractor}
        style={style}
      />
    )
  }
}
export default Column
