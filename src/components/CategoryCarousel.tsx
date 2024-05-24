import { View, Text, ScrollView, StyleSheet, RegisteredStyle, TextStyle, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

type CategoryCarouselParams = {
  containerStyle?: StyleProp<ViewStyle>
  header?: () => React.JSX.Element
  children?: React.ReactNode
}

const CategoryCarousel = ({
  containerStyle = {},
  header,
  children,
}: CategoryCarouselParams) => {
  function resolveContainerStyle() {
    return {
      ...styles.container,
      ...(containerStyle as object),
    };
  }

  return (
    <View style={resolveContainerStyle()}>
        <View style={styles.categoryHeader}>
          { header ? header() : ''}
        </View>
        <ScrollView contentContainerStyle={styles.carouselContainer} horizontal>
          {children}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },    

    carouselContainer: {
        gap: 12,
    }
});

export default CategoryCarousel