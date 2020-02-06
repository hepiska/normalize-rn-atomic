import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic';

const AddButton = () => {
  return (
    <Div _position="absolute" align="center">
      <PressAbbleDiv
        _width="32px"
        _height="32px"
        bg="white"
        radius="16px"
        style={{ top: -8 }}>
        <Icon name="plus-circle" size={32} />
      </PressAbbleDiv>
    </Div>
  );
};

export default AddButton;
