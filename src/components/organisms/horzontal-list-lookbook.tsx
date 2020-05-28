import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ListItemLookBook from '@components/molecules/list-item-lookbook'
import { setImage } from '@utils/helpers'

import HorizontalList from '@components/layouts/horizontal-list'
import { fetchLookbook, lookBookApi } from '@modules/lookbook/action'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
})

class HorizontalListLookBook extends React.Component<any, any> {
  componentDidMount() {
    this.props.lookBookApi({ offset: 0, limit: 30, sort: -1 })
  }

  _handleOnPress = ({ id, slug }) => {
    this.props.navigation.navigate('Screens', {
      screen: 'Lookbook',
      params: { slug },
    })
  }

  _renderItem = ({ item, index }) => {
    return (
      <ListItemLookBook
        id={item.slug}
        onPress={this._handleOnPress}
        style={index === 0 ? { marginLeft: 16 } : {}}
        slug={item.slug}
        title={item.index}
        imageUri={{
          uri: setImage(item.image_url, { width: 264 }),
        }}
      />
    )
  }

  _keyExtractor = item => item.slug
  render() {
    const { lookbooks, loading } = this.props
    return (
      <View style={styles.container}>
        <HorizontalList
          loading={loading}
          data={lookbooks}
          renderItem={this._renderItem}
          title="The Shonet Monthly Issue"
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLookbook,
      lookBookApi,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  lookbooks: state.lookbooks.order.map(id => state.lookbooks.data[id]),
  loading: state.lookbooks.loading,
  error: state.lookbooks.error,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HorizontalListLookBook)
