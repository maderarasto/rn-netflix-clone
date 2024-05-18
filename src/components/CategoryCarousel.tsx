import { View, Text, ScrollView, StyleSheet, RegisteredStyle, TextStyle, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import MovieCard from './MovieCard'
import { Link } from 'expo-router'
import { Movie } from '@src/types'

type CategoryCarouselParams = {
  title: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
}

const CategoryCarousel = ({
  title,
  containerStyle = {},
  titleStyle = {},
  children,
}: CategoryCarouselParams) => {
  function resolveContainerStyle() {
    return {
      ...styles.container,
      ...(containerStyle as object),
    };
  }

  function resolveTitleStyle() {
    return {
      ...styles.categoryTitle,
      ...(titleStyle as object),
    };
  }

  return (
    <View style={resolveContainerStyle()}>
        <View style={styles.categoryHeader}>
          <Text style={resolveTitleStyle()}>{title}</Text>
          <Link href="/" style={styles.categoryLink}>View all</Link>
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

    categoryTitle: {
        fontSize: 16,
        color: 'white',
    },
    
    categoryLink: {
        fontSize: 14,
        color: 'red'
    },

    carouselContainer: {
        gap: 12,
    }
});

export default CategoryCarousel