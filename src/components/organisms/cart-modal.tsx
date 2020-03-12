import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { Button } from '@components/atoms/button'
import { NavbarTopModal } from '@components/molecules/navbar-top'
import ProductOverviewCart from '@components/molecules/product-overview-cart'
import ProductAttributes from '@components/organisms/product-attributes'
import { images, colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

const AbsDiv = styled(Div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
`

const styles = StyleSheet.create({
  bottomSheet: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1.0,
    shadowColor: colors.black50,
    elevation: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
})

const productMock = {
  id: 1,
  name: 'First Care Activating Serum',
  slug: 'sulwhasoo-first-care-activating-serum-1234',
  min_price: 10000,
  max_price: 40000,
  website_url: 'https://www.bla.com/',
  is_purchaseable: true,
  is_hidden: false,
  skin_type: {
    id: 9,
    code: 'T-2 Normal',
    label: 'Normal',
  },
  skin_concern: {
    id: 45,
    code: 'C-3 Anti Aging',
    label: 'Anti Aging',
  },
  style: null,
  material: null,
  color_family: null,
  pattern: null,
  youtube_urls: [
    'https://www.youtube.com/watch?v=123',
    'https://www.youtube.com/watch?v=456',
  ],
  image_urls: [
    'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
    'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
  ],
  brand: {
    id: 3,
    name: 'Sulwhasoo',
    image_url:
      'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
  },
  categories: [
    {
      id: 4,
      name: 'Face Serum',
      slug: 'face-serum',
      gender: 'female',
      image_url:
        'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
      parent: {
        id: 4,
        name: 'Treatment',
        slug: 'treatment',
        gender: 'female',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        parent: {
          id: 4,
          name: 'Beauty',
          slug: 'beauty',
          gender: 'female',
          image_url:
            'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        },
      },
    },
  ],
  shipping_methods: [
    {
      id: 1,
      name: 'Instant',
      courier: {
        id: 11,
        name: 'Gojek',
      },
      category: {
        id: 1,
        name: 'Fast',
      },
    },
    {
      id: 2,
      name: 'Same Day',
      courier: {
        id: 11,
        name: 'Gojek',
      },
      category: {
        id: 1,
        name: 'Fast',
      },
    },
    {
      id: 3,
      name: 'Regular',
      courier: {
        id: 12,
        name: 'JNE',
      },
      category: {
        id: 2,
        name: 'Slow',
      },
    },
  ],
  details: [
    {
      type: 'description',
      content: 'Comma, Separated, Value',
    },
    {
      type: 'how-to-use',
      content: 'Free text',
    },
    {
      type: 'editors-note',
      content: 'Free text',
    },
    {
      type: 'ingredients',
      content: 'Free text',
    },
    {
      type: 'care-label',
      content: 'Comma, Separated, Value',
    },
    {
      type: 'size-and-fit',
      content: 'Comma, Separated, Value',
    },
  ],
  address: {
    id: 1,
    label: 'Warehouse A',
    recipient_name: 'Joey',
    email: 'warehouse@thecompany.com',
    phone_number: '081213331938',
    line_1: 'Jl. Kemenangan No. 1',
    line_2: null,
    city: {
      id: 1,
      name: 'Kabupaten Minahasa Tenggara',
    },
    district: {
      id: 1,
      name: 'Kakas',
    },
    village: null,
    zip_code: {
      id: 1,
      code: '12345',
    },
    latitude: -1.2343,
    longitude: 293.123,
  },
  flags: [
    'returnable',
    'aerosol',
    'exchangeable',
    'liquid',
    'fragile',
    'flameable',
  ],
  saved: {
    user: [
      {
        id: 3,
        name: 'Akhamat',
        username: 'hadi',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        biography: 'Lorem ipsum',
        group_id: 3,
      },
      {
        id: 3,
        name: 'Akhamat',
        username: 'hadi',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        biography: 'Lorem ipsum',
        group_id: 3,
      },
      {
        id: 3,
        name: 'Akhamat',
        username: 'hadi',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        biography: 'Lorem ipsum',
        group_id: 3,
      },
      {
        id: 3,
        name: 'Akhamat',
        username: 'hadi',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        biography: 'Lorem ipsum',
        group_id: 3,
      },
      {
        id: 3,
        name: 'Akhamat',
        username: 'hadi',
        image_url:
          'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        biography: 'Lorem ipsum',
        group_id: 3,
      },
    ],
    count: 548,
  },
  attributes: [
    {
      id: 1,
      label: 'Size',
      values: [
        {
          id: 8,
          label: 'Small',
          brand_id: null,
          metadata: null,
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
          brand_id: null,
          metadata: 'blue',
        },
        {
          id: 4,
          label: 'Yellow',
          brand_id: null,
          metadata: 'yellow',
        },
      ],
    },
  ],
  variants: [
    {
      id: 39,
      sku: 'SUL-F1001',
      price_disc: 2000,
      price: 10000,
      slug: 'small-blue',
      stock_qty: 20,
      stock_reserved: 5,
      stock_alert: 5,
      volume: null,
      metrics: {
        gross_weight: 300,
        gross_height: 8,
        gross_width: 9,
        gross_length: 15,
        nett_weight: 300,
        nett_height: 8,
        nett_width: 9,
        nett_length: 15,
      },
      image_urls: [
        'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
        'https://theshonet.imgix.net/images/0bf2a8d5-b75a-4074-b71d-976540b7ac89-1576043746.jpeg',
      ],
      attribute_values: [
        {
          attribute_id: 1,
          attribute_value_id: 8,
          brand_id: null,
          metadata: null,
        },
        {
          attribute_id: 2,
          attribute_value_id: 3,
          brand_id: null,
          metadata: null,
        },
      ],
    },
    {
      id: 40,
      sku: 'SUL-F1002',
      price: 40000,
      slug: 'small-yellow',
      stock_qty: 13,
      stock_reserved: 8,
      stock_alert: 2,
      is_primary: true,
      volume: null,
      metrics: {
        gross_weight: 300,
        gross_height: 8,
        gross_width: 9,
        gross_length: 15,
        nett_weight: 300,
        nett_height: 8,
        nett_width: 9,
        nett_length: 15,
      },
      image_urls: [
        'https://cdn-image.hipwee.com/wp-content/uploads/2019/02/hipwee-51661786_307638939937433_3349881294454051841_n-640x800.jpg',
        'https://cdn.idntimes.com/content-images/post/20180727/dc061a68f4afea39ea934004202161fa.jpg',
      ],
      attribute_values: [
        {
          attribute_id: 1,
          attribute_value_id: 8,
          brand_id: null,
          metadata: null,
        },
        {
          attribute_id: 2,
          attribute_value_id: 4,
          brand_id: null,
          metadata: null,
        },
      ],
    },
  ],
  created_at: '2020-07-23T00:00:00T',
  updated_at: null,
  deleted_at: null,
}

class CartModal extends React.Component<any, any> {
  state = {
    product: productMock,
    selectedVariant: null,
    isUserSelectVariant: false,
  }

  _selectVariant = attributes => {
    const { product } = this.state
    const variant = product.variants.find(_variant => {
      _variant.attribute_values = _variant.attribute_values
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

  getVariantData = id => {
    const { product } = this.state
    return product.variants.find(variant => variant.id === id)
  }

  render() {
    const { selectedVariant, product } = this.state
    const { navigation } = this.props
    const varianData = this.getVariantData(selectedVariant || 1)
    navigation.setOptions({
      header: () => {
        return <NavbarTopModal title="Add To Cart" />
      },
    })

    return (
      <Div
        _width="100%"
        _flex="1"
        align="flex-start"
        justify="flex-start"
        _padding="24px 16px">
        <ProductOverviewCart
          image={
            varianData ? { uri: varianData.image_urls[0] } : images.product
          }
          brand={product.brand.name.toUpperCase()}
          name={product.name}
          sale
        />
        <ProductAttributes
          attributes={product.attributes}
          onAllAttributesSelected={this._selectVariant}
        />
        <PressAbbleDiv>
          <Div _direction="row">
            <Font family="HelveticaNeue" size={14} _margin="0px 8px 0px 0px">
              Size Guide
            </Font>
            <Div
              _background={colors.black70}
              _height={12}
              _width={12}
              radius={12 / 2}>
              <Icon name="arrow-right" size={6} color="white" />
            </Div>
          </Div>
        </PressAbbleDiv>
        <AbsDiv
          _direction="row"
          justify="space-between"
          _background={colors.white}
          style={styles.bottomSheet}>
          <Div _flex={0.5} align="flex-start">
            <Font
              type="title"
              color={colors.black100}
              size={12}
              _margin="0px 0px 8px">
              Product Price
            </Font>
            <Font type="title" color={colors.red2} size={18}>
              {formatRupiah(product.max_price)}
            </Font>
          </Div>
          <Div _flex={0.5} align="flex-end">
            <Button
              onPress={() => {}}
              title="Add to Cart"
              fontStyle={styles.buttonText}
              style={styles.button}
              disabled={selectedVariant ? false : true}
            />
          </Div>
        </AbsDiv>
      </Div>
    )
  }
}

export default CartModal
