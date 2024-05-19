import { Text, StyleSheet, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieCover from '@src/components/MovieCover'
import { StatusBar } from 'expo-status-bar'
import { Movie } from '@src/types'

import movies from '../../assets/data.json';
import { ORIGIN } from '@src/config'
import PageHeader from '@src/components/PageHeader'
import Feather from '@expo/vector-icons/build/Feather'
import { Entypo, Ionicons } from '@expo/vector-icons'
import Colors from '@src/constants/Colors'
import Rating from '@src/components/Rating'
import MovieDetail from '@src/components/MovieDetail'
import CategoryCarousel from '@src/components/CategoryCarousel'
import MovieGallery, { MovieGalleryMethods } from '@src/components/MovieGallery'


const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie|null>(null);

  const galleryRef = useRef<MovieGalleryMethods>(null);
  const {id} = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
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

  function openScreenshot(screenshotIndex: number) {
    galleryRef.current?.openGallery(screenshotIndex);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light"  backgroundColor="black" />
        <Stack.Screen options={{
          headerShown: false,
        }} />
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <MovieCover imageSource={{ uri: `${ORIGIN}/assets/images/${movie?.imagePath}`}}>
            <PageHeader options={{
              headerLeft: () => (
                <TouchableOpacity onPress={onBackPress}>
                  <Feather name="chevron-left" size={28} color="white" />
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled style={{opacity: 0.3}}>
              <Entypo name="plus" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPlay}>
              <Ionicons name="play" size={28} color={Colors.light.primary} style={{ marginLeft: 2}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="share" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25, }}>
            <View style={styles.detailsContainer}>
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              <View style={styles.tagsContainer}>
                {movie?.tags.map((tagName, index, tags) => (
                  <>
                    <Text key={`tag-${index}`} style={{ fontSize: 13, color: '#737373'}}>{tagName}</Text>
                    {index < (tags.length - 1) ? <View key={`divider-${index}`} style={{ width: 1, backgroundColor: '#a3a3a3'}}></View> : ''}
                  </>
                ))}
              </View>
              <Rating value={(movie?.rating as number) /2} iconSize={20} />
              <View style={styles.detailsRow}>
                <MovieDetail label="Year" value={movie?.year as string} />
                <MovieDetail label="Country" value={movie?.country as string} />
                <MovieDetail label="Length" value={movie?.length as string} />
              </View>
              <Text style={styles.movieDescription}>{movie?.description}</Text>
            </View>
            <CategoryCarousel title="Screenshots" titleStyle={{ fontWeight: 'bold', color: 'black' }}>
                {movie?.screenshots.map((screenshotPath, index) => (
                  <TouchableOpacity onPress={() => openScreenshot(index)}>
                    <Image key={`screenshot-${index}`} source={{ uri: `${ORIGIN}/assets/images/${screenshotPath}`}} style={styles.screenshotImage}  />
                  </TouchableOpacity>
                ))}
            </CategoryCarousel>
          </View>
        </ScrollView>
      </SafeAreaView>
      <MovieGallery ref={galleryRef} movie={movie as Movie} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  headerTitleImage: { 
    width: 70, 
    height: 30, 
    marginBottom: 10 
  },

  scrollContentContainer: {
    flexGrow: 1,
  },

  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    height: 80,
    marginTop: -40,
    marginBottom: 30,
    paddingHorizontal: 25,
  },

  buttonPlay: {
    alignSelf: 'flex-start',
    padding: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 50,
    backgroundColor: 'white',
  },

  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  tagsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 8,
    marginBottom: 10,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },

  movieDescription: {
    width: '60%',
    paddingVertical: 15,
    borderTopWidth: 0.75,
    borderTopColor: 'darkgray',
    borderBottomWidth: 0.75,
    borderBottomColor: 'darkgray',
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },

  screenshotImage: {
    width: 150,
    height: 90,
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 10
  }
})

export default MovieDetails