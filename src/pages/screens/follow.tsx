import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Font } from '@components/atoms/basic'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import TabMenu from '@src/components/layouts/tab-menu-full-flex'
import FollowList from '@components/organisms/follow-list'
import { fontStyle } from '@src/components/commont-styles'
import FollowListLoader from '@src/components/atoms/loaders/follow-list'

class Follow extends Component<any, any> {
  state = {
    activeTab: null,
    finishAnimation: false,
  }

  kFormater = num => {
    if (num > 999 && num < 1000000) {
      return num / 1000 + 'K'
    } else if (num > 999999) {
      return (num / 1000000).toFixed(2) + 'M'
    }
    return num
  }

  items = () => {
    const userid = this.props.route.params.userid || null
    const following = this.kFormater(this.props.following_count)
    const followers = this.kFormater(this.props.follower_count)
    return [
      {
        name: 'Follower',
        Component: <FollowList type="followers" userid={userid} />,
        title: `${followers} Followers`,
      },
      {
        name: 'Following',
        Component: <FollowList type="followings" userid={userid} />,
        title: `${following} Following`,
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
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        finishAnimation: true,
      })
    })
  }
  onChangeTab = item => {
    this.setState({
      activeTab: item.name,
    })
  }
  render() {
    const { route, user, follower_count, following_count } = this.props
    const { activeTab, finishAnimation } = this.state

    if (!activeTab) {
      return null
    }
    return (
      <>
        <NavbarTop
          title={'Connections' || route.params.name}
          leftContent={['back']}
        />
        {finishAnimation ? (
          <TabMenu
            items={this.items()}
            selectedItem={activeTab}
            onChangeTab={this.onChangeTab}
            forceRender={follower_count + following_count}
            textMenuAlign="center"
            isScrollEnabled={false}
            isLazyload
          />
        ) : (
          <FollowListLoader showheader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = (state, ownProps) => {
  const user =
    ownProps.route.params.user || state.user.data[state.auth.data.user.id]

  return {
    follower_count: user?.follower_count || 0,
    following_count: user?.following_count || 0,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow)
