import Filter from '@src/components/Filter';
import MovieSlide from '@src/components/MovieSlide';
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import movies from '../../../assets/data.json';
import CategoryCarousel from '@src/components/CategoryCarousel';
import MovieCard from '@src/components/MovieCard';
import { Fontisto } from '@expo/vector-icons';
import Colors from '@src/constants/Colors';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { shuffleItems } from '@src/utils';

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
      <StatusBar style="light" />
      <Filter activeFilter={activeFilter} onItemClick={onFilterItemClick} />
      <View style={{ marginBottom: 25, }}>
        <Text style={{ marginBottom: 25, fontSize: 16, color: 'white'}}>Continue Watching</Text>
        <ScrollView contentContainerStyle={{gap: 8}} horizontal>
          {getUnfinishedMovies().map((movie, index) => (
            <MovieSlide key={index} movie={movie} />
          ))}
        </ScrollView>
      </View>
      <CategoryCarousel header={() => (
        <>
          <Text style={{ fontSize: 16, color: 'white'}}>Recommended for You</Text>
          <Link href="/category/recommended-for-you" style={{ fontSize: 14, color: Colors.light.primary }}>View all</Link>
        </>
      )}>
        {shuffleItems(movies).slice(4).map((movie, index) => (
            <MovieCard key={`recommended-${index}`} movie={movie} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel header={() => (
        <>
          <Text style={{ fontSize: 16, color: 'white'}}>Favorite Series</Text>
          <Link href="/category/favorite-series" style={{ fontSize: 14, color: Colors.light.primary }}>View all</Link>
        </>
      )}>
        {shuffleItems(movies).slice(4).map((movie, index) => (
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
