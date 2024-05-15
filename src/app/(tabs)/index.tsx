import Filter from '@src/components/Filter';
import MovieSlide from '@src/components/MovieSlide';
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import * as movies from '../../../assets/data.json';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  function onFilterItemClick(filterKey: string) {
    setActiveFilter(filterKey);
  }

  return (
    <View style={styles.container}>
      <Filter activeFilter={activeFilter} onItemClick={onFilterItemClick} />
      <View>
        <Text style={{ marginBottom: 25, fontSize: 16, color: 'white'}}>Continue Watching</Text>
        <ScrollView horizontal>
          <MovieSlide movie={movies[0]} />
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
});
