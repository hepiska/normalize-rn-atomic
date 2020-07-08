import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Font } from '@components/atoms/basic'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import TabMenu from '@components/layouts/tab-menu'
import FollowList from '@components/organisms/follow-list'
import { fontStyle } from '@src/components/commont-styles'
import FollowListLoader from '@src/components/atoms/loaders/follow-list'

class Follow extends Component<any, any> {
  state = {
    activeTab: null,
    finishAnimation: false,
  }
  items = () => {
    const userid = this.props.route.params.userid || null
    return [
      {
        name: 'Follower',
        Component: <FollowList type="followers" userid={userid} />,
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
        Component: <FollowList type="followings" userid={userid} />,
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
            isScrollEnabled
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
