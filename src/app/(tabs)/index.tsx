import Filter from '@src/components/Filter';
import MovieSlide from '@src/components/MovieSlide';
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import movies from '../../../assets/data.json';
import CategoryCarousel from '@src/components/CategoryCarousel';
import MovieCard from '@src/components/MovieCard';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  function getUnfinishedMovies() {
    return movies.filter((movie) => {
      if (!movie.progress)
        return false;

      return movie.progress > 0 && movie.progress < 1;
    })
  }

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
      <CategoryCarousel title="Recommended for You">
        {getShuffledMovies().map((movie, index) => (
            <MovieCard key={`recommended-${index}`} movie={movie} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Favorite Series">
        {getShuffledMovies().map((movie, index) => (
            <MovieCard key={`favorite-${index}`} movie={movie} />
        ))}
      </CategoryCarousel>
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
