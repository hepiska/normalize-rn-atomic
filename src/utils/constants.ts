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

export const contextMaping = {
  color: 'color_ids',
  category: 'category_ids',
  material: 'material_ids',
  pattern: 'pattern_ids',
  skin_concern: 'skin_concern_ids',
  skin_type: 'skin_type_ids',
  style: 'style_ids',
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
  greenAccent: '#00B800',
  blue1: '#2F80ED',
  blue2: '#2D9CDB',
  blue3: '#56CCF2',
  blue50: '#455BE3',
  blue60: '#114CD4',
  background: '#FFF',
  grayBg: '#E5E5E5',
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
  ActivePurple: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    colors: ['#3067E4', '#8131E2'],
  },
}

export const shimmerLoader = {
  backgroundColor: '#f5f5f5',
  foregroundColor: '#f1f1f1',
  animate: true,
  speed: 2,
}

export const regex: any = {
  phoneNumber: /^(^\+62\s?|^0)(\d{3,4}){2}\d{3,4}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  card_number: /^(?:(4[0-9]{3}(?:\s[0-9]{4}){3})|(5[1-5][0-9]{2}(?:\s[0-9]{4}){3})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))(\s{0,5})?$/,
  expired_date: /^((0[1-9])|(1[0-2]))[\/]*(([1-4][0-9]))$/,
  cvv: /^[0-9]{3,4}$/,
  new_password: /^[A-Za-z\d]{8,}$/,
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
      screen: 'Screens',
      defaultScreen: 'ColectionList',
      params: {
        screen: 'CollectionProductList',
        params,
      },
    },
    collection: {
      screen: 'Screens',
      defaultScreen: 'ColectionList',
      params: {
        screen: 'CollectionProductList',
        params,
      },
    },
    categories: {
      screen: 'Screens',
      defaultScreen: 'CategoryList',
      params: {
        screen: 'CategoryProductList',
        params,
      },
    },
    brands: {
      screen: 'Screens',
      defaultScreen: 'BrandList',
      params: {
        screen: 'BrandProductList',
        params,
      },
    },
    users: {
      screen: 'Screens',
      params: {
        screen: 'UserDetail',
        params,
      },
    },
    insiders: {
      screen: 'Screens',
      params: {
        screen: 'UserDetail',
        params,
      },
    },
    posts: {
      screen: 'Screens',
      params: {
        screen: 'PostDetail',
        params,
      },
    },
    articles: {
      screen: 'Screens',
      params: {
        screen: 'PostDetail',
        params,
      },
    },
  }
  return map[key]
}
