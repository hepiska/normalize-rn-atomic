import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Div,
  PressAbbleDiv,
  Image,
  Font,
  TouchableWithoutFeedback,
} from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import {
  helveticaBlackBold,
  helveticaNormalFont12,
} from '@components/commont-styles'
import { colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import InviniteLoader from '@components/atoms/loaders/invinite'

interface CardListItemType {
  collection: any
  idx: string | number
  onPress: () => void
}

const styles = StyleSheet.create({
  collection: {
    width: 246,
    height: 164,
    borderRadius: 8,
  },
  touchableDiv: {
    overflow: 'hidden',
    marginRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    width: 246,
  },
})

class CardListItem extends React.PureComponent<CardListItemType, any> {
  render() {
    const { collection, idx, onPress } = this.props

    return collection ? (
      <TouchableWithoutFeedback onPress={onPress}>
        <Div
          style={{
            ...styles.touchableDiv,
            marginLeft: idx === 0 ? 16 : 0,
          }}>
          <Image
            source={{
              uri: setImage(collection.image_url, { ...styles.collection }),
            }}
            style={styles.collection}
          />
          <React.Fragment>
            <Font {...helveticaBlackBold} mar="16px 0 0 0">
              {collection.title}
            </Font>
            <Font {...helveticaNormalFont12} mar="8px 0 0 0">
              {collection.title} {/* revisi: diganti dengan description */}
            </Font>
            <PressAbbleDiv
              align="flex-start"
              flexDirection="row"
              mar="8px 0 0 0"
              onPress={
                () =>
                  console.log(
                    'shop now pressed',
                  ) /* revisi: diganti dengan navigasi ke halaman shop now */
              }>
              <Div
                style={{
                  borderBottomColor: colors.black80,
                  borderBottomWidth: 1,
                }}>
                <Font {...helveticaNormalFont12} color={colors.black80}>
                  Shop now
                </Font>
              </Div>
              <Div justify="flex-end" _width="12px" _height="12px">
                <Icon name="chevron-right" size={8} color={colors.black80} />
              </Div>
            </PressAbbleDiv>
          </React.Fragment>
        </Div>
      </TouchableWithoutFeedback>
    ) : (
      <InviniteLoader />
    )
  }
}

export default CardListItem
