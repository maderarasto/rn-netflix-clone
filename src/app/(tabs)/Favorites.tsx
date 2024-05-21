import MovieCard from '@src/components/MovieCard';
import { Movie } from '@src/types';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <View style={styles.messageOverlay}>
          <Text style={{ color: '#aaa' }}>No favorites added.</Text> 
        </View>
      ) : ''}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, }}>
        {favorites.map((movie, index) => (
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
