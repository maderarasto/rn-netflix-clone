import { Text, StyleSheet, ScrollView, TouchableOpacity, Image, View, NativeModules, NativeSyntheticEvent, NativeScrollEvent, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieCover from '@src/components/MovieCover'
import { StatusBar } from 'expo-status-bar'
import { Movie } from '@src/types'

import PageHeader from '@src/components/PageHeader'
import Feather from '@expo/vector-icons/build/Feather'
import { Entypo, Ionicons } from '@expo/vector-icons'
import Colors from '@src/constants/Colors'
import Rating from '@src/components/Rating'
import MovieDetail from '@src/components/MovieDetail'
import CategoryCarousel from '@src/components/CategoryCarousel'
import MovieGallery, { MovieGalleryMethods } from '@src/components/MovieGallery'

import movies from '../../assets/data.json';
import { ORIGIN } from '@src/config'
import { useAsyncStorage } from '@src/hooks/useAsyncStorage'

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie|null>(null);
  const [scrollDown, setScrollDown] = useState(false);
  const [favoriteIds, setFavoriteIds] = useAsyncStorage<string[]>('favorites', []);

  const galleryRef = useRef<MovieGalleryMethods>(null);
  const {id} = useLocalSearchParams();
  const {StatusBarManager} = NativeModules;
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

  // useEffect(() => {
  //   console.log(favoriteIds);
  // }, [favoriteIds]);

  function isFavorite() {
    if (!movie) {
      return false;
    }

    return favoriteIds?.includes(movie.id) ?? false;
  }

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

  function onBackPress() {
    router.back();
  }

  function onScroll(ev: NativeSyntheticEvent<NativeScrollEvent>) {


    setScrollDown(ev.nativeEvent.contentOffset.y > 0);
  }

  function onHeartButtonPress() {
    if (!movie || !favoriteIds) {
      return;
    }

    const ids = [...favoriteIds];

    if (isFavorite()) {
      ids.splice(favoriteIds.indexOf(movie.id), 1);
    } else {
      ids.push(movie.id);
    }

    setFavoriteIds(ids);
  }

  function openScreenshot(screenshotIndex: number) {
    galleryRef.current?.openGallery(screenshotIndex);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ position: 'relative'}}>
        <StatusBar style="light"  backgroundColor="black" />
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
              <Image source={require('../../assets/images/netflix_logo.png')} style={styles.headerTitleImage} />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={onHeartButtonPress}>
                <Ionicons name={isFavorite() ? 'heart' : 'heart-outline'} size={28} color={Colors.light.primary} />
              </TouchableOpacity>
            )
        }} />
        <ScrollView contentContainerStyle={styles.scrollContentContainer} onScroll={onScroll}>
          <MovieCover imageSource={{ uri: `${ORIGIN}/assets/images/${movie?.imagePath}`}}>
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
                  <Text key={`tag-${index}`} style={{ fontSize: 13, color: '#737373'}}>{tagName + (index < (tags.length - 1) ? ' | ' : '')}</Text>
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
            <CategoryCarousel header={() => (
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black'}}>Screenshots</Text>
            )}>
                {movie?.screenshots.map((screenshotPath, index) => (
                  <TouchableOpacity key={`screenshot-${index}`} onPress={() => openScreenshot(index)}>
                    <Image source={{ uri: `${ORIGIN}/assets/images/${screenshotPath}`}} style={styles.screenshotImage}  />
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