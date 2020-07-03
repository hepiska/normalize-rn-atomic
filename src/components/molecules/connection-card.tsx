import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@src/utils/constants'
import { navigate } from '@src/root-navigation'
import UserPp from '@components/atoms/user-profile-picture'
import { getFollowerFollowing, getUser } from '@modules/user/action'
import { userListData } from '@src/hocs/data/user'
import ConnectionsLoader from '@components/atoms/loaders/connection'

const UserPpHoc = userListData(UserPp)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  playfairBold28: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
    fontSize: 28,
  },
  playfairBold20: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
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
  button: {
    height: 36,
    borderColor: colors.black50,
  },
  buttonBlack: {
    height: 36,
    backgroundColor: colors.black100,
  },
  photoCollections: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  morePhotoContainer: {
    backgroundColor: colors.black100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: 8,
  },
})

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
  getFollowerFollowing?: (parameter: Object, type: string) => void
  follows?: Array<number>
  userLoading?: boolean
}

class ConnectionCard extends React.Component<ConnectionCardType, any> {
  connectionLimit = 7
  componentDidMount() {
    const params = {
      offset: 10,
      limit: 5,
    }
    this.props.getFollowerFollowing(params, 'followings')
  }

  gotoFollowPage = followType => () => {
    navigateTo('Screens', 'Follow', {
      followType,
      name: this.props.user.name,
    })
  }

  _rendeFailtext = () => {
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
    const { user, style, follows } = this.props
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
          <Text style={{ ...styles.playfairBold20 }}>Connections</Text>
          {user?.following_count > this.connectionLimit && (
            <TouchableOpacity onPress={this.gotoFollowPage('Following')}>
              <Text
                style={{
                  ...styles.helvetica12,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ ...styles.photoCollections }}>
          {follows.length
            ? follows?.map((value, key) => {
                return key < this.connectionLimit ? (
                  <UserPpHoc userId={value} key={`user-pp-${key}`} />
                ) : null
              })
            : this._rendeFailtext()}
          {user?.following_count > this.connectionLimit && (
            <View
              style={{
                ...styles.image,
                ...styles.morePhotoContainer,
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

const mapStateToProps = (state: any) => {
  const isAuth = state.auth.isAuth
  let user
  if (isAuth) {
    user = state.user.data[state.auth.data.user.id] || state.auth.data.user
  }

  return {
    follows: state.user.order,
    loading: state.user.loading,
    userLoading: state.user.loading,
    user,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFollowerFollowing, getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionCard)
