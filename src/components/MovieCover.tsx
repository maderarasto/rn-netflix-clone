import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native'
import React from 'react'
import {ClipPath, Defs, Image, Path, Polygon, Rect, Svg} from 'react-native-svg';

type MovieCoverParams = {
  imageSource: string | ImageSourcePropType
  children?: React.ReactNode,
}

const MovieCover = ({
  imageSource,
  children
}: MovieCoverParams) => {
  const screenDimensions = Dimensions.get('screen');

  function resolveCurveX(curvePoint: 'first' | 'second') {
    return curvePoint === 'first' 
      ? Math.floor(screenDimensions.width / 4) 
      : Math.floor(screenDimensions.width - (screenDimensions.width / 4))
  };
  
  return (
    <View style={styles.container}>
      <Svg width={Math.ceil(screenDimensions.width)} height="350" viewBox={`0 0 ${screenDimensions.width} 350`} style={styles.cover}>
        <Defs>
          <ClipPath id="clip">
            <Path d={`M 0 0 L 0 300 C ${resolveCurveX('first')} 350, ${resolveCurveX('second')} 350, 400 300 L 400 0 Z`} stroke="black" />
          </ClipPath>
        </Defs>
        <Image y="-30" width={screenDimensions.width} height="525" href={imageSource} clipPath="#clip"  preserveAspectRatio="none" />
      </Svg>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 350,
    },

    cover: {
      position: 'absolute',
      width: '100%',
      opacity: 0.93,
    }
});

export default MovieCover