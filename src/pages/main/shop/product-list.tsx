import React from 'react'
import { Dimensions, Button } from 'react-native'
import { Div, Font, Image, ScrollDiv, PressAbbleDiv } from '@components/atoms/basic'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import CoverImageAimated from '@src/components/organisms/cover-image-animated'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagesWithPreviews from '@components/organisms/images-with-preview'
import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import Animated from "react-native-reanimated";





const { Value } = Animated;
const { width } = Dimensions.get('screen');

class ProductListPage extends React.Component<any, any>{
  state = {

    product: {
      name: 'Klara Dress Mustard',
      brand: 'AT NOON',
      price: 'Rp 1.500.000'
    }
  }

  dimentionConstant = {
    imageHeight: width * (3 / 2),

  }

  static navigationOptions = {
    headerTransparent: true,
    // headerShown: false
  }

  render() {
    const { navigation } = this.props
    const y = new Value(0)
    const { product, } = this.state
    navigation.setOptions({
      header: ({ scene, previous, navigation }) => {
        return (
          <NavbarTopAnimated
            parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
            LeftMenu={() => <Icon name='chevron-left' size={20} color='white' />}
            y={y} Title={this.state.product.name} />
        )
      }
    })

    return (
      <Div _width='100%' justify='flex-start'>
        <CoverImageAimated y={y} width={width} height={this.dimentionConstant.imageHeight} >
          <ImagesWithPreviews
            size={{ width, height: this.dimentionConstant.imageHeight }}
            images={[{ uri: 'https://shonet.imgix.net/images/28df4f6b-5226-42bc-8c34-c76688fb7de1-1580651365.jpeg?q=75&auto=compress,format&w=800' }, { uri: 'https://shonet.imgix.net/images/28df4f6b-5226-42bc-8c34-c76688fb7de1-1580651365.jpeg?q=75&auto=compress,format&w=800' }]}
          />
        </CoverImageAimated>
        <ImageCoverContentLayout y={y} dimentionConstant={this.dimentionConstant}>
          <Div bg='white' _width='100%'>

            <ProductOverviewCard product={product}></ProductOverviewCard>
            <ProductOverviewCard product={product}></ProductOverviewCard>

            <ProductOverviewCard product={product}></ProductOverviewCard>

            <ProductOverviewCard product={product}></ProductOverviewCard>

            <ProductOverviewCard product={product}></ProductOverviewCard>

            <ProductOverviewCard product={product}></ProductOverviewCard>
          </Div>


        </ImageCoverContentLayout>

      </Div >

    )
  }
}


export default ProductListPage