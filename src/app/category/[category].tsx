import { Text, Image, StyleSheet, TouchableOpacity, NativeModules, ScrollView, View, StyleProp, ViewStyle, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Feather, Ionicons } from '@expo/vector-icons'

import PageHeader from '@src/components/PageHeader'
import MovieCard from '@src/components/MovieCard'
import { shuffleItems } from '@src/utils'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Movie } from '@src/types'

import movies from '../../../assets/data.json';

const CategoryPage = () => {
  const [shuffledMovies, setShuffledMovies] = useState<Movie[]>([]);
  const [scrollDown, setScrollDown] = useState(false);

  const {category} = useLocalSearchParams();
  const router = useRouter();
  const {StatusBarManager} = NativeModules;

  useEffect(() => {
    setShuffledMovies(shuffleItems(movies));
  }, []);

  function resolveHeaderStyle() {
    const headerStyle: StyleProp<ViewStyle> = {
      position: 'absolute',
      top: StatusBarManager.HEIGHT,
      left: 0,
      width: '100%',
      zIndex: 10,
    };

    if (scrollDown) {
      headerStyle.backgroundColor = 'rgba(0, 0, 0, 0.25)';
    }

    return headerStyle;
  }

  function resolveTitle() {
    return (category as string).split('-').reduce((title, token, tokenIndex, tokens) => {
      let result = title + `${token.charAt(0).toUpperCase()}${token.substring(1)}` ;

      if (tokenIndex < (tokens.length - 1)) {
        result += ' ';
      }

      return result;
    }, '');
  }

  function onBackPress() {
    router.back();
  }

  function onScroll(ev: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollDown(ev.nativeEvent.contentOffset.y > 0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen options={{
        headerShown: false,
      }} />
      <PageHeader options={{
        headerStyle: resolveHeaderStyle(),
        headerLeft: () => (
          <TouchableOpacity onPress={onBackPress}>
            <Feather name="chevron-left" size={28} color="white" />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Image source={require('../../../assets/images/netflix_logo.png')} style={styles.headerTitleImage} />
        ),
        headerRight: () => (
          <Ionicons name="heart-outline" size={28} color={Colors.light.primary} />
        )
      }} />
      <ScrollView contentContainerStyle={styles.scrollContentContainer} onScroll={onScroll}>
        <Text style={styles.categoryTitle}>{resolveTitle()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, }}>
          {shuffledMovies.map((movie, index) => (
              <MovieCard key={`movie-${index}`} movie={movie} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'black',
  },

  headerTitleImage: { 
    width: 70, 
    height: 30, 
    marginBottom: 10 
  },

  scrollContentContainer: {
    flexGrow: 1,
    paddingTop: 55,
    paddingHorizontal: 10,
    // paddingBottom: 55,
  },

  categoryTitle: {
    marginBottom: 20,
    fontSize: 20,
    color: 'white'
  }
})

export default CategoryPage