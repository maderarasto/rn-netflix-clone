import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Movie } from '@src/types';
import { ORIGIN } from '@src/config';
import Rating from './Rating';
import { formatNumber } from '@src/utils';

type MovieCardParams = {
    movie: Movie;
  };

const MovieCard = ({
    movie
}: MovieCardParams) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `${ORIGIN}/assets/images/${movie.imagePath}` }}
        style={styles.posterImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.movieGenre}>{movie.tags[0]}</Text>
      <Rating value={movie.rating / 2}  />
      <Text style={{ fontSize: 10, color: 'gray' }}>
          {formatNumber(movie.reviews)} Reviews
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 100,
    },

    posterImage: {
        height: 150,
        marginBottom: 10,
        borderRadius: 10
    },

    movieTitle: {
        marginBottom: -2,
        fontWeight: 'bold',
        color: 'white',
    },

    movieGenre: {
        marginBottom: 5,
        fontSize: 11,
        color: 'red',
    }
})

export default MovieCard