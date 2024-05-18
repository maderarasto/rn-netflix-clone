import Filter from '@src/components/Filter';
import MovieSlide from '@src/components/MovieSlide';
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import movies from '../../../assets/data.json';
import CategoryCarousel from '@src/components/CategoryCarousel';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  function getUnfinishedMovies() {
    return movies.filter((movie) => {
      if (!movie.progress)
        return false;

      return movie.progress > 0 && movie.progress < 1;
    })
  }

  function onFilterItemClick(filterKey: string) {
    setActiveFilter(filterKey);
  }

  return (
    <ScrollView style={styles.container}>
      <Filter activeFilter={activeFilter} onItemClick={onFilterItemClick} />
      <View style={{ marginBottom: 25, }}>
        <Text style={{ marginBottom: 25, fontSize: 16, color: 'white'}}>Continue Watching</Text>
        <ScrollView contentContainerStyle={{gap: 8}} horizontal>
          {getUnfinishedMovies().map((movie, index) => (
            <MovieSlide key={index} movie={movie} />
          ))}
        </ScrollView>
      </View>
      <CategoryCarousel title="Recommended for You" movies={movies} />
      <CategoryCarousel title="Favorite Series" movies={movies} />
    </ScrollView>
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
});
