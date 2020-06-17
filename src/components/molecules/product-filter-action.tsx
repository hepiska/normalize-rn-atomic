import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div } from '@components/atoms/basic'
import { Button, GradientButton } from '@components/atoms/button'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@utils/constants'
import { clearFilter, applyFilter } from '@modules/product-filter/action'
import { formatCur } from '@utils/helpers'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  bottomSheetHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  redFont: {
    color: colors.red2,
    fontWeight: 'bold',
  },
  whiteFont: {
    color: 'white',
  },
  largeButton: { flex: 1, display: 'flex' },
  buttonStyle: {
    marginHorizontal: 16,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  tab: {
    paddingHorizontal: 16,
  },
})

const ProductFilterAction = ({
  countedProducts,
  clearFilter,
  applyFilter,
}: any) => {
  const navigation = useNavigation()

  const _applyFilter = () => {
    applyFilter()
    navigation.goBack()
  }
  return (
    <Div
      _height="72px"
      zIndex="10000000"
      _flex="1"
      bg="white"
      align="stretch"
      _padding="18px 0px"
      style={styles.absoluteBottom}
      _width={width}
      _direction="row">
      <Button
        style={styles.buttonStyle}
        title="Clear All"
        onPress={() => clearFilter()}
        fontStyle={styles.redFont}
      />
      <GradientButton
        title={
          countedProducts.isLoading
            ? '...'
            : `Show ${formatCur(countedProducts.count)} Products`
        }
        disabled={countedProducts.isLoading || !countedProducts.count}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ ...styles.largeButton, ...styles.buttonStyle }}
        colors={['#3067E4', '#8131E2']}
        fontStyle={styles.whiteFont}
        onPress={_applyFilter}
      />
    </Div>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter, applyFilter }, dispatch)

const mapStateToProps = state => ({
  countedProducts: state.productFilter.countedProducts,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilterAction)
