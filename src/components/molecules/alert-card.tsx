import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import IconMe from 'react-native-vector-icons/MaterialIcons'
import { colors } from '@src/utils/constants'
import { Button } from '@components/atoms/button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    ...fontStyle.playfairBold,
    color: colors.black100,
    width: '90%',
  },
  desc: {
    fontSize: 14,
    marginTop: 16,

    ...fontStyle.helvetica,
    color: colors.black70,
    marginBottom: 24,
  },
  btnSubmit: {
    width: '100%',
    backgroundColor: colors.black100,
    height: 46,
  },
  btnSubmitText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
})

const AlertCard = ({
  title,
  desc,
  action,
  onClose,
  tittleDescComp,
  descActionComp,
  afterActionComponent,
}: any) => {
  return (
    <View style={styles.container}>
      <IconMe
        onPress={onClose}
        name="close"
        size={14}
        color={colors.black70}
        style={styles.icon}
      />
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}

      {tittleDescComp && tittleDescComp}

      {typeof desc === 'string' ? (
        <Text style={styles.desc}>{desc}</Text>
      ) : (
        desc
      )}
      {descActionComp}
      <View style={{ marginTop: 16 }}>
        {action && (
          <Button
            title={action.title}
            onPress={action.onPress}
            style={styles.btnSubmit}
            fontStyle={styles.btnSubmitText}
            loading={action.loading}
            loaderColor={colors.white}
          />
        )}
      </View>

      {afterActionComponent && afterActionComponent}
    </View>
  )
}
export default AlertCard
