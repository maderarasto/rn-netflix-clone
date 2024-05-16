import Filter from '@src/components/Filter';
import MovieSlide from '@src/components/MovieSlide';
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import * as movies from '../../../assets/data.json';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MovieCard from '@src/components/MovieCard';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  function getUnfinishedMovies() {
    return Object.values(movies).filter((movie) => {
      return movie.progress > 0 && movie.progress < 1;
    })
  }

  function onFilterItemClick(filterKey: string) {
    setActiveFilter(filterKey);
  }

  return (
    <View style={styles.container}>
      <Filter activeFilter={activeFilter} onItemClick={onFilterItemClick} />
      <View style={{ marginBottom: 25, }}>
        <Text style={{ marginBottom: 25, fontSize: 16, color: 'white'}}>Continue Watching</Text>
        <ScrollView contentContainerStyle={{gap: 8}} horizontal>
          {getUnfinishedMovies().map((movie, index) => (
            <MovieSlide key={index} movie={movie} />
          ))}
        </ScrollView>
      </View>
      <View>
        <View style={styles.categoryHeader}>
          <Text style={{  fontSize: 16, color: 'white'}}>Recommended for You</Text>
          <Link href="/" style={styles.categoryLink}>
            View all
          </Link>
        </View>
        <ScrollView contentContainerStyle={{gap: 12}} horizontal>
          {getUnfinishedMovies().map(movie => (
            <MovieCard movie={movie} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  categoryLink: {
    fontSize: 14,
    color: 'red'
  }
});
