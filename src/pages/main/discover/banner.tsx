import React from 'react'
import { InteractionManager, View } from 'react-native'
import PostCardJournal from '@src/components/molecules/post-card-journal'
import Banner from '@src/components/molecules/banner'

interface BannerTopType {
  banners?: any[]
}

class BannerTop extends React.PureComponent<BannerTopType> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }

  render() {
    const { banners } = this.props
    return (
      <>
        {banners &&
          banners.map(banner => {
            return (
              <Banner
                key={`banner-discover-${banner.id}`}
                title={banner.title}
                desc={banner.subtitle}
                btnTitle={banner.link_text}
                img={banner.mobile_image_url}
                style={{
                  height: 500,
                  marginBottom: 20,
                }}
              />
            )
          })}
      </>
    )
  }
}

export default BannerTop
