import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import MovieCard from './MovieCard'
import { Link } from 'expo-router'
import { Movie } from '@src/types'

type CategoryCarouselParams = {
    title: string
    movies: Movie[]
}

const CategoryCarousel = ({
    title,
    movies,
}: CategoryCarouselParams) => {
    function getShuffledMovies(limit = 4) {
        return movies.map((movie) => ({ 
          movie, 
          sort: Math.random() 
        })).sort((a, b) => {
          return a.sort - b.sort;
        }).filter((_, index) => {
            return index < limit;
          }).map(({movie}) => movie);
    }

  return (
    <View style={styles.container}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Link href="/" style={styles.categoryLink}>
            View all
          </Link>
        </View>
        <ScrollView contentContainerStyle={styles.carouselContainer} horizontal>
          {getShuffledMovies().map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
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