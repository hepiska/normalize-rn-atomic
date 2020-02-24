import React from 'react'
import { Dimensions, Button } from 'react-native'
import {
  Div,
  Font,
  Image,
  ScrollDiv,
  PressAbbleDiv,
} from '@components/atoms/basic'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import CoverImageAnimated from '@src/components/organisms/cover-image-animated'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagesWithPreviews from '@components/organisms/images-with-preview'
import ContentExpandable from '@components/molecules/content-expandable'
import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import AttributeList from '@src/components/molecules/attribute-list'
import ProductGroup from '@components/organisms/product-group'
import ProductAttributes from '@components/organisms/product-attributes'
import ProductGroupList from '@components/organisms/product-group-list'
import ProductCard from '@components/molecules/product-card'
import Animated from 'react-native-reanimated'

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
const { width } = Dimensions.get('screen')

const y = new Value(0)

class ProductListPage extends React.Component<any, any> {
  state = {
    product: productMock,
    selectedVariant: 1,
    isUserSelectVariant: false,
  }

  getVariantData = id => {
    const { product } = this.state
    return product.variants.find(variant => variant.id === id)
  }

  dimentionConstant = {
    imageHeight: width * (3 / 2),
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
    // headerShown: false
  }

  render() {
    const { navigation } = this.props
    const { product, selectedVariant } = this.state
    const varianData = this.getVariantData(selectedVariant)
    navigation.setOptions({
      header: () => {
        return (
          <NavbarTopAnimated
            parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
            LeftMenu={() => (
              <Icon name="chevron-left" size={20} color="white" />
            )}
            y={y}
            Title={this.state.product.name}
          />
        )
      },
    })

    return (
      <Div _width="100%" justify="flex-start">
        <CoverImageAnimated
          y={y}
          width={width}
          images={varianData.photos.map(photo => ({
            ...photo,
            uri: photo.url,
          }))}
          height={this.dimentionConstant.imageHeight}>
          <ImagesWithPreviews
            size={{ width, height: this.dimentionConstant.imageHeight }}
            images={varianData.photos.map(photo => ({
              ...photo,
              uri: photo.url,
            }))}
          />
        </CoverImageAnimated>
        <ImageCoverContentLayout
          y={y}
          dimentionConstant={this.dimentionConstant}>
          <Div bg="white" _width="100%" padd="0px 16px 96px">
            <ProductOverviewCard product={{ ...product, ...varianData }} />
            <ProductAttributes
              attributes={product.attributes}
              onAllAttributesSelected={this._selectVariant}
            />
            {/* <ContentExpandable title='Size & Fit' content="ssaasa" id='expanable' isFirst />
            <ProductGroup title='What Your Friends are Looking Now' products={[product, product, product, product]}></ProductGroup>

            <ProductGroupList onShowAll={() => { }} title='Recently Viewed' products={[product, product, product, product]}></ProductGroupList> */}
          </Div>
        </ImageCoverContentLayout>
      </Div>
    )
  }
}

export default ProductListPage
