import React from "react"
import Animated from "react-native-reanimated";
import {
  View, StyleSheet,
} from "react-native";
import { onScroll } from "react-native-redash";
import { colors, globalDimention } from '@utils/constants'
import { Div, ScrollDiv } from '@components/atoms/basic'




const {
  interpolate, Extrapolate,
} = Animated;




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  padd: {
    paddingBottom: 56
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  header: {
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});


const ImageCoverContentLayout = ({ y, children, dimentionConstant }) => {

  const height = interpolate(y, {
    inputRange: [-dimentionConstant.imageHeight, -10 / 2],
    outputRange: [0, dimentionConstant.imageHeight + 10],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-dimentionConstant.imageHeight / 2, 0, dimentionConstant.imageHeight / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <ScrollDiv
      as={Animated.ScrollView}
      _width='100%'
      scrollEventThrottle={2}
      style={{ paddingTop: globalDimention.headerHeight + 20 }} onScroll={onScroll({ y })}>
      <View style={[styles.cover, { height: dimentionConstant.imageHeight - globalDimention.headerHeight }]}>
        <Animated.View
          style={[styles.gradient, { height }]}
        >
        </Animated.View>
      </View>
      {children}
    </ScrollDiv >
  )
}

export default ImageCoverContentLayout