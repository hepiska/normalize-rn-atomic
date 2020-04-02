import React from 'react'
import { Dimensions } from 'react-native'
import {
  Div,
  Font,
  Image,
  ScrollDiv,
  PressAbbleDiv,
} from '@components/atoms/basic'
import { Button } from '@components/atoms/button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import CoverImageAnimated from '@src/components/organisms/cover-image-animated'
import ImagesWithPreviews from '@components/organisms/images-with-preview'
import ContentExpandable from '@components/molecules/content-expandable'
import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import ProductAttributes from '@components/organisms/product-attributes'
import Animated from 'react-native-reanimated'
import { colors } from '@src/utils/constants'
import RangePrice from '@components/molecules/range-price'

import Price from '@components/atoms/price'
import ButtonGroup from '@components/molecules/button-group'
import { OutlineButton } from '@components/atoms/button'
import { getProductById } from '@modules/product/action'
import { setImage } from '@utils/helpers'

const productMock: any = {
  id: 1,
  brand: {
    id: 3,
    name: 'Sulwhasoo',
  },
  category: {
    id: 4,
    name: 'Face Serum',
    parent: {
      id: 4,
      name: 'Treatment',
      parent: {
        id: 4,
        name: 'Beauty',
      },
    },
  },
  attributes: [
    {
      id: 1,
      label: 'Size',
      values: [
        {
          id: 1,
          label: 'Small',
        },
        {
          id: 2,
          label: 'Large',
        },
      ],
    },
    {
      id: 2,
      label: 'Color',
      values: [
        {
          id: 3,
          label: 'Blue',
          metadata: 'blue',
        },
        {
          id: 4,
          label: 'Yellow',
          metadata: 'yellow',
        },
      ],
    },
  ],
  name: 'First Care Activating Serum',
  slug: 'sulwhasoo-first-care-activating-serum',
  moderation: {
    status: 'Awaiting',
    content: {
      name: 'New Product Name',
      description: 'New description of the product',
    },
  },
  isPurchaseable: true,
  isHidden: false,
  isApproved: false,
  variants: [
    {
      id: 1,
      attributeValues: [
        {
          attribute_id: 1,
          attribute_value_id: 1,
        },
        {
          attribute_id: 2,
          attribute_value_id: 3,
        },
      ],
      sku: 'SUL-F1001',
      isPrimary: true,
      price: 1500,
      stockQty: 20,
      grossWeight: 300,
      photos: [
        {
          id: 1,
          url:
            'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
          isPrimary: true,
        },
        {
          id: 2,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
        {
          id: 3,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
      ],
    },
    {
      id: 2,
      attributeValues: [
        {
          attribute_id: 1,
          attribute_value_id: 1,
        },
        {
          attribute_id: 2,
          attribute_value_id: 4,
        },
      ],
      sku: 'SUL-F1002',
      isPrimary: false,
      price: 1600,
      stockQty: 8,
      grossWeight: 300,
      photos: [
        {
          id: 4,
          url:
            'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
          isPrimary: true,
        },
        {
          id: 5,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
        {
          id: 6,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
      ],
    },
    {
      id: 3,
      attribute_values: [
        {
          attribute_id: 1,
          attribute_value_id: 2,
        },
        {
          attribute_id: 2,
          attribute_value_id: 3,
        },
      ],
      sku: 'SUL-F1003',
      isPrimary: false,
      price: 1700,
      priceDisc: 1500,
      stockQty: 15,
      grossWeight: 300,
      photos: [
        {
          id: 7,
          url:
            'https://shonet.imgix.net/filemanager/shared/072b030b_Renato%20Abati%20%282%29.jpg?q=75&auto=compress,format&w=800',
          isPrimary: true,
        },
        {
          id: 8,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
        {
          id: 9,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
      ],
    },
    {
      id: 4,
      attribute_values: [
        {
          attribute_id: 1,
          attribute_value_id: 2,
        },
        {
          attribute_id: 2,
          attribute_value_id: 4,
        },
      ],
      sku: 'SUL-F1004',
      isPrimary: false,
      price: 1800,
      stockQty: 11,
      grossWeight: 300,
      photos: [
        {
          id: 10,
          url:
            'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
          isPrimary: true,
        },
        {
          id: 11,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
        {
          id: 12,
          url:
            'https://shonet.imgix.net/users/facebook_bd39e9db-1f16-4c3c-bb16-dcdfeb2d15c8.jpeg?q=75&auto=compress,format&w=500',
          isPrimary: false,
        },
      ],
    },
  ],
}

const { Value } = Animated
const { width, height } = Dimensions.get('screen')

const y = new Value(0)

class ProductListPage extends React.Component<any, any> {
  state = {
    product: productMock,
    selectedVariant: 1,
    isUserSelectVariant: false,
  }

  componentDidMount() {
    this.props.getProductById(this.props.route.params?.productI)
  }

  getVariantData = id => {
    const { product } = this.props
    const varian = product.variants.find(variant => variant.id === id)
    return varian || product.variants[0]
  }

  dimentionConstant = {
    imageHeight: Math.min(width * (3 / 2), height * 0.7),
  }

  _selectVariant = attributes => {
    const { product } = this.state
    const variant = product.variants.find(_variant => {
      _variant.attribute_values =
        _variant.attribute_values || _variant.attributeValues
      const ismatch = _variant.attribute_values.reduce((acc, _att) => {
        const sellectedAtt = attributes.find(
          _attribute =>
            _attribute.attribute_id === _att.attribute_id &&
            _attribute.attribute_value_id === _att.attribute_value_id,
        )
        if (!sellectedAtt) {
          return acc && false
        }
        return acc && true
      }, true)
      return ismatch
    })
    if (variant) {
      this.setState({ selectedVariant: variant.id, isUserSelectVariant: true })
    }
  }

  static navigationOptions = {
    headerTransparent: true,
    headerShown: false,
  }

  openCartModal = () => {
    const { navigation, product } = this.props
    navigation.navigate('CartModal', {
      product,
    })
  }

  groupButton = [
    { name: 'Save', icon: 'bookmark', onPress: () => {} },
    { name: 'Share', icon: 'share', onPress: () => {} },
  ]

  render() {
    const { product } = this.props
    const { selectedVariant, isUserSelectVariant } = this.state

    const varianData = this.getVariantData(selectedVariant)
    const price: any = {}
    if (!product.max_price_after_disc && !product.min_price_after_disc) {
      price.from = product.min_price
      price.to = product.max_price
      price.withDiscount = false
    } else {
      price.from = product.min_price_after_disc
      price.to = product.max_price_after_disc
      price.exFrom = product.min_price
      price.exTo = product.max_price
      price.withDiscount = true
    }

    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showBack
          y={y}
          Title={product.name}
        />
        <Div _width="100%" justify="flex-start">
          <CoverImageAnimated
            y={y}
            width={width}
            images={varianData.image_urls.map(url => ({
              uri: url,
            }))}
            height={this.dimentionConstant.imageHeight}>
            <ImagesWithPreviews
              size={{ width, height: this.dimentionConstant.imageHeight }}
              images={varianData.image_urls.map(url => ({
                uri: setImage(url, { width: 400, height: 600 }),
              }))}
            />
          </CoverImageAnimated>
          <ImageCoverContentLayout
            y={y}
            dimentionConstant={this.dimentionConstant}>
            <Div bg="white" _width="100%" padd="0px 16px 96px">
              <Div width="100%" align="flex-start" padd="16px 0px">
                <Font
                  family="Futura-Bold"
                  size={18}
                  _margin="4px"
                  color="black">
                  {product.brand.name}
                </Font>
                <Font size={18} _margin="4px" color={colors.gray3}>
                  {product.name}
                </Font>
                {isUserSelectVariant ? (
                  <Price
                    price={varianData.price}
                    discount_price={varianData.price_after_disc}
                  />
                ) : (
                  <RangePrice {...price} />
                )}
              </Div>
              {product.attributes && (
                <ProductAttributes
                  attributes={product.attributes}
                  onAllAttributesSelected={this._selectVariant}
                />
              )}
              <Button
                leftIcon="save"
                title="Available for return or exchange"
                onPress={() => {}}
                style={{
                  width: '100%',
                  marginVertical: 12,
                  justifyContent: 'flex-start',
                  height: 32,
                  backgroundColor: 'rgba(26, 26, 26, 0.04)',
                }}
              />
              <Button
                title="Add to cart"
                onPress={this.openCartModal}
                fontStyle={{
                  color: colors.white,
                  fontSize: 14,
                }}
                style={{
                  width: '100%',
                  height: 46,
                  marginVertical: 12,
                  backgroundColor: '#8131E2',
                }}
              />

              <ButtonGroup items={this.groupButton} />
              {product?.details?.map((detail, idx) => (
                <ContentExpandable
                  title={detail.type}
                  content={detail.content}
                  key={idx}
                  id={'expanable' + idx}
                  isFirst={idx === 0}
                />
              ))}
            </Div>
          </ImageCoverContentLayout>
        </Div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.data[ownProps.route.params?.productId],
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getProductById }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
