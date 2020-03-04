import React from 'react';
// import { Text } from 'react-native';
import { Div, Font } from '@components/atoms/basic';
import HorizontalListLookBook from '@components/organisms/horzontal-list-lookbook';

const DiscoverPage = () => {
  return (
    <Div>
      <Div bg="black" _height="100px" _width="100px"></Div>
      <Font>discover Page</Font>
      <HorizontalListLookBook />
    </Div>
  );
};

export default DiscoverPage;
