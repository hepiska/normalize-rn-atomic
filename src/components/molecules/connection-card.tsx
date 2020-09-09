import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@src/utils/constants'
import { navigate } from '@src/root-navigation'
import UserPp from '@components/atoms/user-profile-picture-new'
import { getFollowerFollowing, getUser } from '@modules/user/action'
import { userListData } from '@src/hocs/data/user'
import ConnectionsLoader from '@components/atoms/loaders/connection'

const UserPpHoc = userListData(UserPp)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  playfair: {
    ...fontStyle.playfair,
    fontWeight: '500',
    fontSize: 20,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  photoCollections: {
    flexDirection: 'row',
    marginTop: 16,
  },
  morePhotoContainer: {
    backgroundColor: colors.black100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const { width } = Dimensions.get('screen')
const imgSize = (width - 32) / 8
const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

interface ConnectionCardType {
  style?: ViewStyle
  user?: any
  type?: string
  loading?: boolean
  getFollowerFollowing?: (parameter: Object, type: string, id: number) => void
  getUser?: (id: number, type: string) => void
  follows?: Array<number>
  userLoading?: boolean
  userid?: number
  navigation?: any
}

class ConnectionCard extends React.Component<ConnectionCardType, any> {
  connectionLimit = 7

  componentDidMount() {
    const params = {
      offset: 0,
      limit: 7,
    }
    this.props.getFollowerFollowing(
      params,
      'followings',
      this.props.userid || null,
    )
    if (this.props.userid) {
      this.props.getUser(this.props.userid, 'id')
    }
  }

  gotoFollowPage = followType => () => {
    navigateTo('Screens', 'Follow', {
      followType,
      name: this.props.user.name,
      userid: this.props.userid,
      user: this.props.user,
    })
  }

  _renderFailtext = () => {
    const { loading } = this.props

    if (loading) {
      return <ConnectionsLoader style={{ width: '100%' }} />
    }

    return (
      <View>
        <Text style={[styles.helvetica14]}>There is no connection yet</Text>
      </View>
    )
  }

  render() {
    const { user, style, follows, navigation } = this.props

    if (!follows || !user) {
      return null
    }
    return (
      <View style={{ ...styles.container, ...style }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ ...styles.playfair }}>Connections</Text>
          {user?.following_count > this.connectionLimit && (
            <TouchableOpacity onPress={this.gotoFollowPage('Following')}>
              <Text
                style={{
                  ...styles.helvetica12,
                }}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            ...styles.photoCollections,
            justifyContent:
              follows?.length < this.connectionLimit ||
              follows?.length === this.connectionLimit
                ? 'flex-start'
                : 'space-between',
          }}>
          {follows.length
            ? follows?.map((value, key) => {
                return key < this.connectionLimit ? (
                  <UserPpHoc
                    userId={value}
                    key={`user-pp-${key}`}
                    navigation={navigation}
                    size={imgSize}
                    style={{ borderColor: 'white', borderWidth: 2 }}
                  />
                ) : null
              })
            : this._renderFailtext()}
          {user?.following_count > this.connectionLimit && (
            <View
              style={{
                ...styles.morePhotoContainer,
                width: imgSize,
                height: imgSize,
                borderRadius: imgSize / 2,
                borderColor: 'white',
                borderWidth: 2,
                // width: imgSize,
              }}>
              <Text
                style={{
                  ...styles.helvetica12,
                  color: colors.white,
                }}>{`${user.following_count - this.connectionLimit}+`}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const isAuth = state.auth.isAuth
  let user = null
  if (isAuth) {
    user = state.user.data[state.auth.data.user.id] || state.auth.data.user
  }
  if (ownProps.userid) {
    user = state.user.data[ownProps.userid]
  }

  return {
    follows: ownProps.userid
      ? state.user.specificUserOrder[ownProps.userid]
      : state.user.order,
    loading: state.user.loading,
    userLoading: state.user.loading,
    user,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFollowerFollowing, getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionCard)
