import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@components/molecules/navbar-top'
import ListInterest from '@src/components/layouts/list-interest'
import { GradientButton } from '@components/atoms/button'
import {
  oily,
  normal,
  dry,
  combination,
  sensitive,
  allType,
  darkSpot,
  brightening,
  antiAging,
  acne,
  redness,
  pore,
  dryControl,
  oilControl,
  blackhead,
} from '@src/utils/image-skin'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '@src/utils/constants'
import { fontStyle, formStyles } from '@src/components/commont-styles'

const dummy = [
  {
    id: 1,
    title: 'Normal Skin',
    image: normal,
  },
  {
    id: 2,
    title: 'Dry Skin',
    image: dry,
  },
  {
    id: 3,
    title: 'Oily Skin',
    image: oily,
  },
  {
    id: 4,
    title: 'Combination Skin',
    image: combination,
  },
  {
    id: 5,
    title: 'Sensitive Skin',
    image: sensitive,
  },
  {
    id: 6,
    title: 'All Type Skin',
    image: allType,
  },
]

const dummy2 = [
  {
    id: 1,
    title: 'Dark Spot',
    image: darkSpot,
  },
  {
    id: 2,
    title: 'Brightening',
    image: brightening,
  },
  {
    id: 3,
    title: 'Anti Aging',
    image: antiAging,
  },
  {
    id: 4,
    title: 'Acne / Acne Scars',
    image: acne,
  },
  {
    id: 5,
    title: 'Redness',
    image: redness,
  },
  {
    id: 6,
    title: 'Pore',
    image: pore,
  },
  {
    id: 7,
    title: 'Dry Control',
    image: dryControl,
  },
  {
    id: 8,
    title: 'Oil Control',
    image: oilControl,
  },
  {
    id: 9,
    title: 'Blackhead / Whitehead',
    image: blackhead,
  },
]

class BeautyProfile extends React.Component<any, any> {
  state = {
    selectedSkinType: [], //[{ id: 7 }, { id: 5 }]
    selectedSkinConcern: [],
  }

  handleSelectedSkinType = id => {
    this.setState({
      selectedSkinType: [{ id: id }],
    })
  }

  handleSelectedSkinConcern = id => {
    const isSelected = this.state.selectedSkinConcern.find(
      value => value.id === id,
    )
    let newSelected
    if (isSelected) {
      newSelected = this.state.selectedSkinConcern.filter(
        value => value.id !== id,
      )
    } else {
      newSelected = [...this.state.selectedSkinConcern, { id: id }]
    }
    this.setState({
      selectedSkinConcern: newSelected,
    })
  }

  render() {
    const title = this.state.selectedSkinType.length > 0 ? 'Save' : 'Edit'
    return (
      <>
        <NavbarTop leftContent={['back']} title="Beauty Profile" />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                ...fontStyle.playfairBold,
                color: colors.black100,
                fontSize: 24,
                paddingHorizontal: 16,
                paddingVertical: 24,
              }}>
              Skin Type
            </Text>
            <ListInterest
              data={dummy}
              handleSelected={this.handleSelectedSkinType}
              selected={this.state.selectedSkinType}
              style={{ paddingBottom: 16 }}
              isPressable
            />
          </View>
          <View>
            <Text
              style={{
                ...fontStyle.playfairBold,
                color: colors.black100,
                fontSize: 24,
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}>
              Skin Concern
            </Text>
            <Text
              style={{
                ...fontStyle.helvetica,
                color: colors.black70,
                fontSize: 14,
                paddingHorizontal: 16,
              }}>
              You can choose more than one skin concern
            </Text>
            <ListInterest
              data={dummy2}
              handleSelected={this.handleSelectedSkinConcern}
              selected={this.state.selectedSkinConcern}
              style={{ paddingTop: 16 }}
              isPressable
            />
          </View>
        </ScrollView>
        <View style={{ padding: 16 }}>
          <GradientButton
            {...colors.ActivePurple}
            disabled={
              title === 'Save' && this.state.selectedSkinType.length === 0
            }
            style={formStyles.button}
            onPress={() => {}}
            title={title}
            fontStyle={{
              color: colors.white,
              ...fontStyle.helveticaBold,
              fontSize: 14,
            }}
          />
        </View>
      </>
    )
  }
}

export default BeautyProfile
