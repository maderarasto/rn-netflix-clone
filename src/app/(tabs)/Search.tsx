import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleProp, StyleSheet,  TextInput, View, ViewStyle } from 'react-native';

import movies from '../../../assets/data.json';
import { Movie } from '@src/types';
import MovieCard from '@src/components/MovieCard';
import { useDebounce } from '@src/hooks/useDebounce';
import Colors from '@src/constants/Colors';

export default function Search() {
  const [foundMovies, setFoundMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  useDebounce(() => {
    findMovies();
    setLoading(false);
  }, [searchText], 250);

  function resolveIndicatorStyle() {
    const indicatorStyle: StyleProp<ViewStyle> = {
      ...styles.loadingIndicator,
    };

    if (loading) {
      indicatorStyle.display = 'flex';
    }

    return indicatorStyle;
  }

  function findMovies() {
    setFoundMovies(
      movies.filter(({ title }) => title.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  function onInputChangeText(text: string) {
    setLoading(true);
    setSearchText(text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color="white" />
        <TextInput style={styles.textInput} placeholderTextColor="#aaa" placeholder="Search movies..." onChangeText={onInputChangeText} />
        <ActivityIndicator size="small" color={Colors.light.primary} style={resolveIndicatorStyle()} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, }}>
          {foundMovies.map((movie, index) => (
            <MovieCard key={`movie-${index}`} movie={movie} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: 'black',
  },

  title: {
    marginBottom: 20,
    fontSize: 20,
    color: 'white'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#aaa',
    backgroundColor: '#262626',
  },

  textInput: {
    flex: 1,
    color: 'white'
  },

  loadingIndicator: {
    display: 'none',
  },

  messageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
