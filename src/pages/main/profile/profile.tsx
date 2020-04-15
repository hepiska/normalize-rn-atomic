import React, { createRef, useMemo } from 'react'
import { withNavigation } from 'react-navigation'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'

const ProfilPage = ({ navigation }) => {
  return (
    <Div _flex={1}>
      <Font>Profil page</Font>
      <PressAbbleDiv
        onPress={() => navigation.navigate('modals', { screen: 'LoginModal' })}
        _width={200}
        _height={30}
        _background="red"
        _margin="24px"
        radius={24}>
        <Font color="white">Login</Font>
      </PressAbbleDiv>
    </Div>
  )
}

export default withNavigation(ProfilPage)
