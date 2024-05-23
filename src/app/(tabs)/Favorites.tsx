import MovieCard from '@src/components/MovieCard';
import { useAsyncStorage } from '@src/hooks/useAsyncStorage';
import { Movie } from '@src/types';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';

import movies from '../../../assets/data.json';

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useAsyncStorage<string[]>('favorites', []);

  function getFavorites() {
    return favoriteIds ? movies.filter((movie) => favoriteIds.includes(movie.id)) : [];
  }

  console.log(getFavorites());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {getFavorites().length === 0 ? (
        <View style={styles.messageOverlay}>
          <Text style={{ color: '#aaa' }}>No favorites added.</Text> 
        </View>
      ) : ''}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, }}>
        {getFavorites().map((movie, index) => (
          <MovieCard key={`movie-${index}`} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

const dimensions = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'black',
  },

  title: {
    marginBottom: 20,
    fontSize: 20,
    color: 'white'
  },

  messageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
