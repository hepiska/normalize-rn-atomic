import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Font } from '@components/atoms/basic'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import TabMenu from '@components/layouts/tab-menu'
import FollowList from '@components/organisms/follow-list'
import { fontStyle } from '@src/components/commont-styles'

// const items = user => [
const items = [
  {
    name: 'Follower',
    Component: <FollowList type="followers" />,
    // title: `Followers (${user.follower_count || 0})`,
    title: `Follower`,
  },
  {
    name: 'Following',
    Component: <FollowList type="followings" />,
    // title: `Followings (${user.following_count || 0})`,
    title: `Following`,
  },
]

class Follow extends Component<any, any> {
  state = {
    activeTab: null,
  }
  items = () => {
    return [
      {
        name: 'Follower',
        Component: <FollowList type="followers" />,
        title: (
          <Font
            style={{
              ...fontStyle.helvetica,
              fontSize: 14,
              color: colors.black100,
            }}>
            {`Followers (${this.props.follower_count})`}
          </Font>
        ),
      },
      {
        name: 'Following',
        Component: <FollowList type="followings" />,
        title: (
          <Font
            style={{
              ...fontStyle.helvetica,
              fontSize: 14,
              color: colors.black100,
            }}>
            {`Followings (${this.props.following_count})`}
          </Font>
        ),
      },
    ]
  }
  componentDidMount() {
    const { route } = this.props
    if (this.state.activeTab !== route.params.followType) {
      this.setState({
        activeTab: route.params.followType,
      })
    }
  }
  onChangeTab = item => {
    this.setState({
      activeTab: item.name,
    })
  }
  render() {
    const { route, user } = this.props
    const { activeTab } = this.state

    if (!activeTab) {
      return null
    }
    return (
      <>
        <NavbarTop
          title={route.params.name || 'Follow Page'}
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <TabMenu
          items={this.items()}
          selectedItem={activeTab}
          onChangeTab={this.onChangeTab}
          isScrollEnabled
          isLazyload
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = (state, ownProps) => {
  const user = state.user.data[state.auth.data.user.id]

  return {
    follower_count: user?.follower_count || 0,
    following_count: user?.following_count || 0,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow)
