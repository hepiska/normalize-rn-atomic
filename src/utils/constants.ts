import DeviceInfo from 'react-native-device-info'
const hasNotch = DeviceInfo.hasNotch()
import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

export const shadows = {
  idle: `shadow-color: #000;
      shadow-offset: {width: 0, height: 2};
      shadow-opacity: 0.1;
      shadow-radius: 8;
      elevation: 2;
  `,
  focused: `shadow-color: #000;
  shadow-offset:{width: 0, height: 2};
  shadow-opacity: 0.16  ;
  shadow-radius: 8;
  elevation: 5;
`,
}
export const colors = {
  font1: '#1A1A1A',
  font2: '#454545',
  gray1: '#333333',
  gray2: '#4F4F4F',
  gray3: '#737373',
  gray4: '#828282',
  gray5: '#BDBDBD',
  gray6: '#E0E0E0',
  gray7: '#F2F2F2',
  redBookmark: '#E13661',
  red1: '#EB5757',
  red2: '#FF5252',
  orange: '#F2994A',
  yellow: '#F2C94C',
  green1: '#219653',
  green2: '#27AE60',
  green3: '#6FCF97',
  blue1: '#2F80ED',
  blue2: '#2D9CDB',
  blue3: '#56CCF2',
  blue50: '#455BE3',
  blue60: '#114CD4',
  background: '#FFF',
  purple1: '#9B51E0',
  purple2: '#BB6BD9',
  white: '#FFFFFF',
  black10: '#F8F8F8',
  black50: '#EFEFEF',
  black60: '#949494',
  black70: '#737373',
  black80: '#454545',
  black90: '#949494',
  black100: '#1A1A1A',
}

export const regex: any = {
  phoneNumber: /^(^\+62\s?|^0)(\d{3,4}){2}\d{3,4}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
}
export const images = {
  product: require('@assets/placeholder/placeholder2.jpg'),
}

const styles = StyleSheet.create({
  jumbotronSize: {
    width: width,
    height: Math.round((2 / 3) * width),
  },
})

export const globalDimention = {
  headerHeight: 56,
  jumbotronSize: styles.jumbotronSize,
  // firstComponentMargin: hasNotch ? '22px 0px 0px' : '0px',
}

export const uriSchreenMap = {
  collection: {
    parent: 'Shop',
    path: 'ProductList',
    paramId: 'collectionId',
  },
  brand: {
    parent: 'Shop',
    path: 'ProductList',
    paramId: 'brandId',
  },
}

export const nestedScreenMap = (key, params?) => {
  const map = {
    collections: {
      screen: 'Shop',
      defaultScreen: 'ColectionList',
      params: {
        screen: 'ProductList',
        params,
      },
    },
    categories: {
      screen: 'Shop',
      defaultScreen: 'CategoryList',
      params: {
        screen: 'ProductList',
        params,
      },
    },
    brands: {
      screen: 'Shop',
      defaultScreen: 'BrandList',
      params: {
        screen: 'ProductList',
        params,
      },
    },
  }
  return map[key]
}
