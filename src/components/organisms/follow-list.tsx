import React, { Component } from 'react'
import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font } from '@components/atoms/basic'
import InviniteLoader from '@components/atoms/loaders/invinite'
import Field from '@components/atoms/field'
import { getFollowerFollowing } from '@modules/user/action'
import { colors } from '@utils/constants'
import { userListData } from '@hocs/data/user'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fontStyle } from '@src/components/commont-styles'
import { navigate } from '@src/root-navigation'
import FollowCard from '@components/molecules/follow-card'

const FollowCardHoc = userListData(FollowCard)
const { height, width } = Dimensions.get('screen')

class FollowList extends Component<any, any> {
  state = {
    searchKey: '',
    selectedFilter: this.props.filterOptions,
  }
  timeout = null
  limit = 15
  skip = 0
  lastskip = 0
  timer = null

  componentDidMount() {
    this._freshfetch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.skip = 0
    }
  }

  _onSearchChange = text => {
    if (this.timeout) {
      this.timeout = null
    }

    this.setState({ searchKey: text }, () => {
      this.timeout(() => {}, 500)
    })
  }

  _freshfetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
  }

  _fetchData = skip => {
    const params = {
      offset: skip * this.limit,
      limit: this.limit,
      name: this.state.searchKey,
    }
    this.props.getFollowerFollowing(params, this.props.type)
  }

  _renderItem = ({ item }) => {
    return (
      <View style={{ width: '100%' }}>
        <FollowCardHoc userId={item} />
      </View>
    )
  }
  _fetchMore = () => {
    if (!this.props.userLoading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.userLoading) {
        return
      }
      this._fetchData(this.skip)

      // if (30 > this.props.follows.length) {
      //   this._fetchData(this.skip)
      // }
    }
  }

  onSearchChange = text => {
    this.setState({ searchKey: text })

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (this.state.searchKey.length > 2) {
        this.skip = 0
        this._fetchData(this.skip)
      }
    }, 800)
  }

  _renderSearch = () => {
    const { searchKey } = this.state
    return (
      <View style={{ backgroundColor: colors.white }}>
        <Field
          style={{ marginHorizontal: 12 }}
          value={searchKey}
          placeholder={`Search ${this.props.type}...`}
          onChangeText={this.onSearchChange}
          leftIcon={
            <Icon
              style={{ marginRight: 8 }}
              name="search"
              color={colors.black90}
            />
          }
        />
      </View>
    )
  }

  _emptyComponent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/placeholder/theshonet-no-followers.png')}
          style={{ width: 300, height: 300 }}
        />
        <Text
          style={{
            ...fontStyle.helvetica,
            fontSize: 14,
            color: colors.black70,
          }}>{`No ${this.props.type} yet ...`}</Text>
      </View>
    )
  }

  _keyExtractor = (item, id) => `trans-${item} -${id}`
  render() {
    const { follows, userLoading } = this.props

    return (
      <>
        <FlatList
          style={{ width: width, flex: 1 }}
          ListHeaderComponent={this._renderSearch()}
          ListEmptyComponent={this._emptyComponent}
          data={follows}
          onEndReached={this._fetchMore}
          onEndReachedThreshold={0.99}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          stickyHeaderIndices={[0]}
        />
        {userLoading && (
          <Div
            style={{ position: 'absolute', bottom: 0, left: 0 }}
            justify="center"
            _width={width}
            _background="rgba(0,0,0,0.3)"
            _height="64px">
            <InviniteLoader />
          </Div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    follows: state.user.order,
    userLoading: state.user.loading,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFollowerFollowing }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FollowList)
