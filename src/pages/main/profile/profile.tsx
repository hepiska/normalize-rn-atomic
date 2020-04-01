import React, { createRef, useMemo } from 'react'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { withAuthModal } from '@components/organisms/auth-modal'

const ButtonAuth = withAuthModal(({ openModal }) => {
  return (
    <PressAbbleDiv
      onPress={openModal}
      _width={200}
      _height={30}
      _background="red"
      _margin="24px"
      radius={24}>
      <Font color="white">Login</Font>
    </PressAbbleDiv>
  )
})

const ProfilPage = () => {
  return (
    <Div _flex={1}>
      <Font>Profil page</Font>
      <ButtonAuth />
    </Div>
  )
}

export default ProfilPage
