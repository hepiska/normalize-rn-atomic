import React from 'react'
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import SearchResultCard from '../molecules/search-result-card'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage as changeImageUri } from '@utils/helpers'

interface BrandHorizontalType {
  brand: any
  idx: any
  imageOnly: boolean
}

const Divider = () => (
  <View
    style={{
      borderBottomColor: colors.black50,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      width: '100%',
    }}
  />
)

class BrandHorizontal extends React.PureComponent<BrandHorizontalType, any> {
  state = {
    defaultImage: null,
  }
  handleOnPress = () => {
    const { brand } = this.props
    navigate('Screens', {
      screen: 'ProductList',
      params: {
        brandsId: brand.id,
        from: 'brands',
      },
    })
  }
  render() {
    const { brand, idx } = this.props
    const { defaultImage } = this.state
    const image =
      defaultImage ||
      (!!brand.image_url &&
        changeImageUri(brand.image_url, { width: 53, height: 40 }))

    const thumbnailImage = defaultImage
      ? null
      : !!brand.image_url &&
        changeImageUri(brand.image_url, { width: 53, height: 40 })

    return brand ? (
      <TouchableWithoutFeedback onPress={this.handleOnPress}>
        <>
          <SearchResultCard
            leftContent={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ImageAutoSchale
                  errorStyle={{ width: 53, height: 40 }}
                  thumbnailSource={
                    typeof thumbnailImage === 'string'
                      ? { uri: thumbnailImage }
                      : thumbnailImage
                  }
                  source={typeof image === 'string' ? { uri: image } : image}
                  width={53}
                  height={40}
                  style={{ borderRadius: 8 }}
                />
                <Text
                  style={{
                    marginLeft: 16,
                    ...fontStyle.helveticaBold,
                    fontWeight: '500',
                    fontSize: 12,
                    color: colors.black100,
                  }}>
                  {brand.name}
                </Text>
              </View>
            }
            style={{
              paddingVertical: 16,
            }}
          />
          <Divider />
        </>
      </TouchableWithoutFeedback>
    ) : null
  }
}

export default BrandHorizontal
