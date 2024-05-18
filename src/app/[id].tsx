import { Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieCover from '@src/components/MovieCover'
import { StatusBar } from 'expo-status-bar'
import { Movie } from '@src/types'

import movies from '../../assets/data.json';
import { ORIGIN } from '@src/config'
import PageHeader from '@src/components/PageHeader'
import Feather from '@expo/vector-icons/build/Feather'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@src/constants/Colors'


const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie|null>(null);
  const {id} = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log(id);
    const foundMovie = movies.find((currentMovie) => {
      return currentMovie.id === id;
    });

    if (!foundMovie) {
      router.replace('/(tabs)');
      return;
    }

    setMovie(foundMovie);
  }, []);

  function onBackPress() {
    router.back();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="light"  backgroundColor="black" />
      <Stack.Screen options={{
        headerShown: false,
      }} />
        <MovieCover imageSource={{ uri: `${ORIGIN}/assets/images/${movie?.imagePath}`}}>
          <PageHeader options={{
            headerLeft: () => (
              <TouchableOpacity onPress={onBackPress}>
                <Feather name="chevron-left" size={28} color="#f2f2f2" />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image source={require('../../assets/images/netflix_logo.png')} style={styles.headerTitleImage} />
            ),
            headerRight: () => (
              <Ionicons name="heart-outline" size={28} color={Colors.light.primary} />
            )
          }} />
        </MovieCover>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>MovieDetails</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerTitleImage: { 
    width: 70, 
    height: 30, 
    marginBottom: 10 
  },

  contentContainer: {
    flexGrow: 1,
  }
})

export default MovieDetails